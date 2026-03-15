"use server";

import type { Payment } from "@a2seven/yoo-checkout";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import { checkPlayerPrivilege } from "@/lib/actions/payment/check-privilege";
import prisma from "@/lib/prisma";
import { PAYMENT_ERROR } from "@/lib/utils/constants/payment-errors";
import {
  emailSchema,
  nicknameSchema,
  promoCodeSchema,
} from "@/lib/validation/payment.schema";
import { yooCheckout } from "@/lib/yoo-kassa";

type CreatePaymentSuccess = {
  success: true;
  confirmationUrl: string;
  paymentId: string;
};

type CreatePaymentError = {
  success: false;
  formError?: string;
  fieldErrors?: Record<string, string[]>;
};

type CreatePaymentResult = CreatePaymentSuccess | CreatePaymentError;

const paymentSchema = z.object({
  nickname: nicknameSchema,
  email: emailSchema,
  promoCode: promoCodeSchema,
  terms: z.literal(true, { error: "Нужно принять условия" }),
});

type PaymentInput = {
  nickname: string;
  email: string;
  promoCode: string;
  terms: boolean;
};

export async function createPayment(
  productId: string,
  input: PaymentInput,
): Promise<CreatePaymentResult> {
  try {
    const validationResult = paymentSchema.safeParse(input);

    if (!validationResult.success) {
      return {
        success: false,
        fieldErrors: z.flattenError(validationResult.error).fieldErrors,
      };
    }

    const { email, nickname, promoCode } = validationResult.data;
    const requestId = uuidv4();

    const product = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
      select: { price: true, key: true },
    });

    const privilegeCheck = await checkPlayerPrivilege(nickname, productId);

    if (!privilegeCheck.success) {
      return {
        success: false,
        fieldErrors: { nickname: [privilegeCheck.message] },
      };
    }

    const idempotencyKey = requestId;

    const order = await prisma.$transaction(
      async (tx) => {
        const existingOrder = await tx.order.findUnique({
          where: { idempotencyKey },
          select: {
            id: true,
            status: true,
            totalPrice: true,
            nickname: true,
            email: true,
            promoCode: true,
            productId: true,
          },
        });

        if (existingOrder) {
          if (existingOrder.status === "SUCCEEDED") {
            throw new Error(PAYMENT_ERROR.ALREADY_PAID);
          }

          if (existingOrder.status === "PENDING") {
            return existingOrder;
          }
        }

        let finalPrice = product.price;
        let discount = 0;

        if (promoCode) {
          const promo = await tx.promoCode.findUnique({
            where: { code: promoCode.toUpperCase() },
            select: {
              id: true,
              isActive: true,
              discount: true,
              usageLimit: true,
              usedCount: true,
              validFrom: true,
              validTo: true,
            },
          });

          if (!promo || !promo.isActive) {
            throw new Error(PAYMENT_ERROR.PROMO_INVALID);
          }

          if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
            throw new Error(PAYMENT_ERROR.PROMO_LIMIT_EXCEEDED);
          }

          const now = new Date();

          if (promo.validFrom && now < promo.validFrom) {
            throw new Error(PAYMENT_ERROR.PROMO_INVALID);
          }

          if (promo.validTo && now > promo.validTo) {
            throw new Error(PAYMENT_ERROR.PROMO_EXPIRED);
          }

          const discountAmount = product.price * (promo.discount / 100);

          finalPrice = Math.max(0, product.price - discountAmount);
          discount = promo.discount;
        }

        return await tx.order.create({
          data: {
            email,
            nickname,
            originalPrice: product.price,
            totalPrice: finalPrice,
            discount,
            idempotencyKey,
            promoCode,
            status: "PENDING",
            product: { connect: { id: productId } },
          },
          select: {
            id: true,
            status: true,
            totalPrice: true,
            nickname: true,
            email: true,
            promoCode: true,
            productId: true,
          },
        });
      },
      { isolationLevel: "Serializable", maxWait: 5000, timeout: 10000 },
    );

    let payment: Payment;

    try {
      payment = await yooCheckout.createPayment(
        {
          amount: {
            value: order.totalPrice.toFixed(2),
            currency: "RUB",
          },
          confirmation: {
            type: "redirect",
            return_url: `${process.env.BASE_URL}/store/order/${order.id}`,
          },
          capture: true,
          metadata: {
            order_id: order.id,
            product_id: order.productId,
            player_nick: order.nickname,
            promo_code: order.promoCode,
          },
        },
        idempotencyKey,
      );

      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentId: payment.id,
        },
      });
    } catch {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "FAILED",
        },
      });

      return {
        success: false,
        formError: "Не удалось создать платеж. Попробуйте позже",
      };
    }

    if (!payment) {
      return {
        success: false,
        formError: "Не удалось создать платеж. Попробуй позже",
      };
    }

    if (payment?.status === "succeeded") {
      return {
        success: false,
        formError: "Этот платеж уже был успешно обработан",
      };
    }

    if (!payment.confirmation.confirmation_url) {
      return {
        success: false,
        formError: "Не удалось создать платеж. Попробуй позже",
      };
    }

    return {
      success: true,
      confirmationUrl: payment.confirmation.confirmation_url,
      paymentId: payment.id,
    };
  } catch (error) {
    console.error("Payment creation error:", error);

    if (error instanceof Error) {
      switch (error.message) {
        case PAYMENT_ERROR.ALREADY_PAID:
          return {
            success: false,
            formError: "Платеж уже был успешно обработан",
          };

        case PAYMENT_ERROR.PROMO_INVALID:
          return {
            success: false,
            fieldErrors: {
              promoCode: ["Промокод недействителен или неактивен"],
            },
          };

        case PAYMENT_ERROR.PROMO_EXPIRED:
          return {
            success: false,
            fieldErrors: { promoCode: ["Срок действия промокода истек"] },
          };

        case PAYMENT_ERROR.PROMO_LIMIT_EXCEEDED:
          return {
            success: false,
            fieldErrors: {
              promoCode: ["Достигнут лимит использований промокода"],
            },
          };
      }
    }

    return {
      success: false,
      formError: "Не удалось создать платеж. Попробуйте позже.",
    };
  }
}

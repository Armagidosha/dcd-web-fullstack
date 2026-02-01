"use server";

import type { Payment } from "@a2seven/yoo-checkout";
import z from "zod";
import { checkPlayerPrivilege } from "@/lib/actions/payment/check-nickname";
import { PAYMENT_ERROR, PAYMENT_METHODS } from "@/app/shared/utils/constants";
import { createErrorResult } from "@/app/shared/utils/functions";
import prisma from "@/lib/prisma";
import { yooCheckout } from "@/lib/yoo-kassa";

type PaymentSuccess = {
  success: true;
  confirmationUrl: string;
  paymentId: string;
};

type PaymentError = {
  success: false;
  error: string;
  details: Record<string, string[]>;
};

type PaymentReturnType = PaymentSuccess | PaymentError;

const paymentInputSchema = z.object({
  requestId: z.uuid("Некорректный request ID"),
  productId: z.cuid({ error: "Некорректный ID продукта." }),
  paymentMethod: z.enum(PAYMENT_METHODS, {
    error: "Неподдерживаемый метод оплаты.",
  }),
  playerNick: z
    .string({ error: "Никнейм должен быть строкой" })
    .min(3, "Никнейм должен содержать минимум 3 символа")
    .max(16, "Никнейм не может превышать 16 символов")
    .toLowerCase(),
  playerEmail: z.email("Некорректный email адрес").toLowerCase(),
  promoCode: z
    .string()
    .max(20, "Промокод слишком длинный")
    .toUpperCase()
    .optional(),
});

type PaymentInput = z.infer<typeof paymentInputSchema>;

export async function createPayment(
  input: PaymentInput,
): Promise<PaymentReturnType> {
  try {
    const validationResult = paymentInputSchema.safeParse(input);

    if (!validationResult.success) {
      const flattenError = z.flattenError(validationResult.error).fieldErrors;

      return createErrorResult(PAYMENT_ERROR.VALIDATION_ERROR, flattenError);
    }

    const {
      requestId,
      paymentMethod,
      playerEmail,
      playerNick,
      productId,
      promoCode,
    } = validationResult.data;

    const product = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
      select: { price: true, key: true },
    });

    const privilegeCheck = await checkPlayerPrivilege(playerNick, productId);

    if (!privilegeCheck.success) {
      return privilegeCheck;
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
            customerNick: true,
            customerEmail: true,
            promoCode: true,
            productId: true,
          },
        });

        if (existingOrder) {
          if (existingOrder.status === "succeeded") {
            throw new Error(PAYMENT_ERROR.ALREADY_PAID);
          }

          if (existingOrder.status === "pending") {
            return existingOrder;
          }
        }

        let finalPrice = product.price;
        let discount = 0;

        if (promoCode) {
          const promo = await tx.promoCode.findUnique({
            where: { code: promoCode },
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
            customerEmail: playerEmail,
            customerNick: playerNick,
            originalPrice: product.price,
            totalPrice: finalPrice,
            discount,
            idempotencyKey,
            promoCode,
            status: "pending",
            product: { connect: { id: productId } },
          },
          select: {
            id: true,
            status: true,
            totalPrice: true,
            customerNick: true,
            customerEmail: true,
            promoCode: true,
            productId: true,
          },
        });
      },
      { isolationLevel: "Serializable", maxWait: 5000, timeout: 10000 },
    );

    let payment: Payment;

    try {
      switch (paymentMethod) {
        case "YooKassa":
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
                player_nick: order.customerNick,
                promo_code: order.promoCode,
              },
            },
            idempotencyKey,
          );
          break;
        default:
          throw new Error(PAYMENT_ERROR.UNSUPPORTED_METHOD);
      }

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
          status: "failed",
        },
      });

      return createErrorResult(PAYMENT_ERROR.PAYMENT_CREATION_FAILED, {
        form: ["Не удалось создать платеж. Попробуйте позже"],
      });
    }

    if (!payment) {
      return createErrorResult(PAYMENT_ERROR.PAYMENT_CREATION_FAILED, {
        form: ["Не удалось создать платеж. Попробуй позже"],
      });
    }

    if (payment?.status === "succeeded") {
      return createErrorResult(PAYMENT_ERROR.ALREADY_PAID, {
        form: ["Этот платеж уже был успешно обработан"],
      });
    }

    if (!payment.confirmation.confirmation_url) {
      return createErrorResult(PAYMENT_ERROR.UNKNOWN_ERROR, {
        form: ["Не удалось создать платеж. Попробуй позже"],
      });
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
          return createErrorResult(PAYMENT_ERROR.ALREADY_PAID, {
            form: ["Платеж уже был успешно обработан"],
          });

        case PAYMENT_ERROR.PROMO_INVALID:
          return createErrorResult(PAYMENT_ERROR.PROMO_INVALID, {
            promo: ["Промокод недействителен или неактивен"],
          });

        case PAYMENT_ERROR.PROMO_EXPIRED:
          return createErrorResult(PAYMENT_ERROR.PROMO_EXPIRED, {
            promo: ["Срок действия промокода истек"],
          });

        case PAYMENT_ERROR.PROMO_LIMIT_EXCEEDED:
          return createErrorResult(PAYMENT_ERROR.PROMO_LIMIT_EXCEEDED, {
            promo: ["Достигнут лимит использований промокода"],
          });
        case PAYMENT_ERROR.UNSUPPORTED_METHOD:
          return createErrorResult(PAYMENT_ERROR.UNSUPPORTED_METHOD, {
            form: ["Неподдерживаемый метод оплаты."],
          });
      }
    }

    return createErrorResult(PAYMENT_ERROR.UNKNOWN_ERROR, {
      form: ["Не удалось создать платеж. Попробуйте позже."],
    });
  }
}

"use server";

import { flattenError } from "zod";
import prisma from "@/lib/prisma";
import type { PaymentProvider } from "@/lib/utils/constants/payment-providers";
import { paymentSchema } from "@/lib/validation/payment.schema";
import { createPaymentProvider } from "../../payments/factories/payment.factory";
import { calculateFinalPrice } from "../promo-code/check-promo";
import { checkPlayerPrivilege } from "./check-privilege";

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

export type PaymentPayload = {
  nickname: string;
  email: string;
  promoCode: string;
  terms: boolean;
  provider: PaymentProvider;
  idempotencyKey: string;
};

export async function createPayment(
  productId: string,
  payload: PaymentPayload,
): Promise<CreatePaymentResult> {
  try {
    const parsed = paymentSchema.safeParse(payload);
    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: flattenError(parsed.error).fieldErrors,
      };
    }

    const { email, nickname, promoCode, provider } = parsed.data;

    const product = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
      select: { id: true, price: true, key: true, name: true },
    });

    // Privilege check
    const privilege = await checkPlayerPrivilege(nickname, product.id);
    if (!privilege.success) {
      return {
        success: false,
        fieldErrors: {
          nickname: [privilege.message],
        },
      };
    }

    // Promo check
    const promo = await calculateFinalPrice(product.price, promoCode);
    if (!promo.success) {
      return {
        success: false,
        fieldErrors: {
          promoCode: [promo.message],
        },
      };
    }

    // Generating idempotency
    const bucket = Math.floor(Date.now() / 30000);
    const idempotencyKey = `${nickname}:${email}:${product.id}:${bucket}`;

    // Create order
    const order = await prisma.$transaction(
      async (tx) => {
        const existing = await tx.order.findUnique({
          where: { idempotencyKey },
        });

        if (existing) {
          if (existing.status === "SUCCEEDED") {
            throw new Error("ALREADY PAID");
          }
          return existing;
        }

        return tx.order.create({
          data: {
            productId: product.id,
            email,
            nickname,
            promoCode,
            originalPrice: promo.originalPrice,
            totalPrice: promo.finalPrice,
            discount: promo.discount,
            idempotencyKey,
            status: "PENDING",
          },
        });
      },
      { isolationLevel: "Serializable" },
    );

    // Create payment
    const payment = await createPaymentProvider(provider, {
      amount: order.totalPrice,
      orderId: order.id,
      email: order.email,
      nickname: order.nickname,
      productId: order.productId,
      productName: product.name,
      promoCode: order.promoCode,
      idempotencyKey,
    });

    if (!payment.confirmationUrl) {
      throw new Error("Payment error");
    }

    // Save payment
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: payment.paymentId },
    });

    return {
      success: true,
      confirmationUrl: payment.confirmationUrl,
      paymentId: payment.paymentId,
    };
  } catch (error) {
    console.error("Error creating payment: ", error);

    if (error instanceof Error) {
      if (error.message === "ALREADY_PAID") {
        return { success: false, formError: "Платеж уже был обработан" };
      }
    }

    return {
      success: false,
      formError: "Ошибка создания платежа",
    };
  }
}

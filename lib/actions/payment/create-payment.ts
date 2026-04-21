"use server";

import { flattenError } from "zod";
import { logger } from "@/lib/logger";
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
  const log = logger.child({
    module: "payment",
    productId,
    provider: payload.provider,
  });

  const start = Date.now();

  try {
    const parsed = paymentSchema.safeParse(payload);

    if (!parsed.success) {
      log.info(
        {
          event: "validation_failed",
          fieldErrors: flattenError(parsed.error).fieldErrors,
        },
        "Payment validation failed",
      );

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
      log.info(
        {
          event: "privilege_denied",
        },
        "Privilege check failed",
      );

      return {
        success: false,
        fieldErrors: {
          nickname: [privilege.message],
        },
      };
    }

    // Promo
    const promo = await calculateFinalPrice(product.price, promoCode);

    if (!promo.success) {
      log.info(
        {
          event: "promo_invalid",
          promoCode,
        },
        "Promo validation failed",
      );

      return {
        success: false,
        fieldErrors: {
          promoCode: [promo.message],
        },
      };
    }

    // Idempotency
    const bucket = Math.floor(Date.now() / 30000);
    const idempotencyKey = `${nickname}:${email}:${product.id}:${bucket}`;

    const order = await prisma.$transaction(
      async (tx) => {
        const existing = await tx.order.findUnique({
          where: { idempotencyKey },
        });

        if (existing) {
          if (existing.status === "SUCCEEDED") {
            log.info(
              {
                event: "already_paid",
                orderId: existing.id,
              },
              "Order already paid",
            );
            throw new Error("ALREADY_PAID");
          }

          log.info(
            {
              event: "order_reused",
              orderId: existing.id,
            },
            "Reusing existing order",
          );

          return existing;
        }

        const created = await tx.order.create({
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

        log.info(
          {
            event: "order_created",
            orderId: created.id,
            amount: created.totalPrice,
          },
          "Order created",
        );

        return created;
      },
      { isolationLevel: "Serializable" },
    );

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
      log.error(
        {
          event: "payment_provider_failed",
          orderId: order.id,
          provider,
        },
        "Payment provider error",
      );

      throw new Error("Payment error");
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: payment.paymentId },
    });

    const duration = Date.now() - start;

    log.info(
      {
        event: "payment_created",
        orderId: order.id,
        paymentId: payment.paymentId,
        amount: order.totalPrice,
        durationMs: duration,
      },
      "Payment created",
    );

    return {
      success: true,
      confirmationUrl: payment.confirmationUrl,
      paymentId: payment.paymentId,
    };
  } catch (error) {
    const duration = Date.now() - start;

    if (error instanceof Error && error.message === "ALREADY_PAID") {
      log.info(
        {
          event: "already_paid_error",
          durationMs: duration,
        },
        "Payment already processed",
      );

      return {
        success: false,
        formError: "Платеж уже был обработан",
      };
    }

    log.error(
      {
        event: "payment_unhandled_error",
        error,
        durationMs: duration,
      },
      "Unhandled payment error",
    );

    return {
      success: false,
      formError: "Ошибка создания платежа",
    };
  }
}

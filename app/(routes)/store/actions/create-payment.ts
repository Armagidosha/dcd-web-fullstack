"use server";

import { checkPlayerPrivilege } from "@/app/lib/actions/checkNickname";
import { generateIdempotencyKey } from "@/app/lib/actions/idempotency";
import { calculateFinalPrice } from "@/app/lib/actions/promo";
import { PromoCodeExpiredError } from "@/app/lib/errors/PromoCodeExpired";
import { PromoCodeInvalidError } from "@/app/lib/errors/PromoCodeInvalid";
import { PromoCodeLimitError } from "@/app/lib/errors/PromoCodeLimit";
import { yooCheckout } from "@/app/lib/YooKassa";
import type { PaymentMethods } from "@/app/shared/utils/types/payment";
import prisma from "@/lib/prisma";

interface PaymentProps {
  productId: string;
  paymentMethod: PaymentMethods;
  playerNick: string;
  playerEmail: string;
  promoCode?: string;
}

export async function createPayment({
  productId,
  playerNick,
  playerEmail,
  promoCode,
  // TODO: Использовать после апрува в Юкассе
  // paymentMethod,
}: PaymentProps) {
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
    });

    const checked = await checkPlayerPrivilege(playerNick, productId);

    if (!checked.success) {
      return checked;
    }

    const checkedPromo = await calculateFinalPrice(product.price, promoCode);

    if (!checkedPromo.success) {
      return checkedPromo;
    }

    const idempotencyKey = generateIdempotencyKey({
      playerEmail,
      playerNick,
      productId,
      promoCode,
    });

    const newOrder = await prisma.$transaction(async (tx) => {
      if (promoCode) {
        const promo = await tx.promoCode.findUnique({
          where: { code: promoCode.toUpperCase() },
        });

        if (!promo || !promo.isActive) {
          throw new PromoCodeInvalidError();
        }

        if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
          throw new PromoCodeLimitError();
        }

        const now = new Date();
        if (promo.validTo && now > promo.validTo) {
          throw new PromoCodeExpiredError();
        }
      }

      const orderData = {
        customerEmail: playerEmail.toLowerCase(),
        customerNick: playerNick.toLowerCase(),
        originalPrice: parseFloat(checkedPromo.originalPrice),
        totalPrice: parseFloat(checkedPromo.finalPrice),
        discount: checkedPromo.discount,
        idempotencyKey,
        promoCode: promoCode,
        status: "pending",
      };

      const newOrder = await tx.order.upsert({
        where: { idempotencyKey },
        update: {
          status: "pending",
          totalPrice: parseFloat(checkedPromo.finalPrice),
          discount: checkedPromo.discount,
        },
        create: { ...orderData, product: { connect: { id: productId } } },
      });

      return newOrder;
    });

    const payment = await yooCheckout.createPayment(
      {
        amount: {
          value: checkedPromo.finalPrice,
          currency: "RUB",
        },
        confirmation: {
          type: "redirect",
          return_url: `${process.env.CALLBACK_URL}/payment/success`,
        },
        capture: true,
        metadata: {
          order_id: newOrder.id,
          product_id: newOrder.productId,
          player_nick: newOrder.customerNick,
          promo_code: newOrder.promoCode,
        },
      },
      idempotencyKey,
    );

    return {
      confirmationUrl: payment.confirmation.confirmation_url,
      paymentId: payment.id,
    };
  } catch (error) {
    console.error("Payment creation error:", error);

    if (error instanceof PromoCodeInvalidError) {
      return {
        success: false,
        error: "PROMO_INVALID",
        details: { promo: ["Промокод недействителен."] },
      };
    }

    if (error instanceof PromoCodeLimitError) {
      return {
        success: false,
        error: "PROMO_LIMIT_EXCEEDED",
        details: { promo: ["Достигнут лимит использований промокода."] },
      };
    }

    if (error instanceof PromoCodeExpiredError) {
      return {
        success: false,
        error: "PROMO_EXPIRED",
        details: { promo: ["Срок действия промокода истек."] },
      };
    }

    return {
      error: "PAYMENT_FAILED",
      details: { form: "Не удалось создать платеж. Попробуйте позже." },
    };
  }
}

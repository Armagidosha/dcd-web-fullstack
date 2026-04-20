"use server";

import prisma from "@/lib/prisma";

type SuccessResult = {
  success: true;
  discount: number;
  finalPrice: number;
  originalPrice: number;
};

type ErrorResult = {
  success: false;
  discount: number;
  finalPrice: number;
  originalPrice: number;
  error: string;
  message: string;
};

type Result = SuccessResult | ErrorResult;

const fail = (price: number, error: string, message: string): Result => ({
  success: false,
  discount: 0,
  finalPrice: price,
  originalPrice: price,
  error,
  message,
});

export async function calculateFinalPrice(
  initialPrice: number | string,
  promoCode?: string,
): Promise<Result> {
  const price = Number(initialPrice);

  if (!Number.isFinite(price) || price < 0) {
    return fail(0, "INVALID_PRICE", "Некорректная цена");
  }

  if (!promoCode?.trim()) {
    return {
      success: true,
      discount: 0,
      finalPrice: price,
      originalPrice: price,
    };
  }

  const code = promoCode.trim().toUpperCase();

  try {
    const promo = await prisma.promoCode.findUnique({
      where: { code },
      select: {
        discount: true,
        isActive: true,
        validFrom: true,
        validTo: true,
        usageLimit: true,
        usedCount: true,
      },
    });

    if (!promo || !promo.isActive) {
      return fail(price, "PROMO_INVALID", "Промокод недействителен");
    }

    const now = new Date();

    if (promo.validFrom && now < promo.validFrom) {
      return fail(price, "PROMO_INVALID", "Промокод недействителен");
    }

    if (promo.validTo && now > promo.validTo) {
      return fail(price, "PROMO_EXPIRED", "Срок действия промокода истек.");
    }

    if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) {
      return fail(
        price,
        "PROMO_LIMIT_EXCEEDED",
        "Достигнут лимит использований промокода.",
      );
    }

    const discountPercent = Math.min(Math.max(promo.discount, 0), 100);

    const discountAmount = Math.round(price * (discountPercent / 100));
    const finalPrice = Math.max(0, price - discountAmount);

    return {
      success: true,
      discount: discountPercent,
      finalPrice,
      originalPrice: price,
    };
  } catch (e) {
    console.error(e);

    return fail(
      price,
      "PROMO_UNEXPECTED_ERROR",
      "Ошибка при проверке промокода. Попробуйте позже",
    );
  }
}

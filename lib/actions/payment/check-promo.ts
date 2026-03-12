"use server";

import prisma from "@/lib/prisma";

export async function calculateFinalPrice(
  initialPrice: number | string,
  promoCode: string | undefined,
) {
  const priceNum =
    typeof initialPrice === "string"
      ? parseFloat(initialPrice)
      : (initialPrice as number);

  if (!promoCode) {
    return {
      success: true,
      discount: 0,
      finalPrice: priceNum.toFixed(2),
      originalPrice: priceNum.toFixed(2),
    };
  }

  try {
    const promo = await prisma.promoCode.findUnique({
      where: { code: promoCode.toUpperCase().trim() },
    });

    if (!promo) {
      return {
        success: false,
        discount: 0,
        finalPrice: priceNum.toFixed(2),
        originalPrice: priceNum.toFixed(2),
        error: "PROMO_INVALID",
        message: "Промокод недействителен",
      };
    }

    if (!promo.isActive) {
      return {
        success: false,
        discount: 0,
        finalPrice: priceNum.toFixed(2),
        originalPrice: priceNum.toFixed(2),
        error: "PROMO_INVALID",
        message: "Промокод недействителен",
      };
    }

    const dateNow = new Date();

    if (promo.validFrom && dateNow < promo.validFrom) {
      return {
        success: false,
        discount: 0,
        finalPrice: priceNum.toFixed(2),
        originalPrice: priceNum.toFixed(2),
        error: "PROMO_INVALID",
        message: "Промокод недействителен",
      };
    }

    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      return {
        success: false,
        discount: 0,
        finalPrice: priceNum.toFixed(2),
        originalPrice: priceNum.toFixed(2),
        error: "PROMO_LIMIT_EXCEEDED",
        message: "Достигнут лимит использований промокода.",
      };
    }

    if (promo.validTo && dateNow > promo.validTo) {
      return {
        success: false,
        discount: 0,
        finalPrice: priceNum.toFixed(2),
        originalPrice: priceNum.toFixed(2),
        error: "PROMO_EXPIRED",
        message: "Срок действия промокода истек.",
      };
    }

    const discountAmount = priceNum * (promo.discount / 100);
    const finalPrice = priceNum - discountAmount;

    const safeFinalPrice = Math.max(0, finalPrice);

    return {
      success: true,
      discount: promo.discount,
      finalPrice: safeFinalPrice.toFixed(2),
      originalPrice: priceNum.toFixed(2),
    };
  } catch (error) {
    console.error("Error validating promo code: ", error);

    return {
      success: false,
      discount: 0,
      finalPrice: priceNum.toFixed(2),
      originalPrice: priceNum.toFixed(2),
      error: "PROMO_UNEXPECTED_ERROR",
      message: "Ошибка при проверке промокода. Попробуйте позже",
    };
  }
}

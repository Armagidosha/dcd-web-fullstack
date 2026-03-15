"use server";

import { updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { promoSchema } from "@/lib/validation/promo.schema";
import { checkRights } from "../check-rights";

type UpdatePromoActionArgs = {
  code: string;
  description: string;
  discount: number;
  usageLimit: null | number;
  validFrom: Date;
  validTo: Date;
};

export async function updatePromoActionPrivate(
  id: string,
  args: UpdatePromoActionArgs,
) {
  const { success } = await checkRights();

  if (!success) {
    throw new Error("Unauthorized");
  }

  const validatedData = promoSchema.parse(args);

  const existingPromo = await prisma.promoCode.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existingPromo) {
    throw new Error("Promo not found");
  }

  const updatedPromo = await prisma.promoCode.update({
    where: { id },
    data: {
      code: validatedData.code,
      discount: validatedData.discount,
      description: validatedData.description,
      validFrom: validatedData.validFrom,
      validTo: validatedData.validTo,
      usageLimit: validatedData.usageLimit,
      isActive: false,
      usedCount: 0,
    },
  });

  updateTag("promo-PRIVATE");

  return updatedPromo;
}

export async function updatePromoStatusActionPrivate(id: string) {
  const { success } = await checkRights();

  if (!success) {
    throw new Error("Unauthorized");
  }

  const existingPromo = await prisma.promoCode.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!existingPromo) {
    throw new Error("Promo not found");
  }

  const updatedPromo = await prisma.promoCode.update({
    where: { id },
    data: {
      isActive: !existingPromo.isActive,
    },
  });

  updateTag("promo-PRIVATE");

  return updatedPromo;
}

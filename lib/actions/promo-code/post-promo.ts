"use server";

import { updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { promoSchema } from "@/lib/validation/promo.schema";
import { checkRights } from "../check-rights";

type CreatePromoActionPrivateArgs = {
  code: string;
  description: string;
  discount: number;
  usageLimit: null | number;
  validFrom: Date;
  validTo: Date;
};

export type CreatePromoFn = typeof createPromoActionPrivate;

export async function createPromoActionPrivate(
  args: CreatePromoActionPrivateArgs,
) {
  const { success } = await checkRights();

  if (!success) {
    throw new Error("Unauthorized");
  }

  const validatedData = promoSchema.parse(args);

  const newPromo = await prisma.promoCode.create({
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

  return newPromo;
}

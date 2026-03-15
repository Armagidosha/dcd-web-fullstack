"use server";

import { updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export async function deletePromoActionPrivate(id: string) {
  const { success } = await checkRights();

  if (!success) {
    throw new Error("Unauthorized");
  }

  const deletedPromo = await prisma.promoCode.delete({
    where: { id },
  });

  updateTag("promo-PRIVATE");

  return deletedPromo;
}

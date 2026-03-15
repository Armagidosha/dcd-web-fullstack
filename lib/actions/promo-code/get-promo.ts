import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

async function getPromoPrivate() {
  "use cache";
  cacheTag("promo-PRIVATE");
  return await prisma.promoCode.findMany({
    orderBy: [{ createdAt: "desc" }, { isActive: "asc" }],
  });
}

export async function getPromoActionPrivate() {
  const { success } = await checkRights();
  if (!success) throw new Error("Unauthorized");

  return getPromoPrivate();
}

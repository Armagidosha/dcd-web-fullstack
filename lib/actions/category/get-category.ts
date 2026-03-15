"use server";

import { cacheTag } from "next/cache";
import type { CategoryGetPayload } from "@/lib/generated/prisma/models";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export type CategoryWithProductCount = CategoryGetPayload<{
  include: { _count: { select: { products: true } } };
}>;

async function getCategoriesPrivate() {
  "use cache";
  cacheTag("product-PRIVATE");

  return prisma.category.findMany({
    orderBy: { products: { _count: "desc" } },
    include: { _count: { select: { products: true } } },
  });
}

export async function getCategoriesActionPrivate(): Promise<
  CategoryWithProductCount[]
> {
  const { success } = await checkRights();
  if (!success) throw new Error("Unauthorized");

  return await getCategoriesPrivate();
}

export async function getCategoriesAction() {
  "use cache";
  cacheTag("product-PUBLIC");

  return await prisma.category.findMany({
    select: { name: true, _count: { select: { products: true } } },
  });
}

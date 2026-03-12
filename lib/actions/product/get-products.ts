"use server";

import { cacheTag } from "next/cache";
import type { ProductGetPayload } from "@/lib/generated/prisma/models";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export type ProductWithCategory = ProductGetPayload<{
  include: { category: true };
}>;

export type ProductWithCategoryPublic = ProductGetPayload<{
  omit: { categoryId: true; createdAt: true; updatedAt: true };
  include: { category: { select: { name: true } } };
  orderBy: { price: "asc" };
}>;

async function getProductsPrivate() {
  "use cache";
  cacheTag("product-PRIVATE");

  console.log("get-product-private-worked");
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductsActionPrivate(): Promise<
  ProductWithCategory[]
> {
  const { success } = await checkRights();
  if (!success) throw new Error("Unauthorized");

  return await getProductsPrivate();
}

export async function getProductsAction() {
  "use cache";
  cacheTag("product-PUBLIC");

  console.log("get-product-worked");
  return await prisma.product.findMany({
    omit: { categoryId: true, createdAt: true, updatedAt: true },
    include: { category: { select: { name: true } } },
    orderBy: { price: "asc" },
  });
}

"use server";

import { revalidateTag, updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export async function deleteCategoryActionPrivate(categoryId: string) {
  const { success } = await checkRights();
  if (!success) throw new Error("Unauthorized");

  const existingCategory = prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!existingCategory) throw new Error("Category not found");

  await prisma.category.delete({ where: { id: categoryId } });

  updateTag("product-PRIVATE");
  revalidateTag("product-PUBLIC", "max");

  return { success: true };
}

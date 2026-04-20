"use server";

import { revalidateTag, updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { categorySchema } from "@/lib/validation/category.schema";
import { checkRights } from "../check-rights";
import type { CategoryWithProductCount } from "./get-category";

export async function updateCategoryActionPrivate(
  categoryName: string,
  categoryId: string,
): Promise<CategoryWithProductCount> {
  const { success } = await checkRights();
  if (!success) throw new Error("Unauthorized");

  const validatedData = categorySchema.parse({ name: categoryName });

  const existingCategory = prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!existingCategory) throw new Error("Category not found");

  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: { name: validatedData.name },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { products: { where: { isArchived: false } } } },
    },
  });

  updateTag("product-PRIVATE");
  revalidateTag("product-PUBLIC", "max");

  return updatedCategory;
}

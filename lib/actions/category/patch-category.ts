"use server";

import { revalidateTag, updateTag } from "next/cache";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { categorySchema } from "@/lib/validation/category.schema";
import { checkRights } from "../check-rights";
import type { CategoryWithProductCount } from "./get-category";

export async function updateCategoryActionPrivate(
  categoryName: string,
  categoryId: string,
): Promise<CategoryWithProductCount> {
  const log = logger.child({
    module: "category",
    action: "update",
    categoryId,
  });

  const start = Date.now();

  const { success } = await checkRights();

  if (!success) {
    log.warn(
      {
        event: "unauthorized_update_attempt",
      },
      "Unauthorized category update attempt",
    );

    throw new Error("Unauthorized");
  }

  let validatedData: { name: string };

  try {
    validatedData = categorySchema.parse({ name: categoryName });
  } catch (error) {
    log.info(
      {
        event: "validation_failed",
        error,
        categoryName,
      },
      "Category validation failed",
    );

    throw error;
  }

  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!existingCategory) {
    log.warn(
      {
        event: "category_not_found",
      },
      "Category not found",
    );

    throw new Error("Category not found");
  }

  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: { name: validatedData.name },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          products: { where: { isArchived: false } },
        },
      },
    },
  });

  updateTag("product-PRIVATE");
  revalidateTag("product-PUBLIC", "max");

  log.info(
    {
      event: "category_updated",
      durationMs: Date.now() - start,
    },
    "Category updated",
  );

  return updatedCategory;
}

"use server";

import { revalidateTag, updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";
import { logger } from "@/lib/logger";

export async function deleteCategoryActionPrivate(categoryId: string) {
  const log = logger.child({
    module: "category",
    categoryId,
    action: "delete",
  });

  const start = Date.now();

  const { success } = await checkRights();

  if (!success) {
    log.warn(
      {
        event: "unauthorized_delete_attempt",
      },
      "Unauthorized category delete attempt",
    );

    throw new Error("Unauthorized");
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

  await prisma.category.delete({
    where: { id: categoryId },
  });

  updateTag("product-PRIVATE");
  revalidateTag("product-PUBLIC", "max");

  const duration = Date.now() - start;

  log.info(
    {
      event: "category_deleted",
      durationMs: duration,
    },
    "Category deleted",
  );

  return { success: true };
}

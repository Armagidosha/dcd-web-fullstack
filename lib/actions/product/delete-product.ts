"use server";

import { revalidateTag, updateTag } from "next/cache";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export async function deleteProductActionPrivate(productId: string) {
  const log = logger.child({
    module: "product",
    action: "delete",
    productId,
  });

  const start = Date.now();

  try {
    const { success } = await checkRights();

    if (!success) {
      log.warn(
        { event: "unauthorized_delete_attempt" },
        "Unauthorized product delete attempt",
      );

      throw new Error("Unauthorized");
    }

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      log.warn({ event: "product_not_found" }, "Product not found");

      throw new Error("not_found");
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        isArchived: true,
      },
    });

    updateTag("product-PRIVATE");
    revalidateTag("product-PUBLIC", "max");

    log.info(
      {
        event: "product_archived",
        durationMs: Date.now() - start,
      },
      "Product archived",
    );

    return { success: true };
  } catch (error) {
    const duration = Date.now() - start;

    if (error instanceof Error && error.message === "Unauthorized") {
      return { success: false, type: "auth" };
    }

    if (error instanceof Error && error.message === "not_found") {
      return { success: false, type: "notfound" };
    }

    log.error(
      {
        event: "product_delete_failed",
        error,
        durationMs: duration,
      },
      "Unexpected error while deleting product",
    );

    return { success: false, type: "server" };
  }
}

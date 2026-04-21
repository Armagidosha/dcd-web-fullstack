"use server";

import { revalidateTag, updateTag } from "next/cache";
import type z from "zod";
import { flattenError, ZodError } from "zod";
import { checkRights } from "@/lib/actions/check-rights";
import { deleteImage, saveImage } from "@/lib/actions/media/image";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { editProductSchema } from "@/lib/validation/product.schema";

export async function updateProductActionPrivate(
  formData: FormData,
  productId: string,
) {
  const log = logger.child({
    module: "product",
    action: "update",
    productId,
  });

  const start = Date.now();

  try {
    const { success } = await checkRights();

    if (!success) {
      log.warn(
        { event: "unauthorized_update_attempt" },
        "Unauthorized product update attempt",
      );

      throw new Error("Unauthorized");
    }

    const raw = Object.fromEntries(formData.entries());

    const data = {
      ...raw,
      image: raw.image instanceof File ? raw.image : null,
      price: Number(raw.price),
    };

    let parsed: z.infer<typeof editProductSchema>;

    try {
      parsed = editProductSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = flattenError(error).fieldErrors;
        log.info(
          {
            event: "validation_failed",
            errors: fieldErrors,
          },
          "Product validation failed",
        );

        return {
          success: false,
          type: "validation",
          errors: fieldErrors,
        };
      }

      throw error;
    }

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      log.warn({ event: "product_not_found" }, "Product not found");

      throw new Error("ProductNotFound");
    }

    let imageName = existing.image || "";

    if (parsed.image) {
      imageName = await saveImage(parsed.image);

      if (existing.image) {
        await deleteImage(existing.image);
      }

      log.info(
        {
          event: "image_updated",
        },
        "Product image updated",
      );
    }

    const updated = await prisma.product.update({
      include: { category: true },
      where: { id: productId },
      data: {
        name: parsed.name,
        description: parsed.description,
        price: parsed.price,
        key: parsed.key,
        ...(imageName && { image: imageName }),
        category: {
          connectOrCreate: {
            where: { name: parsed.category },
            create: { name: parsed.category },
          },
        },
      },
    });

    updateTag("product-PRIVATE");
    revalidateTag("product-PUBLIC", "max");
    revalidateTag("latest-PUBLIC", "max");

    log.info(
      {
        event: "product_updated",
        durationMs: Date.now() - start,
      },
      "Product updated successfully",
    );

    return { success: true, data: updated };
  } catch (error) {
    const duration = Date.now() - start;

    if (error instanceof Error && error.message === "Unauthorized") {
      return { success: false, type: "auth" };
    }

    if (error instanceof Error && error.message === "ProductNotFound") {
      return { success: false, type: "notfound" };
    }

    log.error(
      {
        event: "product_update_failed",
        error,
        durationMs: duration,
      },
      "Unexpected product update error",
    );

    return { success: false, type: "server" };
  }
}

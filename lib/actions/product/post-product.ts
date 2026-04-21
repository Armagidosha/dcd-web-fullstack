"use server";

import { revalidateTag, updateTag } from "next/cache";
import type z from "zod";
import { flattenError, ZodError } from "zod";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { productSchema } from "@/lib/validation/product.schema";
import { checkRights } from "../check-rights";
import { saveImage } from "../media/image";

export async function createProductActionPrivate(formData: FormData) {
  const log = logger.child({
    module: "product",
    action: "create",
  });

  const start = Date.now();

  try {
    const { success } = await checkRights();

    if (!success) {
      log.warn(
        { event: "unauthorized_create_attempt" },
        "Unauthorized product create attempt",
      );

      throw new Error("Unauthorized");
    }

    const raw = Object.fromEntries(formData.entries());

    const data = {
      ...raw,
      price: Number(raw.price),
    };

    let validatedData: z.infer<typeof productSchema>;

    try {
      validatedData = productSchema.parse(data);
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

    const imagePath = await saveImage(validatedData.image);

    const product = await prisma.product.create({
      include: { category: true },
      data: {
        name: validatedData.name,
        key: validatedData.key,
        description: validatedData.description,
        price: validatedData.price,
        image: imagePath,
        category: {
          connectOrCreate: {
            create: { name: validatedData.category },
            where: { name: validatedData.category },
          },
        },
      },
    });

    updateTag("product-PRIVATE");
    revalidateTag("product-PUBLIC", "max");

    log.info(
      {
        event: "product_created",
        productId: product.id,
        durationMs: Date.now() - start,
      },
      "Product created",
    );

    return { success: true, data: product };
  } catch (error) {
    const duration = Date.now() - start;

    if (error instanceof ZodError) {
      return {
        success: false,
        type: "validation",
        errors: flattenError(error).fieldErrors,
      };
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return { success: false, type: "auth" };
    }

    log.error(
      {
        event: "product_create_failed",
        error,
        durationMs: duration,
      },
      "Unexpected product creation error",
    );

    return {
      success: false,
      type: "server",
    };
  }
}

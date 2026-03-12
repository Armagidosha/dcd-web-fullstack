"use server";

import { revalidateTag, updateTag } from "next/cache";
import { flattenError, ZodError } from "zod";
import prisma from "@/lib/prisma";
import { productSchema } from "@/lib/validation/product.schema";
import { checkRights } from "../check-rights";
import { saveImage } from "../media/image";

export async function createProductActionPrivate(formData: FormData) {
  try {
    const { success } = await checkRights();

    if (!success) {
      throw new Error("Unauthorized");
    }

    const raw = Object.fromEntries(formData.entries());

    const data = {
      ...raw,
      price: Number(raw.price),
    };

    const validatedData = productSchema.parse(data);

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
    revalidateTag("product-PUBLIC", {});

    return { success: true, data: product };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        type: "validation",
        errors: flattenError(error).fieldErrors,
      };
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return {
        success: false,
        type: "auth",
      };
    }

    return {
      success: false,
      type: "server",
    };
  }
}

"use server";

import { revalidateTag, updateTag } from "next/cache";
import { flattenError, ZodError } from "zod";
import { checkRights } from "@/lib/actions/check-rights";
import { deleteImage, saveImage } from "@/lib/actions/media/image";
import prisma from "@/lib/prisma";
import { editProductSchema } from "@/lib/validation/product.schema";

export async function updateProductActionPrivate(
  formData: FormData,
  productId: string,
) {
  try {
    const { success } = await checkRights();
    if (!success) throw new Error("Unauthorized");

    const raw = Object.fromEntries(formData.entries());
    const data = {
      ...raw,
      image: raw.image instanceof File ? raw.image : null,
      price: Number(raw.price),
    };

    const parsed = editProductSchema.parse(data);

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existing) throw new Error("ProductNotFound");

    let imageName = existing.image || "";
    if (parsed.image) {
      imageName = await saveImage(parsed.image);
      if (existing.image) await deleteImage(existing.image);
    }

    const updatePayload = {
      name: parsed.name,
      description: parsed.description,
      price: parsed.price,
      key: parsed.key,
      ...(imageName && { image: imageName }),
    };

    const updated = await prisma.product.update({
      include: { category: true },
      where: { id: productId },
      data: {
        ...updatePayload,
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

    return { success: true, data: updated };
  } catch (error) {
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
    if (error instanceof Error && error.message === "ProductNotFound") {
      return { success: false, type: "notfound" };
    }

    return { success: false, type: "server" };
  }
}

"use server";

import { revalidateTag, updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";
import { deleteImage } from "../media/image";

export async function deleteProductActionPrivate(productId: string) {
  try {
    const { success } = await checkRights();
    if (!success) throw new Error("Unauthorized");

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existing) throw new Error("ProductNotFound");

    if (existing.image) await deleteImage(existing.image);

    await prisma.product.delete({ where: { id: productId } });

    updateTag("product-PRIVATE");
    revalidateTag("product-PUBLIC", "max");

    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return { success: false, type: "auth" };
    }
    if (error instanceof Error && error.message === "ProductNotFound") {
      return { success: false, type: "notfound" };
    }
    return { success: false, type: "server" };
  }
}

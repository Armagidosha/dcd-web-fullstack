import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRights } from "@/app/lib/actions/auth";
import { deleteImage, saveImage } from "@/app/lib/actions/image";
import { UnauthorizedError } from "@/app/shared/errors/UnauthorizedError";
import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { productSchema } from "../../schema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await checkRights();

    const { id: productId } = await params;
    const formData = await request.formData();

    const partialSchema = productSchema.partial();

    const data: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const parsed = partialSchema.parse(data);

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existingImageName = existing.image;
    let imageName = "";

    if ("image" in parsed && parsed.image instanceof File) {
      const file = parsed.image;
      imageName = await saveImage(file);
      if (existingImageName) await deleteImage(existingImageName);
    }

    const updatePayload: Record<string, unknown> = {
      ...(parsed.name !== undefined && { name: parsed.name }),
      ...(parsed.key !== undefined && { key: parsed.key }),
      ...(parsed.description !== undefined && {
        description: parsed.description,
      }),
      ...(parsed.price !== undefined && { price: Number(parsed.price) }),
      ...(imageName && { image: imageName }),
    };

    const categoryData = parsed.category
      ? {
          connectOrCreate: {
            where: { name: parsed.category },
            create: { name: parsed.category },
          },
        }
      : undefined;

    const updated = await prisma.product.update({
      include: { category: true },
      where: { id: productId },
      data: {
        ...updatePayload,
        ...(categoryData ? { category: categoryData } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: z.flattenError(error).fieldErrors,
        },
        { status: 400 },
      );
    }

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: (error as Error)?.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await checkRights();

    const { id: productId } = await params;
    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (existing.image) {
      await deleteImage(existing.image);
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Error deleting product:", error);

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { checkRights, saveImage } from "@/app/lib/actions/utils";
import { UnauthorizedError } from "@/app/lib/errors/UnauthorizedError";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    await checkRights();

    const formData = await request.formData();

    const schema = z.object({
      description: z.string().min(3).max(1000),
      image: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File size must be less than 5MB",
        })
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
              file.type,
            ),
          { message: "File must be a valid image (JPEG, PNG, WebP, or GIF)" },
        ),
      name: z.string().min(3).max(16),
      category: z.string().min(3).max(16),
      price: z.coerce.number().min(0).max(10000),
    });

    const validatedData = schema.parse({
      name: formData.get("name"),
      price: formData.get("price"),
      image: formData.get("image"),
      description: formData.get("description"),
      category: formData.get("category"),
    });

    const imagePath = await saveImage(validatedData.image);

    const product = await prisma.product.create({
      include: { category: true },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: Number(validatedData.price),
        image: imagePath,
        category: {
          connectOrCreate: {
            create: { name: validatedData.category },
            where: { name: validatedData.category },
          },
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 },
      );
    }

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

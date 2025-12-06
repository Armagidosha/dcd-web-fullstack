import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { checkRights, saveImage } from "@/app/lib/actions/utils";
import { productSchema } from "@/app/lib/api/schemas";
import { UnauthorizedError } from "@/app/lib/errors/UnauthorizedError";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    await checkRights();

    const formData = await request.formData();

    const validatedData = productSchema.parse({
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

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);

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
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { checkRights } from "@/lib/actions/check-rights";
import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { categorySchema } from "@/lib/validation/category.schema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { success } = await checkRights();

    if (!success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: categoryId } = await params;
    const { name } = await request.json();

    const validatedData = categorySchema.parse({ name });

    const updated = await prisma.category.update({
      where: { id: categoryId },
      data: { name: validatedData.name },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { products: true } },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating category:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: z.flattenError(error).fieldErrors,
        },
        { status: 400 },
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 },
        );
      }

      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error: "Conflict",
            details: { name: ["Категория уже существует"] },
          },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { success } = await checkRights();

    if (!success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: categoryId } = await params;

    await prisma.category.delete({ where: { id: categoryId } });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Error deleting category", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Category not found" },
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

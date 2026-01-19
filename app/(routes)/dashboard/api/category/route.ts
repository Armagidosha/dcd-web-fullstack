import { NextResponse } from "next/server";
import { checkRights } from "@/app/lib/actions/auth";
import { UnauthorizedError } from "@/app/shared/errors/UnauthorizedError";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await checkRights();

    const categories = await prisma.category.findMany({
      orderBy: { products: { _count: "desc" } },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { products: true } },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

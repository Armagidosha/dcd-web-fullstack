import { NextResponse } from "next/server";
import { checkRights } from "@/lib/actions/check-rights";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { success } = await checkRights();
    if (!success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

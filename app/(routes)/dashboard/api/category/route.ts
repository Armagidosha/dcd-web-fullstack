import { NextResponse } from "next/server";
import { checkRights } from "@/app/lib/actions/utils";
import prisma from "@/lib/prisma";

export async function GET() {
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
}

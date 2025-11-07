import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany();
  const latest = ["Что то есть", "Что то было"];

  return NextResponse.json({ message: "success", data: { products, latest } });
}

export async function POST(request: NextRequest) {
  console.log(request);
}

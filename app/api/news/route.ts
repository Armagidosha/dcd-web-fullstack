import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const news = await prisma.news.findMany({
    orderBy: { publishedAt: "desc" },
    take: 8,
  });

  return NextResponse.json({ message: "success", data: news });
}

export async function POST(request: NextRequest) {
  console.log("POST", request);
}

export async function PUT(request: NextRequest) {
  console.log("PUT", request);
}

export async function DELETE(request: NextRequest) {
  console.log("DELETE", request);
}

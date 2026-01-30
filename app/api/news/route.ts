import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get("Authorization")?.split(" ")[1];

    if (process.env.DCD_SECRET !== authToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { author, content, link, attachments } = await request.json();

    if (!author || !content) {
      return NextResponse.json(
        { success: false, error: "Author and content are required" },
        { status: 400 },
      );
    }

    await prisma.news.create({
      data: {
        author,
        content,
        postLink: link,
        ...(attachments && attachments.length > 0
          ? { image: attachments }
          : {}),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to create news post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create news post" },
      { status: 500 },
    );
  }
}

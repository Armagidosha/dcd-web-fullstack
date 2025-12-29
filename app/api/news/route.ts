import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { author, content, link, attachments } = await request.json();
    if (!author || !content) {
      return NextResponse.json(
        { error: "Author and content are required" },
        { status: 400 },
      );
    }

    const post = await prisma.news.create({
      data: {
        author,
        content,
        postLink: link,
        ...(attachments.length > 0 ? { image: attachments[0].url } : {}),
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Failed to create news post:", error);
    return NextResponse.json(
      { error: "Failed to create news post" },
      { status: 500 },
    );
  }
}

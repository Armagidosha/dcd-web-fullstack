import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get("Authorization")?.split(" ")[1];
    if (process.env.DCD_SECRET !== authToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { author, content, link, image } = await request.json();

    if (!author || !content) {
      return NextResponse.json(
        { success: false, message: "Author and content are required" },
        { status: 400 },
      );
    }

    await prisma.news.create({
      data: {
        author,
        content,
        postLink: link,
        ...(image ? { image } : {}),
      },
    });

    revalidateTag("news-PUBLIC", "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to create news post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create news post" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authToken = request.headers.get("Authorization")?.split(" ")[1];

    if (process.env.DCD_SECRET !== authToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const postLink = searchParams.get("url");

    if (!postLink) {
      return NextResponse.json(
        {
          success: false,
          message: "Query parameter 'url' required",
        },
        { status: 400 },
      );
    }

    const { author, content, link, image } = await request.json();

    const post = await prisma.news.findFirst({ where: { postLink } });

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    await prisma.news.update({
      where: { postLink },
      data: { author, content, postLink: link, ...(image ? { image } : {}) },
    });

    revalidateTag("news-PUBLIC", "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update news post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update news post" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authToken = request.headers.get("Authorization")?.split(" ")[1];

    if (process.env.DCD_SECRET !== authToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const postLink = searchParams.get("url");

    if (!postLink) {
      return NextResponse.json(
        {
          success: false,
          message: "Query parameter 'url' required",
        },
        { status: 400 },
      );
    }

    const post = await prisma.news.findFirst({ where: { postLink } });

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    await prisma.news.delete({ where: { postLink } });

    revalidateTag("news-PUBLIC", "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete news post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete news post" },
      { status: 500 },
    );
  }
}

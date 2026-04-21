import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";

const authFailed = () =>
  NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 },
  );

export async function POST(request: NextRequest) {
  const log = logger.child({
    module: "news",
    action: "create",
  });

  const start = Date.now();

  try {
    const authToken = request.headers.get("Authorization")?.split(" ")[1];

    if (process.env.DCD_SECRET !== authToken) {
      log.warn(
        { event: "unauthorized_request" },
        "Unauthorized create request",
      );
      return authFailed();
    }

    const { author, content, link, image } = await request.json();

    if (!author || !content) {
      log.info(
        { event: "validation_failed", author, hasContent: !!content },
        "Missing required fields",
      );

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

    log.info(
      {
        event: "news_created",
        durationMs: Date.now() - start,
      },
      "News created",
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    log.error(
      {
        event: "create_failed",
        error,
      },
      "Failed to create news post",
    );

    return NextResponse.json(
      { success: false, message: "Failed to create news post" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const log = logger.child({
    module: "news",
    action: "update",
  });

  const start = Date.now();

  try {
    const authToken = request.headers.get("Authorization")?.split(" ")[1];

    if (process.env.DCD_SECRET !== authToken) {
      log.warn(
        { event: "unauthorized_request" },
        "Unauthorized update request",
      );
      return authFailed();
    }

    const searchParams = request.nextUrl.searchParams;
    const postLink = searchParams.get("url");

    if (!postLink) {
      return NextResponse.json(
        { success: false, message: "Query parameter 'url' required" },
        { status: 400 },
      );
    }

    const { author, content, link, image } = await request.json();

    const post = await prisma.news.findFirst({ where: { postLink } });

    if (!post) {
      log.info({ event: "not_found", postLink }, "News post not found");

      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    await prisma.news.update({
      where: { postLink },
      data: {
        author,
        content,
        postLink: link,
        ...(image ? { image } : {}),
      },
    });

    revalidateTag("news-PUBLIC", "max");

    log.info(
      {
        event: "news_updated",
        durationMs: Date.now() - start,
      },
      "News updated",
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    log.error(
      {
        event: "update_failed",
        error,
      },
      "Failed to update news post",
    );

    return NextResponse.json(
      { success: false, message: "Failed to update news post" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const log = logger.child({
    module: "news",
    action: "delete",
  });

  const start = Date.now();

  try {
    const authToken = request.headers.get("Authorization")?.split(" ")[1];

    if (process.env.DCD_SECRET !== authToken) {
      log.warn(
        { event: "unauthorized_request" },
        "Unauthorized delete request",
      );
      return authFailed();
    }

    const searchParams = request.nextUrl.searchParams;
    const postLink = searchParams.get("url");

    if (!postLink) {
      return NextResponse.json(
        { success: false, message: "Query parameter 'url' required" },
        { status: 400 },
      );
    }

    const post = await prisma.news.findFirst({ where: { postLink } });

    if (!post) {
      log.info({ event: "not_found", postLink }, "News post not found");

      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    await prisma.news.delete({ where: { postLink } });

    revalidateTag("news-PUBLIC", "max");

    log.info(
      {
        event: "news_deleted",
        durationMs: Date.now() - start,
      },
      "News deleted",
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    log.error(
      {
        event: "delete_failed",
        error,
      },
      "Failed to delete news post",
    );

    return NextResponse.json(
      { success: false, message: "Failed to delete news post" },
      { status: 500 },
    );
  }
}

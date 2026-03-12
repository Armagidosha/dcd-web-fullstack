"use server";

import { cacheTag } from "next/cache";
import type { NewsGetPayload } from "@/lib/generated/prisma/models";
import prisma from "@/lib/prisma";

export type NewsPost = NewsGetPayload<{
  select: {
    author: true;
    content: true;
    image: true;
    postLink: true;
    createdAt: true;
  };
}>;

export async function getNewsAction(limit = 8) {
  "use cache";
  cacheTag("news-PUBLIC");

  console.log("news-public-cached");

  return await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      author: true,
      content: true,
      image: true,
      postLink: true,
      createdAt: true,
    },
  });
}

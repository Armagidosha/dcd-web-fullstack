import "server-only";

import prisma from "@/lib/prisma";

export interface TNews {
  readonly content: string;
  readonly image: string | null;
  readonly author: string;
  readonly postLink: string | null;
  readonly createdAt: Date;
}

export async function getNews({ limit = 8 }): Promise<TNews[]> {
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

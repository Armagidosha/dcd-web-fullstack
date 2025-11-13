"use server";

import prisma from "@/lib/prisma";

export const getNews = async () => {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  return news;
};

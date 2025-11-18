"use server";

import prisma from "@/lib/prisma";

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: { price: "asc" },
    include: { category: true },
  });

  const latest = await prisma.latest.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { products: true } },
    },
  });
  return { products, categories, latest };
};

"use server";

import prisma from "@/lib/prisma";
import { checkRights } from "./utils";

export const getProductsSecure = async () => {
  await checkRights();

  const products = await prisma.product.findMany({
    orderBy: { price: "asc" },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    orderBy: { products: { _count: "desc" } },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { products: true } },
    },
  });

  return { products, categories };
};

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

  const categoriesWithProducts = categories.filter(
    (cat) => cat._count.products > 0,
  );

  return { products, categories: categoriesWithProducts, latest };
};

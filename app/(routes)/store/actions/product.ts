"use server";

import type { LatestOrder } from "@/app/shared/utils/types/products";
import prisma from "@/lib/prisma";

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: { price: "asc" },
    include: { category: true },
  });

  const completedOrders = await prisma.order.findMany({
    where: { status: "completed" },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      customerNick: true,
      updatedAt: true,
      product: { select: { image: true, name: true } },
    },
  });

  const latest: LatestOrder[] = completedOrders.map((order) => ({
    playerNick: order.customerNick,
    productName: order.product.name,
    productImage: order.product.image,
    purchasedAt: order.updatedAt,
  }));

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

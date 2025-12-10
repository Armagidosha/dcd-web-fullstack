import { checkRights } from "@/app/lib/actions/utils";
import prisma from "@/lib/prisma";

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

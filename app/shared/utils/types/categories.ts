import type { Category, Product } from "@/lib/generated/prisma/client";

export type ProductsWithCategory = Omit<Product, "updatedAt" | "createdAt"> & {
  category: Category | null;
};
export type CategoryWithCount = Category & { _count: { products: number } };

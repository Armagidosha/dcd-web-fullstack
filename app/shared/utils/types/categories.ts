// TODO: Добавить типы

import type { Category, Product } from "@/lib/generated/prisma/client";

export type ProductsWithCategory = Product & { category: Category };
export type CategoriesWithCount = Category & { _count: { products: number } };

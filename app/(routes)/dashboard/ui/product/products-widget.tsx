"use client";

import { deleteCategoryActionPrivate } from "@/lib/actions/category/delete-category";
import type { CategoryWithProductCount } from "@/lib/actions/category/get-category";
import { updateCategoryActionPrivate } from "@/lib/actions/category/patch-category";
import { deleteProductActionPrivate } from "@/lib/actions/product/delete-product";
import type { ProductWithCategory } from "@/lib/actions/product/get-products";
import { updateProductActionPrivate } from "@/lib/actions/product/patch-product";
import { createProductActionPrivate } from "@/lib/actions/product/post-product";
import { useModal } from "@/lib/utils/hooks/useModal";
import { Button } from "@/ui/primitives/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/primitives/card";
import { Separator } from "@/ui/primitives/separator";
import AddProductDialog from "./add-product-dialog";
import CategoryItem from "./category-item";
import EditCategoryDialog from "./edit-category-dialog";
import EditProductDialog from "./edit-product-dialog";
import ProductItem from "./product-item";

type ProductsCardProps = {
  products: ProductWithCategory[];
  categories: CategoryWithProductCount[];
};

export default function ProductsWidget({
  products,
  categories,
}: ProductsCardProps) {
  const modal = useModal<
    CategoryWithProductCount | ProductWithCategory | null,
    "add-product" | "edit-product" | "edit-category"
  >();
  const handleUpdateCategory = async (
    categoryName: string,
    categoryId: string,
  ) => {
    await updateCategoryActionPrivate(categoryName, categoryId);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategoryActionPrivate(categoryId);
  };

  const handleCreateProduct = async (formData: FormData) => {
    await createProductActionPrivate(formData);
  };

  const handleUpdateProduct = async (formData: FormData, productId: string) => {
    await updateProductActionPrivate(formData, productId);
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteProductActionPrivate(productId);
  };

  return (
    <>
      <EditCategoryDialog
        opened={modal.opened}
        onClose={modal.close}
        onEdit={handleUpdateCategory}
        category={modal.data as CategoryWithProductCount}
      />

      <EditProductDialog
        opened={modal.opened && modal.mode === "edit-product"}
        categories={categories}
        onClose={modal.close}
        onEdit={handleUpdateProduct}
        product={modal.data as ProductWithCategory}
      />

      <AddProductDialog
        opened={modal.opened && modal.mode === "add-product"}
        onClose={modal.close}
        onAdd={handleCreateProduct}
        categories={categories}
      />

      <Card>
        <CardHeader>
          <CardTitle>Товары и категории</CardTitle>
          <CardDescription className="hidden md:block">
            Добавление и редактирование товаров, управление категориями
          </CardDescription>
          <CardAction>
            <Button
              variant="outline"
              onClick={() => modal.open(null, "add-product")}
            >
              Добавить продукт
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-62 overscroll-contain overflow-y-auto">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onEdit={() => modal.open(product, "edit-product")}
                onDelete={() => handleDeleteProduct(product.id)}
              />
            ))}
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-50 overscroll-contain overflow-y-auto">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                onEdit={() => modal.open(category, "edit-category")}
                onDelete={() => handleDeleteCategory(category.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

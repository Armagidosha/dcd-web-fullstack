import type { ProductsWithCategory } from "@shared/utils/types/categories";
import { useState } from "react";
import {
  deleteProduct,
  postProduct,
  updateProduct,
} from "@/app/lib/api/product";

export const useProductManagement = (
  initialProducts: ProductsWithCategory[],
) => {
  const [products, setProducts] = useState(initialProducts);
  const [isAddModalOpened, setIsAddModalOpened] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<{
    product: ProductsWithCategory;
    field?: string;
  } | null>(null);

  const handleAddProduct = async (productData: FormData) => {
    try {
      const newProduct = await postProduct(productData);
      setProducts((prev) =>
        [...prev, newProduct].sort((a, b) => a.price - b.price),
      );
      setIsAddModalOpened(false);
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
      throw error;
    }
  };

  const handleEditProduct = async (productData: FormData) => {
    if (!editingItem) return;
    try {
      const updatedProduct = await updateProduct(
        editingItem.product.id,
        productData,
      );
      setProducts((prev) =>
        prev
          .map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
          .sort((a, b) => a.price - b.price),
      );
      setEditingItem(null);
    } catch (error) {
      console.error("Ошибка при редактировании продукта:", error);
      throw error;
    }
  };

  const handleDeleteProduct = async (product: ProductsWithCategory) => {
    if (!confirm(`Удалить продукт "${product.name}"?`)) return;
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
      throw error;
    }
  };

  return {
    products,
    editingItem,
    isAddModalOpened,
    setIsAddModalOpened,
    handleAddProduct,
    handleEditProduct,
    setEditingItem,
    handleDeleteProduct,
  };
};

"use client";
import { useState } from "react";
import { PlusIcon } from "@/app/shared/icons/icons";
import type {
  CategoryWithCount,
  ProductsWithCategory,
} from "@/app/shared/utils/types/categories";
import CategoriesTable from "./CategoriesTable";
import AddProductModal from "./new/AddProductModal";
import EditCategoryModal from "./new/EditCategoryModal";
import EditProductModal from "./new/EditProductModal";
import TabButtons from "./new/TabButtons";
import { useCategoryManagement } from "./new/useCategoryManagement";
import { useProductManagement } from "./new/useProductManagement";
import ProductsTable from "./ProductsTable";

interface TabsProps {
  products: ProductsWithCategory[];
  categories: CategoryWithCount[];
}

const Tabs = ({
  products: productsData,
  categories: categoriesData,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState("products");

  // Хук для продуктов
  const {
    products,
    editingItem,
    isAddModalOpened,
    setEditingItem,
    setIsAddModalOpened,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
  } = useProductManagement(productsData);

  // Хук для категорий
  const {
    categories,
    editingCategory,
    setEditingCategory,
    handleEditCategory,
    handleDeleteCategory,
  } = useCategoryManagement(categoriesData);

  const handleEditProductClick = (
    product: ProductsWithCategory,
    field?: string,
  ) => {
    setEditingItem({ product, field });
  };

  const handleEditCategoryClick = (category: CategoryWithCount) => {
    setEditingCategory(category);
  };

  return (
    <>
      {/* Модалка добавления продукта */}
      <AddProductModal
        isOpen={isAddModalOpened}
        categories={categories}
        onClose={() => setIsAddModalOpened(false)}
        onSubmit={handleAddProduct}
      />

      {/* Модалка редактирования продукта */}
      <EditProductModal
        product={editingItem?.product || null}
        field={editingItem?.field}
        categories={categories}
        onClose={() => setEditingItem(null)}
        onSubmit={handleEditProduct}
      />

      {/* Модалка редактирования категории */}
      <EditCategoryModal
        category={editingCategory}
        categories={categories}
        onClose={() => setEditingCategory(null)}
        onSubmit={handleEditCategory}
      />

      <div className="bg-surface rounded-2xl shadow-lg border border-border overflow-hidden">
        <TabButtons activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "products" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Управление продуктами</h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpened(true)}
                className="flex items-center gap-2 bg-secondary hover:opacity-80 hover:scale-103 
                  transition-[transform, opacity] duration-300 
                  px-6 py-3 rounded-xl font-semibold cursor-pointer group 
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon />
                Добавить продукт
              </button>
            </div>
            <ProductsTable
              products={products}
              onActionClick={handleDeleteProduct}
              onEditClick={handleEditProductClick}
            />
          </div>
        )}

        {activeTab === "categories" && (
          <div className="p-6">
            <div className="flex justify-between items-center h-12 mb-6">
              <h2 className="text-2xl font-bold">Управление категориями</h2>
            </div>
            <CategoriesTable
              categories={categories}
              onEditClick={handleEditCategoryClick}
              onActionClick={handleDeleteCategory}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Tabs;

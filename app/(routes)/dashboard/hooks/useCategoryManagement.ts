import type { CategoryWithCount } from "@shared/utils/types/categories";
import { useState } from "react";
import { deleteCategory, updateCategory } from "@/app/lib/api/category";

export const useCategoryManagement = (
  initialCategories: CategoryWithCount[],
) => {
  const [categories, setCategories] = useState(initialCategories);
  const [editingCategory, setEditingCategory] =
    useState<CategoryWithCount | null>(null);

  const handleEditCategory = async (categoryData: string) => {
    if (!editingCategory) return;
    try {
      const updatedCategory = await updateCategory(
        editingCategory.id,
        categoryData,
      );
      setCategories((prev) =>
        prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)),
      );
      setEditingCategory(null);
    } catch (error) {
      console.error("Ошибка при редактировании категории:", error);
      throw error;
    }
  };

  const handleDeleteCategory = async (category: CategoryWithCount) => {
    if (!confirm(`Удалить категорию "${category.name}"?`)) return;
    try {
      await deleteCategory(category.id);
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
    } catch (error) {
      console.error("Ошибка при удалении категории:", error);
    }
  };

  return {
    categories,
    editingCategory,
    setEditingCategory,
    handleEditCategory,
    handleDeleteCategory,
  };
};

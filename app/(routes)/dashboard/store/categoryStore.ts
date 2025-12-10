import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { checkRes } from "@/app/shared/utils/functions";
import type { CategoryWithCount } from "@/app/shared/utils/types/categories";

interface Store {
  categories: CategoryWithCount[];
  getCategories: () => Promise<void>;
  updateCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string, name: string) => Promise<void>;
}

export const useCategoryStore = create<Store>((set) => ({
  categories: [],

  getCategories: async () => {
    try {
      const response = await fetch("/dashboard/api/category");
      const categories = await checkRes(response);

      set({ categories });
    } catch (error) {
      console.error("Error fetching categories: ", error);
      throw error;
    }
  },
  // Category actions
  updateCategory: async (categoryId: string, name: string) => {
    try {
      const body = JSON.stringify({ name });
      const response = await fetch(`/dashboard/api/category/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const updated: CategoryWithCount = await checkRes(response);

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === categoryId ? updated : cat,
        ),
      }));
    } catch (error) {
      console.error("Ошибка при обновлении категории: ", error);
      throw error;
    }
  },

  deleteCategory: async (categoryId: string) => {
    try {
      const response = await fetch(`/dashboard/api/category/${categoryId}`, {
        method: "DELETE",
      });

      await checkRes(response);

      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== categoryId),
      }));
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },
}));

// Selectors

export const useCategoriesSelector = () =>
  useCategoryStore((state) => state.categories);

// Actions

export const useGetCategoriesAction = () =>
  useCategoryStore(useShallow((state) => state.getCategories));

export const useUpdateCategoryAction = () =>
  useCategoryStore(useShallow((state) => state.updateCategory));

export const useDeleteCategoryAction = () =>
  useCategoryStore(useShallow((state) => state.deleteCategory));

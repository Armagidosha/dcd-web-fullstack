import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { checkRes } from "@/app/shared/utils/functions";
import type { ProductsWithCategory } from "@/app/shared/utils/types/categories";

interface Store {
  products: ProductsWithCategory[];

  getProducts: () => Promise<void>;
  createProduct: (formData: FormData) => Promise<void>;
  updateProduct: (formData: FormData, productId: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

export const useProductsStore = create<Store>((set) => ({
  products: [],

  // Product actions

  getProducts: async () => {
    try {
      const response = await fetch("/dashboard/api/product");
      const products = await checkRes(response);

      set({ products });
    } catch (error) {
      console.error("Произошла ошибка при получении продуктов: ", error);
      throw error;
    }
  },

  createProduct: async (formData: FormData) => {
    try {
      const response = await fetch("/dashboard/api/product", {
        method: "POST",
        body: formData,
      });

      const newProduct: ProductsWithCategory = await checkRes(response);

      set((state) => {
        const updatedProducts = [...state.products, newProduct].sort(
          (a, b) => a.price - b.price,
        );

        return {
          products: updatedProducts,
        };
      });
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  updateProduct: async (formData: FormData, productId: string) => {
    try {
      const response = await fetch(`/dashboard/api/product/${productId}`, {
        method: "PATCH",
        body: formData,
      });

      const updated: ProductsWithCategory = await checkRes(response);

      set((state) => {
        const updatedProducts = state.products
          .map((prod) => (prod.id === updated.id ? updated : prod))
          .sort((a, b) => a.price - b.price);

        return {
          products: updatedProducts,
        };
      });
    } catch (error) {
      console.error("Error updating product: ", error);
      throw error;
    }
  },

  deleteProduct: async (productId: string) => {
    try {
      const response = await fetch(`/dashboard/api/product/${productId}`, {
        method: "DELETE",
      });

      await checkRes(response);

      set((state) => ({
        products: state.products.filter((prod) => prod.id !== productId),
      }));
    } catch (error) {
      console.error("Error deleting product: ", error);
      throw error;
    }
  },
}));

// Selectors

export const useProductsSelector = () =>
  useProductsStore((state) => state.products);

// Actions

export const useProductActions = () =>
  useProductsStore(
    useShallow((state) => ({
      getProducts: state.getProducts,
      createProduct: state.createProduct,
      updateProduct: state.updateProduct,
      deleteProduct: state.deleteProduct,
    })),
  );

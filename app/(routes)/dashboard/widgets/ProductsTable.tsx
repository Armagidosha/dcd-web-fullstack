import { PlusIcon, TrashIcon } from "@shared/icons/icons";
import ImageWithFallback from "@shared/ui/ImageWithFallback";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Modal from "@/app/shared/ui/Modal";
import type { ProductsWithCategory } from "@/app/shared/utils/types/categories";
import {
  useCategoriesSelector,
  useGetCategoriesAction,
} from "../store/categoryStore";
import { useProductActions, useProductsSelector } from "../store/productStore";
import AddProductForm from "../ui/forms/AddProductForm";
import EditProductForm from "../ui/forms/EditProductForm";

type EditingState = {
  product: ProductsWithCategory;
  field: string;
};

export default function ProductsTable() {
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const getCategories = useGetCategoriesAction();
  const { getProducts, createProduct, updateProduct, deleteProduct } =
    useProductActions();

  useEffect(() => {
    getCategories();
    getProducts();
  }, [getCategories, getProducts]);

  const products = useProductsSelector();
  const categories = useCategoriesSelector();

  const handleSubmitProduct = async (formData: FormData) => {
    if (!editing?.product) return;
    await updateProduct(formData, editing.product.id).then(() =>
      setEditing(null),
    );
  };

  const handleCreateProduct = async (formData: FormData) => {
    await createProduct(formData).then(() => setIsOpen(false));
  };

  return (
    <>
      <Modal
        title="Редактирование"
        className="px-4"
        size="lg"
        opened={!!editing}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <EditProductForm
            categories={categories}
            product={editing.product}
            field={editing.field}
            onSubmit={handleSubmitProduct}
          />
        )}
      </Modal>

      <Modal
        title="Добавить продукт"
        className="px-4"
        size="xl"
        opened={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AddProductForm
          categories={categories}
          onSubmit={handleCreateProduct}
        />
      </Modal>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление продуктами</h2>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-secondary hover:opacity-80 hover:scale-103 
                  transition-[transform, opacity] duration-300 
                  px-6 py-3 rounded-xl font-semibold cursor-pointer group 
                  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon />
          Добавить продукт
        </button>
      </div>

      <div className="overflow-x-auto h-150 overscroll-y-contain">
        <table className="w-full">
          <thead className="sticky top-0 bg-surface z-10">
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold">Изображение</th>
              <th className="text-left py-4 px-4 font-semibold">Название</th>
              <th className="text-left py-4 px-4 font-semibold">Описание</th>
              <th className="text-left py-4 px-4 font-semibold">Цена</th>
              <th className="text-left py-4 px-4 font-semibold">Категория</th>
              <th className="text-left py-4 px-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.id}
                className={clsx(
                  "border-b border-border",
                  idx % 2 === 0 && "bg-surface-variant",
                )}
              >
                <td className="py-4 px-4">
                  <button
                    className={clsx(
                      `w-20 h-20 rounded-lg flex items-center justify-center text-2xl 
                    cursor-pointer hover:opacity-80 transition-opacity duration-300`,
                      idx % 2 === 0 ? "bg-surface" : "bg-surface-variant",
                    )}
                    onClick={() => setEditing({ product, field: "image" })}
                    type="button"
                  >
                    <ImageWithFallback
                      className="object-cover aspect-square"
                      width={80}
                      height={80}
                      src={product.image}
                      alt={product.name}
                    />
                  </button>
                </td>
                <td>
                  <button
                    className="py-4 px-4 font-medium cursor-pointer 
                  hover:text-secondary transition-colors duration-300"
                    onClick={() => setEditing({ product, field: "name" })}
                    type="button"
                  >
                    {product.name}
                  </button>
                </td>
                <td>
                  <button
                    className="py-4 px-4 max-w-xs truncate cursor-pointer 
                  hover:text-secondary transition-colors duration-300"
                    onClick={() =>
                      setEditing({ product, field: "description" })
                    }
                    type="button"
                  >
                    {product.description}
                  </button>
                </td>
                <td>
                  <button
                    className="py-4 px-4 font-semibold cursor-pointer 
                  hover:text-secondary transition-colors duration-300"
                    type="button"
                    onClick={() => setEditing({ product, field: "price" })}
                  >
                    ${product.price}
                  </button>
                </td>
                <td>
                  <button
                    className="py-4 px-4 cursor-pointer"
                    onClick={() => setEditing({ product, field: "category" })}
                    type="button"
                  >
                    <span
                      className="bg-secondary px-3 py-1 rounded-full text-nowrap text-sm 
                    font-medium hover:opacity-80 transition-opacity duration-300"
                    >
                      {product.category?.name || "Нет категории"}
                    </span>
                  </button>
                </td>
                <td className="py-4 px-4">
                  <button
                    type="button"
                    onClick={() => deleteProduct(product)}
                    className="p-2 cursor-pointer rounded-lg group"
                  >
                    <TrashIcon className="text-primary group-hover:scale-125 duration-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

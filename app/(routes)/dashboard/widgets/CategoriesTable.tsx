import { TrashIcon } from "@shared/icons/icons";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Modal from "@/app/shared/ui/Modal";
import type { CategoryWithCount } from "@/app/shared/utils/types/categories";
import {
  useCategoriesSelector,
  useDeleteCategoryAction,
  useGetCategoriesAction,
  useUpdateCategoryAction,
} from "../store/categoryStore";
import EditCategoryForm from "../ui/forms/EditCategoryForm";

export default function CategoriesTable() {
  const [editing, setEditing] = useState<CategoryWithCount | null>(null);

  const getCategories = useGetCategoriesAction();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const categories = useCategoriesSelector();
  console.log(categories);
  const updateCategory = useUpdateCategoryAction();
  const deleteCategory = useDeleteCategoryAction();

  const handleUpdate = async (categoryId: string, name: string) => {
    await updateCategory(categoryId, name).then(() => setEditing(null));
  };

  return (
    <>
      <Modal
        title="Редактирование категории"
        className="px-4"
        size="md"
        opened={!!editing}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <EditCategoryForm
            categories={categories}
            category={editing}
            onSubmit={handleUpdate}
          />
        )}
      </Modal>

      <div className="overflow-x-auto h-150 overscroll-y-contain">
        <table className="w-full">
          <thead className="sticky top-0 bg-surface z-10">
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold w-full">
                Название
              </th>
              <th className="py-4 px-4 font-semibold">Продуктов</th>
              <th className="text-left py-4 px-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, idx) => (
              <tr
                key={category.id}
                className={clsx(
                  "border-b border-border group",
                  idx % 2 === 0 && "bg-surface-variant",
                )}
              >
                <td className="py-4 px-4 max-w-xs">
                  <button
                    type="button"
                    onClick={() => setEditing(category)}
                    className="truncate cursor-pointer group-hover:text-secondary 
                  transition-colors duration-300 text-left w-full"
                  >
                    {category.name}
                  </button>
                </td>
                <td className="text-center py-4 px-4">
                  {category._count.products}
                </td>
                <td className="py-4 px-4">
                  <button
                    type="button"
                    onClick={() => deleteCategory(category.id, category.name)}
                    className="p-2 text-primary cursor-pointer group/button rounded-lg"
                  >
                    <TrashIcon
                      className="group-hover/button:scale-125 
                    transition-transform duration-300"
                    />
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

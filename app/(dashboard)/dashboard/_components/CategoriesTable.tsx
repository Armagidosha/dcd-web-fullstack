import { TrashIcon } from "@/app/shared/icons/icons";
import type { CategoryWithCount } from "@/app/shared/utils/types/categories";

interface CategoriesTableProps {
  categories: CategoryWithCount[];
  onEditClick: (categoryData: CategoryWithCount) => void;
  onActionClick: (category: CategoryWithCount) => void;
}

export default function CategoriesTable({
  categories,
  onEditClick,
  onActionClick,
}: CategoriesTableProps) {
  return (
    <div className="overflow-x-auto h-150 overscroll-y-contain">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 font-semibold w-full">
              Название
            </th>
            <th className="py-4 px-4 font-semibold">Продуктов</th>
            <th className="text-left py-4 px-4 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b border-border transition-colors group"
            >
              <td className="py-4 px-4 max-w-xs">
                <button
                  type="button"
                  onClick={() => onEditClick(category)}
                  className="truncate cursor-pointer group-hover:text-primary transition-colors text-left w-full"
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
                  onClick={() => onActionClick(category)}
                  className="p-2 text-primary cursor-pointer rounded-lg group/button"
                >
                  <TrashIcon className="text-primary group-hover/button:scale-125" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

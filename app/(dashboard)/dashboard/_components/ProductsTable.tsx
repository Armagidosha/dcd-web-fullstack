import { TrashIcon } from "@/app/shared/icons/icons";
import ImageWithFallback from "@/app/shared/ui/ImageWithFallback/ImageWithFallback";
import type { ProductsWithCategory } from "@/app/shared/utils/types/categories";

interface ProductsTableProps {
  products: ProductsWithCategory[];
  onActionClick: (ProductData: ProductsWithCategory) => void;
  onEditClick: (ProductData: ProductsWithCategory, field?: string) => void;
}

export default function ProductsTable({
  products,
  onActionClick,
  onEditClick,
}: ProductsTableProps) {
  return (
    <div className="overflow-x-auto h-150 overscroll-y-contain">
      <table className="w-full">
        <thead>
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
          {products.map((product) => (
            <tr key={product.id} className="border-b border-border">
              <td className="py-4 px-4">
                <button
                  className="w-20 h-20 bg-surface-variant rounded-lg flex items-center justify-center text-2xl cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  onClick={() => onEditClick(product, "image")}
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
                  className="py-4 px-4 font-medium cursor-pointer hover:text-primary transition-colors duration-300"
                  onClick={() => onEditClick(product, "name")}
                  type="button"
                >
                  {product.name}
                </button>
              </td>
              <td>
                <button
                  className="py-4 px-4 max-w-xs truncate cursor-pointer hover:text-primary transition-colors duration-300"
                  onClick={() => onEditClick(product, "description")}
                  type="button"
                >
                  {product.description}
                </button>
              </td>
              <td>
                <button
                  className="py-4 px-4 font-semibold cursor-pointer hover:text-primary transition-colors duration-300"
                  type="button"
                  onClick={() => onEditClick(product, "price")}
                >
                  ${product.price}
                </button>
              </td>
              <td>
                <button
                  className="py-4 px-4 cursor-pointer"
                  onClick={() => onEditClick(product, "category")}
                  type="button"
                >
                  <span className="bg-primary px-3 py-1 rounded-full text-nowrap text-sm font-medium hover:opacity-80 transition-opacity">
                    {product.category?.name || "Нет категории"}
                  </span>
                </button>
              </td>
              <td className="py-4 px-4">
                <button
                  type="button"
                  onClick={() => onActionClick(product)}
                  className="p-2 cursor-pointer rounded-lg group"
                >
                  <TrashIcon className="text-primary group-hover:scale-125" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

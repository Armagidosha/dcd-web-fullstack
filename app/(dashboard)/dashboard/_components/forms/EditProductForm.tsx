"use client";

import { useState } from "react";
import ImageWithFallback from "@/app/shared/ui/ImageWithFallback/ImageWithFallback";
import MarkdownEditor from "@/app/shared/ui/MarkDownEditor";
import type {
  CategoryWithCount,
  ProductsWithCategory,
} from "@/app/shared/utils/types/categories";

interface EditProductFormProps {
  product: ProductsWithCategory;
  field: string;
  categories?: CategoryWithCount[];
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export default function EditProductForm({
  product,
  field,
  categories = [],
  onSubmit,
  isLoading = false,
}: EditProductFormProps) {
  const [value, setValue] = useState(getInitialValue());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(
    field === "image" ? product.image || "" : "",
  );

  // Получаем начальное значение для поля
  function getInitialValue(): string | number {
    switch (field) {
      case "name":
        return product.name;
      case "description":
        return product.description || "";
      case "price":
        return product.price;
      case "image":
        return product.image || "";
      case "category":
        return product.category?.name || "";
      default:
        return "";
    }
  }

  const handleImageChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (newPrice: number) => {
    const clampedPrice = Math.max(1, Math.min(10000, newPrice));
    setValue(clampedPrice);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (field === "image") {
      imageFile && formData.append("image", imageFile);
    } else {
      formData.append(field, value.toString());
    }

    onSubmit(formData);
  };

  // Рендерим разные типы полей в зависимости от field
  const renderField = () => {
    switch (field) {
      case "name":
        return (
          <>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-light-text mb-2"
            >
              Название продукта
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-surface-variant focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Введите название"
            />
          </>
        );

      case "description":
        return (
          <div>
            <MarkdownEditor
              onChange={(e) => setValue(e.target.value)}
              value={value.toString()}
            />
          </div>
        );

      case "price":
        return (
          <>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-light-text mb-2"
            >
              Цена
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                id="price"
                name="price"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                min="0"
                max="10000"
                className="w-full px-4 py-3 pr-24 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Введите цену"
              />
              <div className="absolute right-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => handlePriceChange(Number(value) - 10)}
                  className="w-9 h-9 flex items-center justify-center bg-primary cursor-pointer rounded-md transition font-bold text-light-text hover:opacity-90"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => handlePriceChange(Number(value) + 10)}
                  className="w-9 h-9 flex items-center justify-center bg-primary cursor-pointer rounded-md transition font-bold text-light-text hover:opacity-90"
                >
                  +
                </button>
              </div>
            </div>
          </>
        );

      case "image":
        return (
          <>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-light-text mb-2"
            >
              Изображение
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-light-text file:cursor-pointer file:w-40"
            />
            {preview && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2 text-light-text">
                  Предварительный просмотр:
                </p>
                <ImageWithFallback
                  width={200}
                  height={200}
                  src={preview}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg border border-border"
                />
              </div>
            )}
          </>
        );

      case "category":
        return (
          <>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-light-text mb-2"
            >
              Категория
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-border bg-surface-variant focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition"
              placeholder="Выбери или введи новую категорию"
              onChange={(e) => setValue(e.target.value)}
              list="categoryList"
              autoComplete="off"
              name="category"
              value={value}
              id="category"
              type="text"
            />
            <datalist id="categoryList">
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}></option>
              ))}
            </datalist>
          </>
        );

      default:
        return null;
    }
  };

  // Проверка валидности формы
  const isFormValid = () => {
    if (field === "image") {
      return imageFile !== null;
    }
    if (field === "price") {
      return Number(value) > 0;
    }
    return value.toString().trim() !== "";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-6">
      <p className="text-sm opacity-70">
        Продукт: <span className="font-semibold">{product.name}</span>
      </p>

      <div>{renderField()}</div>

      {/* Кнопки */}
      <div className="mt-auto pb-4">
        <button
          type="submit"
          disabled={isLoading || !isFormValid()}
          className="w-full bg-primary px-6 py-3 rounded-xl font-semibold cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </form>
  );
}

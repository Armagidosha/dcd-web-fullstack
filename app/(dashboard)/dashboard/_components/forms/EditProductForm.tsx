"use client";

import { useState } from "react";
import FileInput from "@/app/shared/ui/Input/FileInput";
import NumberInput from "@/app/shared/ui/Input/NumberInput";
import TextInput from "@/app/shared/ui/Input/TextInput";
import MarkdownEditor from "@/app/shared/ui/MarkDownEditor";
import { useAsync } from "@/app/shared/utils/hooks";
import type {
  CategoryWithCount,
  ProductsWithCategory,
} from "@/app/shared/utils/types/categories";

interface EditProductFormProps {
  product: ProductsWithCategory;
  field: string;
  categories?: CategoryWithCount[];
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
}

export default function EditProductForm({
  product,
  field,
  categories = [],
  onSubmit,
}: EditProductFormProps) {
  const [value, setValue] = useState(getInitialValue());
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { isLoading, errors, execute, clearFieldError } = useAsync();

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
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (field === "image") {
      imageFile && formData.append("image", imageFile);
    } else {
      formData.append(field, value.toString());
    }

    await execute(onSubmit, formData);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValue(value);
    clearFieldError(name);
  };

  const handlePriceChange = (value: number | "") => {
    setValue(value);
    clearFieldError("price");
  };

  // Рендерим разные типы полей в зависимости от field
  const renderField = () => {
    switch (field) {
      case "name":
        return (
          <TextInput
            label="Название продукта"
            placeholder="Введите название"
            description="От 3 до 16 символов"
            name="name"
            required
            errors={errors?.name}
            onChange={handleChange}
            value={value}
            disabled={isLoading}
          />
        );

      case "description":
        return (
          <MarkdownEditor
            onChange={(e) => setValue(e.target.value)}
            value={value.toString()}
            errors={errors?.description}
          />
        );

      case "price":
        return (
          <NumberInput
            name="price"
            label="Цена"
            description="Допустимые значения от 50 до 10000"
            placeholder="Введите цену"
            value={String(value)}
            onChange={(value) => handlePriceChange(value)}
            errors={errors.price}
            min={50}
            max={10000}
            step={1}
            required
            disabled={isLoading}
          />
        );

      case "image":
        return (
          <FileInput
            label="Изображение"
            description="Принимаемые форматы: JPEG, PNG, WebP"
            name="image"
            accept=".png,.jpg,.webp"
            onChange={handleImageChange}
            onReset={() => setImageFile(null)}
            errors={errors.image}
            required
            disabled={isLoading}
          />
        );

      case "category":
        return (
          <TextInput
            label="Название категории"
            placeholder="Введите название"
            description="От 3 до 16 символов"
            name="category"
            errors={errors?.category}
            onChange={handleChange}
            value={value}
            dataList={categories?.map((cat) => {
              return { id: cat.id, value: cat.name };
            })}
            required
            disabled={isLoading}
          />
        );

      default:
        return null;
    }
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
          disabled={isLoading || Object.keys(errors).length > 0}
          className="w-full bg-primary px-6 py-3 rounded-xl font-semibold cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </form>
  );
}

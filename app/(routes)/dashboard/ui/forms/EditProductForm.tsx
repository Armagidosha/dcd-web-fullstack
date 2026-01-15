"use client";

import FileInput from "@shared/ui/Input/FileInput";
import NumberInput from "@shared/ui/Input/NumberInput";
import TextInput from "@shared/ui/Input/TextInput";
import MarkdownEditor from "@shared/ui/MarkDownEditor";
import { useAsync } from "@shared/utils/hooks";
import type { ProductsWithCategory } from "@shared/utils/types/categories";
import { useState } from "react";
import Button from "@/app/shared/ui/Button";
import type { Category } from "@/lib/generated/prisma/client";

interface EditProductFormProps {
  product: ProductsWithCategory;
  categories: Category[];
  field: string;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
}

export default function EditProductForm({
  product,
  categories,
  field,
  onSubmit,
}: EditProductFormProps) {
  const [value, setValue] = useState(getInitialValue());
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { isLoading, errors, execute, clearFieldError } = useAsync();

  function getInitialValue(): string | number {
    switch (field) {
      case "name":
        return product.name;
      case "key":
        return product.key;
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

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

      case "key":
        return (
          <TextInput
            label="Ключ продукта"
            placeholder="Введите ключ"
            description="Пример: privilege:warden"
            name="key"
            errors={errors?.key}
            onChange={handleChange}
            value={value}
            disabled={isLoading}
            required
          />
        );

      case "description":
        return (
          <MarkdownEditor
            name="description"
            onChange={handleChange}
            value={value.toString()}
            errors={errors?.description}
            required
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
            errors={errors?.price}
            min={50}
            max={10000}
            step={1}
            disabled={isLoading}
            required
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
            errors={errors?.image}
            disabled={isLoading}
            required
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
            disabled={isLoading}
            required
          />
        );

      default:
        return null;
    }
  };

  return (
    <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
      <p className="text-sm opacity-70">
        Продукт: <span className="font-semibold">{product.name}</span>
      </p>

      <div>{renderField()}</div>

      <Button
        disabled={isLoading || Object.keys(errors ?? {}).length > 0}
        type="submit"
      >
        {isLoading ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  );
}

"use client";

import FileInput from "@shared/ui/Input/FileInput";
import NumberInput from "@shared/ui/Input/NumberInput";
import TextInput from "@shared/ui/Input/TextInput";
import MarkdownEditor from "@shared/ui/MarkDownEditor";
import { useAsync } from "@shared/utils/hooks";
import type { AddProductFormData } from "@shared/utils/types/products";
import { useMemo, useState } from "react";
import type { CategoryWithCount } from "@/app/shared/utils/types/categories";

interface ProductFormProps {
  categories: CategoryWithCount[];
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function AddProductForm({
  onSubmit,
  categories,
}: ProductFormProps) {
  // Состояние формы
  const [productData, setProductData] = useState<AddProductFormData>({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: null,
  });

  const { isLoading, errors, execute, clearFieldError } = useAsync();

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearFieldError(name);
  };

  const handleImageChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (file) {
      setProductData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handlePriceChange = (value: number | "") => {
    setProductData((prev) => ({ ...prev, price: Number(value) }));
    clearFieldError("price");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("price", productData.price.toString());
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    if (productData.image) {
      formData.append("image", productData.image);
    }

    await execute(onSubmit, formData);
  };

  const isFormValid = useMemo(() => {
    return (
      productData.name.trim() !== "" &&
      productData.price >= 50 &&
      productData.description.trim() !== "" &&
      productData.image !== null &&
      productData.category.trim() !== ""
    );
  }, [productData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextInput
        label="Название категории"
        placeholder="Введите название категории"
        description="От 3 до 16 символов"
        name="category"
        errors={errors?.category || undefined}
        onChange={handleChange}
        value={productData.category}
        dataList={categories?.map((cat) => {
          return { id: cat.id, value: cat.name };
        })}
        required
        disabled={isLoading}
      />

      <TextInput
        label="Название продукта"
        placeholder="Введите название"
        description="От 3 до 16 символов"
        name="name"
        required
        errors={errors?.name}
        onChange={handleChange}
        value={productData.name}
        disabled={isLoading}
      />

      <NumberInput
        name="price"
        label="Цена"
        description="Допустимые значения от 50 до 10000"
        placeholder="Введите цену"
        value={String(productData.price)}
        onChange={(value) => handlePriceChange(value)}
        errors={errors?.price}
        min={50}
        max={10000}
        step={1}
        required
        disabled={isLoading}
      />

      <FileInput
        label="Изображение"
        description="Принимаемые форматы: JPEG, PNG, WebP"
        name="image"
        accept=".png,.jpg,.webp"
        onChange={handleImageChange}
        onReset={() => setProductData((prev) => ({ ...prev, image: null }))}
        errors={errors?.image}
        required
        disabled={isLoading}
      />

      <MarkdownEditor
        name="description"
        onChange={handleChange}
        value={productData.description}
        errors={errors?.description}
      />

      <button
        disabled={!isFormValid || Object.keys(errors).length > 0}
        type="submit"
        className="w-full bg-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-primary transition duration-200 shadow-md hover:shadow-lg"
      >
        {isLoading ? "Добавление..." : "Добавить продукт"}
      </button>
    </form>
  );
}

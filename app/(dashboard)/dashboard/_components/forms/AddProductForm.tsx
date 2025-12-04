"use client";

import { useMemo, useState } from "react";
import ImageWithFallback from "@/app/shared/ui/ImageWithFallback/ImageWithFallback";
import MarkdownEditor from "@/app/shared/ui/MarkDownEditor";
import { useAsync } from "@/app/shared/utils/hooks";
import type { CategoryWithCount } from "@/app/shared/utils/types/categories";
import type { AddProductFormData } from "@/app/shared/utils/types/products";

interface ProductFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  categories?: CategoryWithCount[];
}

export default function AddProductForm({
  onSubmit,
  categories,
}: ProductFormProps) {
  const { execute, isLoading } = useAsync();

  // Состояние формы
  const [productData, setProductData] = useState<AddProductFormData>({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: null,
  });
  // Превью картинки
  const [preview, setPreview] = useState("");

  const isFormValid = useMemo(() => {
    return (
      productData.name.trim() !== "" &&
      productData.price > 0 &&
      productData.description.trim() !== "" &&
      productData.image !== null &&
      productData.category.trim() !== ""
    );
  }, [productData]);

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (file) {
      setProductData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-light-text mb-2"
        >
          Категория
        </label>
        <input
          className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border focus:border-transparent outline-none transition"
          placeholder="Выбери или введи новую категорию"
          onChange={handleChange}
          autoComplete="off"
          name="category"
          list="categoryList"
          value={productData.category}
          id="category"
          type="text"
        />
        <datalist id="categoryList">
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.name}></option>
          ))}
        </datalist>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-light-text mb-2"
        >
          Название
        </label>
        <input
          required
          id="name"
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border focus:border-transparent outline-none transition"
          placeholder="Введите название продукта"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-light-text mb-2"
        >
          Цена
        </label>
        <div className="relative flex items-center">
          <input
            required
            min={0}
            max={10000}
            id="price"
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 pr-24 border border-border rounded-lg focus:ring-2 focus:ring-border focus:border-transparent outline-none transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0.00"
            step="10"
          />
          <div className="absolute right-1 flex gap-1">
            <button
              type="button"
              onClick={() => {
                const newValue = Math.max(0, Number(productData.price) - 10);
                setProductData((prev) => ({ ...prev, price: newValue }));
              }}
              className="w-9 h-9 flex items-center justify-center bg-primary cursor-pointer rounded-md transition font-bold text-light-text"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => {
                const newValue = Math.min(
                  10000,
                  Number(productData.price) + 10,
                );
                setProductData((prev) => ({ ...prev, price: newValue }));
              }}
              className="w-9 h-9 flex items-center justify-center bg-primary cursor-pointer rounded-md transition font-bold text-light-text"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-light-text mb-2"
        >
          Изображение
        </label>
        <input
          required
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-border focus:border-transparent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-light-text file:cursor-pointer file:w-40"
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
      </div>

      <MarkdownEditor onChange={handleChange} value={productData.description} />

      <button
        disabled={!isFormValid || isLoading}
        type="submit"
        className="w-full bg-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-primary transition duration-200 shadow-md hover:shadow-lg"
      >
        Добавить продукт
      </button>
    </form>
  );
}

"use client";

import { type FormEvent, useState } from "react";
import TextInput from "@/app/shared/ui/Input/TextInput";
import { useAsync } from "@/app/shared/utils/hooks";
import type { CategoryWithCount } from "@/app/shared/utils/types/categories";

interface EditCategoryForm {
  category: CategoryWithCount;
  categories: CategoryWithCount[];
  onSubmit: (data: string) => Promise<void>;
}

export default function EditCategoryForm({
  category,
  categories,
  onSubmit,
}: EditCategoryForm) {
  const [value, setValue] = useState(category.name);

  const { isLoading, errors, execute, clearFieldError } = useAsync();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValue(value);
    clearFieldError(name);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    execute(onSubmit, value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-6">
      <TextInput
        label="Название категории"
        placeholder="Введите название"
        description="От 3 до 16 символов"
        name="name"
        errors={errors?.name || undefined}
        onChange={handleChange}
        value={value}
        dataList={categories.map((cat) => {
          return { id: cat.id, value: cat.name };
        })}
        required
        disabled={isLoading}
      />

      <div className="mt-auto pb-4">
        <button
          type="submit"
          className={`
            w-full bg-primary px-6 py-3 rounded-xl font-semibold cursor-pointer hover:opacity-90 
            transition-opacity disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </form>
  );
}

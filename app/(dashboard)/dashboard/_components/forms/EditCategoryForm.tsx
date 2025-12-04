import { type FormEvent, useState } from "react";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-6">
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
      <div className="mt-auto pb-4">
        <button
          type="submit"
          className="w-full bg-primary px-6 py-3 rounded-xl font-semibold cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}

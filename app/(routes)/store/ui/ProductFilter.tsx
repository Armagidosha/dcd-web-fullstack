"use client";
import clsx from "clsx";
import { useState } from "react";

type TCategory = {
  id: string;
  name: string;
  _count: { products: number };
};

interface ProductFilterProps {
  title: string;
  categories: TCategory[];
  onClick: (category: string) => void;
}

export default function ProductFilter({
  title,
  categories,
  onClick,
}: ProductFilterProps) {
  const [active, setActive] = useState(categories[0]?.id ?? "");

  const handleClick = (element: string) => {
    setActive(element);
    onClick(element);
  };

  return (
    <div className="relative gradient-bg backdrop-blur-sm rounded-2xl overflow-hidden border border-border/40 p-4">
      {/* Декоративный градиент сверху */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Заголовок */}
      <div className="relative mb-4">
        <h2 className="text-xl font-bold text-light-text">{title}</h2>
        <div className="h-px mt-3 bg-linear-to-r from-border/50 via-border/20 to-transparent" />
      </div>

      {/* Кнопки фильтра */}
      <div className="relative flex flex-wrap gap-3">
        {categories.map((el) => (
          <button
            className={clsx(
              "group relative flex items-center gap-2 overflow-hidden rounded-xl transition-all duration-300",
              "border",
              active === el.id
                ? "bg-primary border-primary/50 shadow-lg shadow-primary/30 scale-105"
                : "bg-surface-variant/80 border-border/30 hover:border-border/60 hover:bg-surface-variant hover:-translate-y-0.5 cursor-pointer",
            )}
            key={el.id}
            type="button"
            onClick={() => handleClick(el.id)}
            disabled={el.id === active}
          >
            {/* Название категории */}
            <span
              className={clsx(
                "relative px-4 py-2.5 font-semibold text-sm transition-colors duration-300",
                active === el.id
                  ? "text-white"
                  : "text-light-text group-hover:text-primary",
              )}
            >
              {el.name}
            </span>
            {/* Счетчик товаров */}
            <span
              className={clsx(
                "relative flex items-center justify-center min-w-10 h-full px-3 text-xs font-bold border-l transition-colors duration-300",
                active === el.id
                  ? "border-white/30 text-white bg-white/10"
                  : "border-border/30 text-dim-text group-hover:text-primary group-hover:border-primary/30",
              )}
            >
              {el._count.products}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

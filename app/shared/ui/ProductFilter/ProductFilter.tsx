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
    <div className="py-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <div className="flex gap-2">
        {categories.map((el) => (
          <button
            className={clsx(
              "flex py-2 pl-8 pr-3 rounded-2xl",
              active === el.id ? "bg-primary" : "bg-gray-700 cursor-pointer",
            )}
            key={el.id}
            type="button"
            onClick={() => handleClick(el.id)}
            disabled={el.id === active}
          >
            {el.name}
            <span className="bg-secondary px-2 rounded-lg ml-3">
              {el._count.products}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

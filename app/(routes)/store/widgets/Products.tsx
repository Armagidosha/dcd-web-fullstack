"use client";

import Modal from "@shared/ui/Modal";
import type {
  CategoryWithCount,
  ProductsWithCategory,
} from "@shared/utils/types/categories";
import { useState } from "react";
import ProductCardModal from "../ui/modals/ProductCardModal";
import ProductCard from "../ui/ProductCard";
import ProductFilter from "../ui/ProductFilter";

interface ProductsProps {
  products: ProductsWithCategory[];
  categories: CategoryWithCount[];
}

export default function Products({ products, categories }: ProductsProps) {
  const [filtered, setFiltered] = useState(products);
  const [active, setActive] = useState<ProductsWithCategory | null>(null);

  const categoriesWithAll = [
    { id: "all", name: "Все", _count: { products: products.length } },
    ...categories,
  ];

  const filterProducts = (categoryId: string) => {
    if (categoryId === "all") {
      setFiltered(products);
      return;
    }

    const filteredProducts = products.filter(
      (el) => el.category?.id === categoryId,
    );
    setFiltered(filteredProducts);
  };

  return (
    <section className="section pt-25!">
      <ProductFilter
        categories={categoriesWithAll}
        title="Категории"
        onClick={filterProducts}
      />

      <Modal
        title={active?.name ?? "Подробности"}
        opened={!!active}
        onClose={() => setActive(null)}
        size="lg"
      >
        {active && (
          <ProductCardModal
            product={{
              id: active.id,
              description: active.description,
              price: active.price,
            }}
          />
        )}
      </Modal>

      {products.length ? (
        <ul className="grid gap-4 mt-4 grid-cols-[minmax(14rem,20rem)] justify-center sm:place-items-stretch sm:grid-cols-[repeat(2,minmax(14rem,1fr))] md:grid-cols-[repeat(3,minmax(14rem,1fr))] lg:grid-cols-[repeat(4,minmax(14rem,1fr))] xl:grid-cols-[repeat(5,minmax(14rem,1fr))] ">
          {filtered.map((el) => (
            <ProductCard
              key={el.id}
              card={el}
              onClick={(card: ProductsWithCategory) => setActive(card)}
            />
          ))}
        </ul>
      ) : (
        <div className="w-full p-4 mt-4 rounded-xl gradient-bg border border-border/30">
          <p className="text-center text-dim-text text-xl">Пока ничего нет</p>
        </div>
      )}
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import type { ProductWithCategoryPublic } from "@/lib/actions/product/get-products";
import { Card, CardContent } from "@/ui/primitives/card";
import { Input } from "@/ui/primitives/input";
import { Section } from "@/ui/primitives/section";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/primitives/select";

type Props = {
  products: ProductWithCategoryPublic[];
  children: (products: ProductWithCategoryPublic[]) => React.ReactNode;
};

export default function ProductsFilter({ products, children }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | "all">("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category?.name) set.add(p.category.name);
    });
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const matchName = p.name.toLowerCase().includes(search.toLowerCase());

        const matchCategory =
          category === "all" || p.category?.name === category;

        return matchName && matchCategory;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, search, category]);

  return (
    <>
      <Section className="py-0">
        <Card>
          <CardContent className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Искать..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select onValueChange={(e) => setCategory(e)}>
              <SelectTrigger className="w-full md:max-w-62" size="sm">
                <SelectValue placeholder="Выбрать категорию" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectLabel>Категории</SelectLabel>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </Section>
      {children(filtered)}
    </>
  );
}

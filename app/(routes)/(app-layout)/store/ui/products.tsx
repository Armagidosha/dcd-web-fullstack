"use client";

import type { ProductWithCategoryPublic } from "@/lib/actions/product/get-products";
import { useModal } from "@/lib/utils/hooks/useModal";
import { Section } from "@/ui/primitives/section";
import ProductCard from "./product-card";
import ProductDialog from "./product-dialog";

type ProductsProps = {
  products: ProductWithCategoryPublic[];
};

export default function Products({ products }: ProductsProps) {
  const modal = useModal<ProductWithCategoryPublic, "purchase">();
  return (
    <>
      <ProductDialog
        product={modal.data}
        opened={modal.opened}
        onClose={modal.close}
      />

      <Section>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => modal.open(product, "purchase")}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

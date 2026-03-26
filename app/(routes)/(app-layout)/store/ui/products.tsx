"use client";

import type { ProductWithCategoryPublic } from "@/lib/actions/product/get-products";
import { useModal } from "@/lib/utils/hooks/useModal";
import { Card, CardContent } from "@/ui/primitives/card";
import { Section } from "@/ui/primitives/section";
import ProductCard from "./product-card";
import ProductDialog from "./product-dialog";
import ProductsFilter from "./products-filter";

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

      <ProductsFilter products={products}>
        {(filtered) => {
          return (
            <Section className="py-8 min-h-109">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => modal.open(product, "purchase")}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent>
                    <p className="font-semibold text-muted-foreground text-center">
                      Ничего не найдено •︵•
                    </p>
                  </CardContent>
                </Card>
              )}
            </Section>
          );
        }}
      </ProductsFilter>
    </>
  );
}

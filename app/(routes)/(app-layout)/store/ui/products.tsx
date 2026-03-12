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

      <div className="mt-13">
        {/* <Section>
          <Card>
            <CardContent className="flex flex-col lg:flex-row gap-4 justify-between">
              <FieldGroup className="min-w-75">
              <FieldLabel>Поиск</FieldLabel>
                <Input
                placeholder={
                    products[Math.floor(Math.random() * products.length)]?.name ||
                    "Warden"
                    }
                    />
              </FieldGroup>
              <div className="flex gap-1 flex-wrap lg:self-end lg:flex-nowrap">
              {categories.map((cat) => (
                <Button className="flex-1" variant="outline" key={cat.name}>
                    {cat.name}
                    </Button>
                ))}
              </div>
              </CardContent>
          </Card>
        </Section> */}

        <Section className="mt-0 py-4">
          <div className="grid grid-cols-5 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => modal.open(product, "purchase")}
              />
            ))}
          </div>
        </Section>
        {/* <Section> */}
        {/* <Products products={products} categories={categories} /> */}
        {/* {!!latest.length && <Latest latest={latest} />} */}
        {/* </Section> */}
      </div>
    </>
  );
}

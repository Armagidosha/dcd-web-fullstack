import { getProductsAction } from "@/lib/actions/product/get-products";
import { metaConfig } from "@/lib/utils/constants/meta";
import { Section } from "@/ui/primitives/section";

import Products from "./ui/products";

export const metadata = metaConfig.store;

export default async function StorePage() {
  const products = await getProductsAction();
  return (
    <div className="mt-13">
      <Products products={products} />
      <Section>
        {/* <Products products={products} categories={categories} /> */}
        {/* {!!latest.length && <Latest latest={latest} />} */}
      </Section>
    </div>
  );
}

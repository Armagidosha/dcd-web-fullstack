import { getLatestAction } from "@/lib/actions/payment/get-latest";
import { getProductsAction } from "@/lib/actions/product/get-products";
import { metaConfig } from "@/lib/utils/constants/meta";
import { Section, SectionTitle } from "@/ui/primitives/section";
import LatestCard from "./ui/latest-card";
import Products from "./ui/products";

export const metadata = metaConfig.store;

export default async function StorePage() {
  const products = await getProductsAction();
  const latest = await getLatestAction();
  return (
    <div className="mt-13">
      <Products products={products} />

      {latest.length > 0 && (
        <Section>
          <SectionTitle>Последние покупки</SectionTitle>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {latest.map((lat, idx) => (
              <LatestCard key={`${idx} ${lat.product}`} latest={lat} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

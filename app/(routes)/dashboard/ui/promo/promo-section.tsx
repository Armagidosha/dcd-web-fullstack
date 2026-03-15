import { getPromoActionPrivate } from "@/lib/actions/promo-code/get-promo";
import PromoCodeCard from "./promo-card";

export default async function PromoSection() {
  const promoCodes = await getPromoActionPrivate();

  return <PromoCodeCard promoCodes={promoCodes} />;
}

import type { LatestOrder } from "@/app/shared/utils/types/products";
import LatestCard from "../ui/LatestCard";

interface LatestProps {
  latest: LatestOrder[];
}

export default function Latest({ latest }: LatestProps) {
  return (
    <section className="section">
      <h2 className="section-heading">Последние покупки</h2>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {latest.map((el) => (
          <li key={`${el.purchasedAt}/${el.playerNick}`}>
            <LatestCard
              productName={el.productName}
              productImage={el.productImage}
              playerNick={el.playerNick}
              purchasedAt={el.purchasedAt}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

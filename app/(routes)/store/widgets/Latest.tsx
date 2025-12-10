import type { Latest as TLatest } from "@/lib/generated/prisma/client";
import LatestCard from "../ui/LatestCard";

interface LatestProps {
  latest: TLatest[];
}

export default function Latest({ latest }: LatestProps) {
  return (
    <section className="section">
      <h2 className="section-heading">Последние покупки</h2>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {latest.map((el) => (
          <li key={el.id}>
            <LatestCard
              createdAt={el.createdAt}
              image={el.image}
              nickname={el.nickname}
              productName={el.productName}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

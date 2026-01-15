"use client";

import Modal from "@shared/ui/Modal";
import { useState } from "react";
import Paper from "@/app/shared/ui/Paper";
import type { News as TNews } from "@/lib/generated/prisma/client";
import type { ActiveCard } from "../types/news";
import NewsModal from "../ui/modals/NewsModal";
import NewsCard from "../ui/NewsCard";

interface NewsProps {
  news: TNews[];
}

export default function News({ news }: NewsProps) {
  const [active, setActive] = useState<ActiveCard | null>(null);

  return (
    <section className="section">
      <Modal opened={!!active} onClose={() => setActive(null)}>
        {active && <NewsModal newsItem={active} />}
      </Modal>
      <h2 className="section-heading">Новости проекта</h2>

      {!!news.length && (
        <ul className="grid justify-center grid-cols-[18rem] sm:grid-cols-[repeat(2,18rem)] lg:grid-cols-[repeat(3,18rem)] xl:grid-cols-[repeat(4,19rem)] gap-4">
          {news?.map((el) => (
            <li key={el.id}>
              <NewsCard
                data={el}
                onClick={(card: ActiveCard) => setActive(card)}
              />
            </li>
          ))}
        </ul>
      )}

      {!news.length && (
        <Paper className="grid items-center h-56" withBorder withGradient>
          <p className="text-center opacity-15 text-2xl select-none">
            Новостей пока нет...
          </p>
        </Paper>
      )}
    </section>
  );
}

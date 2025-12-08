"use client";

import Image from "next/image";
import { useState } from "react";
import type { News as TNews } from "@/lib/generated/prisma/client";
import Modal from "../../ui/Modal/Modal";
import NewsCard from "../../ui/NewsCard/NewsCard";
import type { ActiveCard } from "../../utils/types/news";

interface NewsProps {
  news: TNews[];
}

export default function News({ news }: NewsProps) {
  const [active, setActive] = useState<ActiveCard | null>(null);
  const dateNow = new Date();

  return (
    <section className="section">
      <Modal
        title={active?.title}
        opened={!!active}
        onClose={() => setActive(null)}
      >
        {active && (
          <>
            {active.image && (
              <Image
                className="mx-auto max-h-96 w-auto"
                height={100}
                width={500}
                src={active.image}
                alt={active.title}
              />
            )}
            <div>{active.content}</div>
            <div className="flex justify-between mt-auto text-zinc-500">
              <span>{active.author}</span>
              <span>{active.formattedDate}</span>
            </div>
          </>
        )}
      </Modal>
      <h2 className="section-heading">Новости проекта</h2>

      {!!news.length && (
        <ul className="grid justify-center grid-cols-[18rem] sm:grid-cols-[repeat(2,18rem)] lg:grid-cols-[repeat(3,18rem)] xl:grid-cols-[repeat(4,19rem)] gap-4">
          {news?.map((el) => (
            <li key={el.title}>
              <NewsCard
                author={el.author}
                image={el.image}
                title={el.title}
                content={el.content}
                createdAt={el.createdAt}
                dateNow={dateNow}
                onClick={(card: ActiveCard) => setActive(card)}
              />
            </li>
          ))}
        </ul>
      )}

      {!news.length && (
        <div className="grid items-center bg-surface border border-border h-56 rounded-lg">
          <p className="text-center opacity-15 text-4xl select-none">
            Новостей пока нет...
          </p>
        </div>
      )}
    </section>
  );
}

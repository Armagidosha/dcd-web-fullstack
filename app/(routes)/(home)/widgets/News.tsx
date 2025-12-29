"use client";

import Modal from "@shared/ui/Modal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MarkdownRenderer from "@/app/shared/ui/MarkDownRenderer";
import type { News as TNews } from "@/lib/generated/prisma/client";
import type { ActiveCard } from "../types/news";
import NewsCard from "../ui/NewsCard";

interface NewsProps {
  news: TNews[];
}

export default function News({ news }: NewsProps) {
  const [active, setActive] = useState<ActiveCard | null>(null);

  return (
    <section className="section">
      <Modal opened={!!active} onClose={() => setActive(null)}>
        {active && (
          <>
            {active.image && (
              <Image
                className="mx-auto max-h-96 w-auto"
                height={100}
                width={500}
                src={active.image}
                alt="Картинка поста"
              />
            )}
            <MarkdownRenderer content={active.content} />
            <div className="flex text-sm justify-between mt-auto text-zinc-500">
              <div className="space-x-5">
                <span>{active.author}</span>
                <span className="hidden md:inline">{active.formattedDate}</span>
              </div>
              {active.postLink && (
                <Link target="_blank" href={active.postLink}>
                  К посту
                </Link>
              )}
            </div>
          </>
        )}
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
        <div className="grid items-center bg-surface border border-border h-56 rounded-lg">
          <p className="text-center opacity-15 text-4xl select-none">
            Новостей пока нет...
          </p>
        </div>
      )}
    </section>
  );
}

"use client";

import Modal from "@shared/ui/Modal";
import Paper from "@/app/shared/ui/Paper";
import type { TNews } from "@/lib/actions/news/get-news";
import { useModal } from "@/lib/hooks/useModal";
import NewsModal from "../ui/modals/NewsModal";
import NewsCard from "../ui/NewsCard";

interface NewsProps {
  news: TNews[];
}

export default function News({ news }: NewsProps) {
  const modal = useModal<TNews>();

  return (
    <section className="section">
      <Modal opened={modal.opened} onClose={modal.close}>
        {modal.data && <NewsModal newsItem={modal.data} />}
      </Modal>
      <h2 className="section-heading">Новости проекта</h2>

      {!!news.length && (
        <ul className="grid justify-center grid-cols-[18rem] sm:grid-cols-[repeat(2,18rem)] lg:grid-cols-[repeat(3,18rem)] xl:grid-cols-[repeat(4,19rem)] gap-4">
          {news?.map((n) => (
            <li key={n.createdAt.toString()}>
              <NewsCard newsItem={n} onClick={modal.open} />
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

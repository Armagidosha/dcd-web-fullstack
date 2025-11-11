import type { News as TNews } from "@/lib/generated/prisma/client";
import NewsCard from "../../ui/NewsCard/NewsCard";

interface NewsProps {
  news: TNews[];
}

export default function News({ news }: NewsProps) {
  const dateNow = new Date();
  return (
    <section className="section">
      <h2 className="section-heading">Новости проекта</h2>

      {!!news.length && (
        <ul className="grid justify-center grid-cols-[18rem] sm:grid-cols-[repeat(2,18rem)] lg:grid-cols-[repeat(3,18rem)] xl:grid-cols-[repeat(4,19rem)] gap-4">
          {news?.map((el) => (
            <li key={el.title}>
              <NewsCard
                image={el.image}
                title={el.title}
                content={el.content}
                publishedAt={el.publishedAt}
                dateNow={dateNow}
              />
            </li>
          ))}
        </ul>
      )}

      {!news.length && (
        <div className="grid items-center bg-surface ring-1 ring-zinc-700 h-56 rounded-lg">
          <p className="text-center opacity-15 text-4xl select-none">
            Новостей пока нет...
          </p>
        </div>
      )}
    </section>
  );
}

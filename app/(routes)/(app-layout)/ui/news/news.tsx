"use client";

import type { NewsPost } from "@/lib/actions/news/get-news";
import { useModal } from "@/lib/utils/hooks/useModal";
import { Card, CardContent } from "@/ui/primitives/card";
import { Section, SectionTitle } from "@/ui/primitives/section";
import NewsCard from "./news-card";
import NewsDialog from "./news-dialog";

interface NewsProps {
  news: NewsPost[];
}

export default function News({ news }: NewsProps) {
  const modal = useModal<NewsPost, "view">();

  return (
    <>
      <NewsDialog
        newsPost={modal.data}
        opened={modal.opened}
        onClose={modal.close}
      />
      <Section>
        <SectionTitle>Новости проекта</SectionTitle>

        {!!news.length && (
          <ul className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-3">
            {news?.map((post) => (
              <li key={post.id}>
                <NewsCard
                  newsPost={post}
                  onClick={() => modal.open(post, "view")}
                />
              </li>
            ))}
          </ul>
        )}

        {!news.length && (
          <Card className="h-100 w-full">
            <CardContent className="h-full grid place-items-center">
              <span className="text-muted-foreground/50 text-3xl font-semibold">
                Новостей пока нет
              </span>
            </CardContent>
          </Card>
        )}
      </Section>
    </>
  );
}

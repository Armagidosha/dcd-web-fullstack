import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import MarkdownRenderer from "@/app/shared/ui/MarkDownRenderer";
import Paper from "@/app/shared/ui/Paper";
import type { TNews } from "@/lib/actions/news/get-news";

interface NewsModalProps {
  newsItem: TNews;
}

export default function NewsModal({ newsItem }: NewsModalProps) {
  const formattedDate = formatDistance(newsItem.createdAt, new Date(), {
    locale: ru,
    addSuffix: true,
  });
  return (
    <Paper
      className="p-4 min-h-100 flex flex-col"
      variant="secondary"
      withBorder
      withGradient
    >
      {newsItem.image && (
        <Image
          className="mx-auto max-h-96 w-auto"
          height={100}
          width={500}
          src={newsItem.image}
          alt="Картинка поста"
        />
      )}
      <MarkdownRenderer content={newsItem.content} />
      <div className="flex text-sm justify-between mt-auto text-dim-text">
        <div className="space-x-5">
          <span>{newsItem.author}</span>
          <span className="hidden md:inline">{formattedDate}</span>
        </div>
        {newsItem.postLink && (
          <Link
            className="hover:text-light-text transition-colors duration-300"
            target="_blank"
            href={newsItem.postLink}
          >
            К посту
          </Link>
        )}
      </div>
    </Paper>
  );
}

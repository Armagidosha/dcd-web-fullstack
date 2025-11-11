import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";
import type { News } from "@/lib/generated/prisma/client";

type NewsCardProps = Omit<News, "id" | "author" | "updatedAt"> & {
  dateNow: Date;
};

export default function NewsCard(news: NewsCardProps) {
  const { image, title, content, publishedAt, dateNow } = news;
  return (
    <div className="flex flex-col gap-2 h-100 w-full rounded-lg p-4 ring-1 ring-zinc-600 transition bg-surface/90 hover:ring-2 hover:bg-surface hover:scale-103 cursor-pointer">
      {image && (
        <Image
          className="object-cover h-full w-full max-h-52 bg-zinc-700/20 rounded-md"
          height={100}
          width={450}
          src={image}
          alt={title}
        />
      )}
      <h3 className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </h3>
      <div className="overflow-hidden line-clamp-4">{content}</div>
      <p className="mt-auto text-zinc-500 text-sm">
        {formatDistance(publishedAt ?? dateNow, dateNow, {
          locale: ru,
          addSuffix: true,
        })}
      </p>
    </div>
  );
}

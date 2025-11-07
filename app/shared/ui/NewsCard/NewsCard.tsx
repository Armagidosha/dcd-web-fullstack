import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";

interface NewsCardProps {
  image?: string;
  title: string;
  text: string;
  publishDate: string;
  dateNow: Date;
}

export default function NewsCard(news: NewsCardProps) {
  const { image, title, text, publishDate, dateNow } = news;
  return (
    <div className="flex flex-col gap-2 h-112 w-full rounded-lg p-4 ring-1 ring-zinc-600 transition bg-surface/90 hover:ring-2 hover:bg-surface hover:scale-103">
      {image && (
        <Image
          className="object-cover h-full w-full max-h-52 bg-surface rounded-lg"
          height={100}
          width={450}
          src={image}
          alt={title}
        />
      )}
      <h3 className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </h3>
      <div className="overflow-hidden line-clamp-6">{text}</div>
      <p className="mt-auto text-zinc-500 text-sm">
        {formatDistance(publishDate ?? dateNow, dateNow, {
          locale: ru,
          addSuffix: true,
        })}
      </p>
    </div>
  );
}

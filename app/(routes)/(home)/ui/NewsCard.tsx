import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";
import type { News } from "@/lib/generated/prisma/client";
import type { ActiveCard } from "../types/news";

type NewsCardProps = Omit<News, "id" | "updatedAt"> & {
  dateNow: Date;
  onClick: (card: ActiveCard) => void;
};

export default function NewsCard(props: NewsCardProps) {
  const { image, title, author, content, createdAt, dateNow, onClick } = props;
  const formattedDate = createdAt
    ? formatDistance(createdAt, dateNow, {
        locale: ru,
        addSuffix: true,
      })
    : "дата неизвестна";

  return (
    <button
      type="button"
      className="flex flex-col text-left gap-2 h-100 w-full gradient-bg rounded-lg 
        p-4 border border-border/40 transition-all duration-300 bg-surface/90 
        hover:border-border/80 hover:bg-surface hover:scale-103 cursor-pointer"
      onClick={() => onClick({ image, author, title, content, formattedDate })}
    >
      {image && (
        <Image
          className="object-cover h-full w-full max-h-52 bg-surface-variant/30 border border-border/20 rounded-md"
          width={450}
          height={100}
          src={image}
          alt={title}
        />
      )}
      <h3 className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </h3>
      <div className="overflow-hidden line-clamp-4">{content}</div>
      <p className="mt-auto text-dim-text text-sm">{formattedDate}</p>
    </button>
  );
}

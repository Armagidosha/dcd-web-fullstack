import clsx from "clsx";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";
import type { News } from "@/lib/generated/prisma/client";
import type { ActiveCard } from "../types/news";

interface NewsCardProps {
  data: News;
  onClick: (card: ActiveCard) => void;
}

export default function NewsCard({ data, onClick }: NewsCardProps) {
  const { image, author, content, createdAt, postLink } = data;
  const formattedDate = createdAt
    ? formatDistance(createdAt, new Date(), {
        locale: ru,
        addSuffix: true,
      })
    : "дата неизвестна";

  const handleClick = () => {
    onClick({ image, author, content, postLink, formattedDate });
  };

  return (
    <button
      type="button"
      className="flex flex-col text-left gap-2 h-100 w-full gradient-bg rounded-lg 
        p-4 border border-border/40 transition-all duration-300 bg-surface/90 
        hover:border-border/80 hover:bg-surface hover:scale-103 cursor-pointer"
      onClick={() => handleClick()}
    >
      {image && (
        <Image
          className="object-cover h-full w-full max-h-52 bg-surface-variant/30 border border-border/20 rounded-md"
          width={450}
          height={100}
          src={image}
          alt="Картинка поста"
        />
      )}
      <div
        className={clsx(
          "overflow-hidden",
          image ? "line-clamp-4" : "line-clamp-14",
        )}
      >
        {content}
      </div>
      <p className="mt-auto text-dim-text text-sm">{formattedDate}</p>
    </button>
  );
}

import clsx from "clsx";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";
import { memo } from "react";
import st from "./NewsCard.module.scss";

interface NewsCardProps {
  image?: string;
  title: string;
  text: string;
  publishDate: string;
}

const dateNow = new Date();

const NewsCard = memo((props: NewsCardProps) => {
  return (
    <div className={st.card}>
      {props.image && (
        <Image
          className={st.image}
          height={100}
          width={450}
          src={props.image}
          alt={props.title}
        />
      )}
      <h3 className={clsx(st.title, "text-sm text-overflow")}>{props.title}</h3>
      <div className={clsx(st.text, "text-sm")}>{props.text}</div>
      <p className={clsx(st.date, "text-sm text-dimmed")}>
        {formatDistance(props.publishDate ?? dateNow, dateNow, {
          locale: ru,
          addSuffix: true,
        })}
      </p>
    </div>
  );
});

export default NewsCard;

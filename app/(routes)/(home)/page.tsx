import { getNews } from "@/lib/actions/news/get-news";
import Feedback from "./widgets/Feedback";
import Hero from "./widgets/Hero";
import Mechanics from "./widgets/Mechanics";
import News from "./widgets/News";

export default async function HomePage() {
  const news = await getNews({ limit: 8 });
  return (
    <>
      <Hero />

      {/* Блок Новости проекта */}
      <News news={news} />

      {/* Особенности проекта */}
      <Mechanics />

      {/* Тех. поддержка, Жалобы */}
      <Feedback />
    </>
  );
}

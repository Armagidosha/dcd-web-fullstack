import { getNews } from "./actions/news";
import Feedback from "./widgets/Feedback";
import Hero from "./widgets/Hero";
import Mechanics from "./widgets/Mechanics";
import News from "./widgets/News";

export default async function HomePage() {
  const news = await getNews();
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

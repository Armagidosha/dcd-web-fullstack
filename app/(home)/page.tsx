import { getNews } from "../lib/actions/news";
import CommCard from "../shared/widgets/Feedback/Feedback";
import Hero from "../shared/widgets/Hero/Hero";
import Mechanics from "../shared/widgets/Mechanics/Mechanics";
import News from "../shared/widgets/News/News";

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
      <CommCard />
    </>
  );
}

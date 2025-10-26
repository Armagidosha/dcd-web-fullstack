import clsx from "clsx";
import Image from "next/image";
import Chevron from "../shared/ui/Chevron/Chevron";
import Section from "../shared/ui/Section/Section";
import CommCard from "../widgets/CommCard/CommCard";
import Mechanics from "../widgets/Mechanics/mechanics";
import NewsCard from "../widgets/NewsCard/NewsCard";
import st from "./page.module.scss";

const mockNewsData = [
  {
    title: "Первый фон, переживший рестарт",
    image: "/background.jpg",
    text: "Этот фон остался после случайного удаления всего каталога, и с тех пор его не трогают.",
    publishDate: "2004-02-10T09:30:00Z",
  },
  {
    title: "Фон, который никто не осмелился сменить",
    image: "/background.jpg",
    text: "После его установки трафик вырос в два раза — совпадение или нет, никто не проверял. После его установки трафик вырос в два раза — совпадение или нет, никто не проверял. После его установки трафик вырос в два раза — совпадение или нет, никто не проверял.",
    publishDate: "2006-07-21T18:45:00Z",
  },
  {
    title: "Тот самый закат с FTP",
    image: "/background.jpg",
    text: "Фото сделали на старый телефон, но все решили, что менять его — святотатство.",
    publishDate: "2003-11-12T22:15:00Z",
  },
  {
    title: "Минимализм 2008 года",
    image: "/background.jpg",
    text: "Белый фон, серый градиент, ноль лишнего. Тогда это считалось вершиной вкуса.",
    publishDate: "2008-01-05T12:00:00Z",
  },
];

const HomePage = () => {
  return (
    <>
      <Section fullH>
        <div className={clsx(st.hero)}>
          <div>
            <h1 className={"text-2xl"}>DraimCiDo</h1>
            <p className={clsx(st.hero__text, "text-lg")}>
              Вступайте в наше дружественное игровое комьюнити, познавайте новые
              просторы игры и наслаждайтесь игрой вместе с другими игроками.
            </p>
          </div>
          <Image
            className={st.hero__image}
            width={375}
            height={450}
            priority
            src="/images/greeting.png"
            alt="Приветствие"
          />
        </div>
        <Chevron extraClass={st.hero__chevron} size={24} hideOnScroll />
      </Section>

      {/* Блок Новости проекта */}
      <Section title="Новости">
        <ul className={clsx(st.news)}>
          {mockNewsData.map((el) => (
            <li key={el.title}>
              <NewsCard {...el} />{" "}
            </li>
          ))}
        </ul>
      </Section>

      {/* Особенности проекта */}
      <Section title="Механики проекта">
        <Mechanics />
      </Section>

      {/* Тех. поддержка, Жалобы */}
      <Section>
        <CommCard />
      </Section>
    </>
  );
};

export default HomePage;

import CommCard from "../shared/widgets/Feedback/Feedback";
import Hero from "../shared/widgets/Hero/Hero";
import Mechanics from "../shared/widgets/Mechanics/mechanics";
import News from "../shared/widgets/News/News";

// TODO: Убрать моковые данные
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
      <Hero />

      {/* Блок Новости проекта */}
      <News news={mockNewsData} />

      {/* Особенности проекта */}
      <Mechanics />

      {/* Тех. поддержка, Жалобы */}
      <CommCard />
    </>
  );
};

export default HomePage;

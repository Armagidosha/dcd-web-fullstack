import NewsCard from "../../ui/NewsCard/NewsCard";

interface NewsProps {
  // Добавить типы
  news: {
    title: string;
    image?: string;
    text: string;
    publishDate: string;
  }[];
}

const dateNow = new Date();

export default function News(props: NewsProps) {
  return (
    <section className="section">
      <h2 className="section-heading">Новости проекта</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4">
        {props.news.map((el) => (
          <li key={el.title}>
            <NewsCard {...el} dateNow={dateNow} />{" "}
          </li>
        ))}
      </ul>
    </section>
  );
}

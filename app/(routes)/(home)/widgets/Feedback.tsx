import FeedbackCard from "../ui/FeedbackCard";

const CARDS = [
  {
    title: "Жалобы и апелляции",
    imagePath: "/images/ban-cut.png",
    description: "Подать жалобу или апелляцию можно в нашем Discord-сервере ",
    linkHref: "https://discord.gg/v3r9MscDaq",
    link: "канал",
  },
  {
    title: "Поддержка",
    imagePath: "/images/support-cut.png",
    description: "Обратиться в техподдержку или сообщить об ошибке можно тут ",
    linkHref: "https://discord.gg/v3r9MscDaq",
    link: "тык",
  },
];

export default function Feedback() {
  return (
    <section className="section">
      <h2 className="section-heading">Обратная связь</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {CARDS.map((card) => (
          <FeedbackCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

import {
  BrushCleaning,
  ChartNoAxesColumn,
  Scale,
  SwatchBook,
} from "lucide-react";
import { Suspense } from "react";
import { Section, SectionTitle } from "@/ui/primitives/section";
import FeedbackCard from "./ui/feedback-card";
import Hero from "./ui/hero";
import MechanicsCard from "./ui/mechanics-card";
import NewsSection from "./ui/news/news-section";
import NewsSkeleton from "./ui/news/news-skeleton";

const FEEDBACK = [
  {
    title: "Жалобы и апелляции",
    imagePath: "/images/ban-cut.png",
    description: "Отправить жалобу или подать апелляцию можно  ",
    linkHref: "https://discord.gg/TBeK3nE",
    linkTitle: "здесь",
  },
  {
    title: "Поддержка",
    imagePath: "/images/support-cut.png",
    description: "Техническая поддержка и сообщения об ошибках доступны ",
    linkHref: "https://discord.gg/TBeK3nE",
    linkTitle: "здесь",
  },
];

const MECHANICS = [
  {
    Icon: ChartNoAxesColumn,
    title: "Системы прогрессии",
    description:
      "На проекте реализована продуманная система прогрессии, которая делает развитие персонажа интересным на каждом этапе. Вы открываете новые возможности, прокачиваете профессии и навыки, постепенно погружаясь в уникальные механики сервера.",
  },
  {
    Icon: BrushCleaning,
    title: "Кастомные текстуры",
    description:
      "Мы уделили большое внимание визуалу: на сервере вас ждут уникальные текстуры, кастомные предметы и детально проработанное окружение. Это не просто украшает игру, а создает атмосферу исследования и делает привычный Minecraft более живым и стильным.",
  },
  {
    Icon: Scale,
    title: "Сбалансированный донат",
    description:
      "Донат-система построена с упором на честность и баланс. Мы отказались от решений, которые дают серьезное преимущество за деньги. Донат лишь дополняет игровой процесс, сохраняя здоровую конкуренцию и уважение к времени каждого игрока.",
  },
  {
    Icon: SwatchBook,
    title: "Красивое оформление",
    description:
      "Проект создается с вниманием к визуальному стилю и атмосфере. Современные решения, аккуратные интерфейсы и продуманное оформление объединяются в цельный мир, в котором приятно играть и проводить время.",
  },
];

export default async function HomePage() {
  return (
    <>
      <Hero />

      <Suspense fallback={<NewsSkeleton />}>
        <NewsSection />
      </Suspense>

      <Section>
        <SectionTitle>Механики</SectionTitle>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MECHANICS.map((card) => (
            <li key={card.title}>
              <MechanicsCard card={card} />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionTitle>Поддержка</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {FEEDBACK.map((card) => (
            <FeedbackCard key={card.title} card={card} />
          ))}
        </div>
      </Section>
    </>
  );
}

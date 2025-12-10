import {
  BrushIcon,
  ChartIcon,
  PaletteIcon,
  ScaleIcon,
} from "@shared/icons/icons";
import MechanicsCard from "../ui/MechanicsCard";

const ITEMS = [
  {
    icon: <ChartIcon width={30} height={30} className="text-primary" />,
    title: "Системы прогрессии",
    description:
      "Мы внедрили продуманную систему прогрессии — от профессий до навыков, чтобы вы могли постепенно погружаться в проект и лучше понимать его механику.",
  },
  {
    icon: <BrushIcon width={30} height={30} className="text-primary" />,
    title: "Кастомные текстуры",
    description:
      "Проект с уникальными текстурами и множеством кастомных предметов делает игровой мир атмосферным и увлекательным для исследования.",
  },
  {
    icon: <ScaleIcon width={30} height={30} className="text-primary" />,
    title: "Сбалансированный донат",
    description:
      "Мы переработали систему доната так, чтобы каждый игрок имел доступ к полезным возможностям, не нарушая баланс и комфорт игры.",
  },
  {
    icon: <PaletteIcon width={30} height={30} className="text-primary" />,
    title: "Красивое оформление",
    description:
      "Проект создан на актуальной версии Minecraft с современными механиками, объединяющими удобство, стабильность и атмосферу живого мира.",
  },
];

export default function Mechanics() {
  return (
    <section className="section">
      <h2 className="section-heading">Механики</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 place-items-start">
        {ITEMS.map((el) => (
          <li key={el.title}>
            <MechanicsCard
              title={el.title}
              icon={el.icon}
              description={el.description}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

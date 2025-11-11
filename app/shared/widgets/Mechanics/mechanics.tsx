import MechanicsCard from "../../ui/MechanicsCard/MechanicsCard";

const ITEMS = [
  {
    iconPath: "/icons/chart-column.svg",
    title: "Системы прогрессии",
    description:
      "Мы внедрили продуманную систему прогрессии — от профессий до навыков, чтобы вы могли постепенно погружаться в проект и лучше понимать его механику.",
  },
  {
    iconPath: "/icons/paintbrush.svg",
    title: "Кастомные текстуры",
    description:
      "Проект с уникальными текстурами и множеством кастомных предметов делает игровой мир атмосферным и увлекательным для исследования.",
  },
  {
    iconPath: "/icons/scale.svg",
    title: "Сбалансированный донат",
    description:
      "Мы переработали систему доната так, чтобы каждый игрок имел доступ к полезным возможностям, не нарушая баланс и комфорт игры.",
  },
  {
    iconPath: "/icons/palette.svg",
    title: "Красивое оформление",
    description:
      "Проект создан на актуальной версии Minecraft с современными механиками, объединяющими удобство, стабильность и атмосферу живого мира.",
  },
];

const Mechanics = () => {
  return (
    <section className="section">
      <h2 className="section-heading">Механики</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 place-items-start">
        {ITEMS.map((el) => (
          <li key={el.title}>
            <MechanicsCard
              title={el.title}
              iconPath={el.iconPath}
              description={el.description}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Mechanics;

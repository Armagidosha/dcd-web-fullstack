import MechanicsCard from "../../ui/MechanicsCard/MechanicsCard";

const ITEMS = [
  {
    iconPath: "/icons/paintbrush.svg",
    title: "Кастомные текстуры",
    description:
      "Проект оснащен уникальными текстурами, которые загружаются сразу же при входе не сервер, мы не только изменили все меню, но и добавили множество уникальных предметов.",
  },
  {
    iconPath: "/icons/chart-column.svg",
    title: "Системы прогрессии",
    description:
      "Мы смогли реализовать прогрессию везде от работ до скиллов, тем самым вы сможете узнавать все механики проекта намного лучше, так как вы будете изучать постепенно.",
  },
  {
    iconPath: "/icons/scale.svg",
    title: "Сбалансированный донат",
    description:
      "Мы постарались воссоздать донат-услуги таким образом, чтобы простые игроки не были вовсе без прав, таким образом мы предоставляем каждому тот функционал, которого возможно достичь.",
  },
  {
    iconPath: "/icons/palette.svg",
    title: "Красивое оформление",
    description:
      "Проект полностью реализован на новом функционале Minecraft - HEX-коды, тем самым мы смогли предоставить вам приятное для глаз оформление, тем самым реализуя уютную атмосферу на проекте.",
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

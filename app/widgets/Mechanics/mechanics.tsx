import Image from "next/image";
import st from "./mechanics.module.scss";

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
    <ul className={`${st.mechanics} container`}>
      {ITEMS.map((el) => (
        <li className={st.mechanics__item} key={el.title}>
          <Image width={30} height={30} src={el.iconPath} alt={el.title} />
          <h3 className={`${st.mechanics__title} text-md`}>{el.title}</h3>
          <p className={`${st.mechanics__description} text-sm`}>
            {el.description}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Mechanics;

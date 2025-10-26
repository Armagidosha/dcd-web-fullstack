import clsx from "clsx";
import Image from "next/image";
import Section from "@/app/shared/ui/Section/Section";
import st from "./page.module.scss";

interface DonateCardProps {
  name: string;
  image: string;
  category: string;
}

const DonateCard = (props: DonateCardProps) => {
  return (
    <li className={st.card}>
      <Image
        className={st.image}
        width={200}
        height={200}
        src={props.image}
        alt={props.name}
      />
      <div className={st.container}>
        <span className={clsx(st.badge, "text-sm")}>{props.category}</span>
        <h3 className={clsx(st.name, "text-md")}>{props.name}</h3>
        <span className={"text-lg"}>1999 P</span>
      </div>
    </li>
  );
};

const DonatePage = () => {
  return (
    <Section title="Донат-услуги" axis="row">
      <div className={st.filter}></div>
      <ul className={st.list}>
        <DonateCard
          name="Warden"
          image="/images/greeting.png"
          category={"Другое"}
        />
        <DonateCard
          name="Warden"
          image="/images/ban.png"
          category={"Привилегии"}
        />
        <DonateCard
          name="Warden"
          image="/images/support.png"
          category={"Другое"}
        />
        <DonateCard name="Warden" image="/images/ban.png" category={"Ключи"} />
        <DonateCard
          name="Warden"
          image="/images/greeting.png"
          category={"Другое"}
        />
      </ul>
    </Section>
  );
};

export default DonatePage;

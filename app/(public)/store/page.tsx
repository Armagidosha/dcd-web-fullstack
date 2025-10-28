"use server";

import clsx from "clsx";
import Image from "next/image";
import LoginButton from "@/app/shared/ui/LoginButton/LoginButton";
import Section from "@/app/shared/ui/Section/Section";
import prisma from "@/lib/prisma";
import st from "./page.module.scss";

interface DonateCardProps {
  name: string;
  image: string;
  price: number;
  category: string;
}

const DonateCard = ({ category, name, price, image }: DonateCardProps) => {
  return (
    <li className={st.card}>
      <Image
        className={st.image}
        width={200}
        height={200}
        src={image}
        alt={name}
        priority
      />
      <div className={st.container}>
        <span className={clsx(st.badge, "text-sm")}>{category}</span>
        <h3 className={clsx(st.name, "text-md")}>{name}</h3>
        <span className={"text-lg"}>{price}</span>
      </div>
    </li>
  );
};

const DonatePage = async () => {
  const products = await prisma.product.findMany();
  return (
    <Section title="Донат-услуги" axis="row">
      <div className={st.filter}>
        <LoginButton />
      </div>
      <ul className={st.list}>
        {products.map((el) => (
          <DonateCard
            key={el.id}
            category={el.category}
            name={el.name}
            price={el.price}
            image={el.image}
          />
        ))}
      </ul>
    </Section>
  );
};

export default DonatePage;

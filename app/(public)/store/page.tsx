"use server";

import clsx from "clsx";
import Image from "next/image";
import Filter from "@/app/shared/ui/Filter/Filter";
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

const mock = ["Привилегии", "Ключи", "Другое"];

const DonatePage = async () => {
  const products = await prisma.product.findMany();
  return (
    <Section title="Донат-услуги">
      <Filter
        items={mock}
        // onSelect={(category: string) => console.log(category)} Он тут должен быть, но не могу вызвать
      />
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

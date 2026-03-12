import { PrismaPg } from "@prisma/adapter-pg";
import {
  type Category,
  type News,
  type Policy,
  PrismaClient,
  type Product,
  type Rule,
} from "@/lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

type OmitDefault<
  T,
  k extends keyof Omit<T, "id" | "createdAt" | "updatedAt"> = never,
> = Omit<T, "id" | "createdAt" | "updatedAt" | k>;

const news: OmitDefault<News>[] = [
  { author: "arma", content: "", image: "", postLink: "" },
  { author: "arma", content: "", image: "", postLink: "" },
  { author: "arma", content: "", image: "", postLink: "" },
  { author: "arma", content: "", image: "", postLink: "" },
];

const products: OmitDefault<
  Product & { category: OmitDefault<Category> },
  "categoryId"
>[] = [
  {
    name: "Горсть квинтов",
    description: "Описание #1",
    key: "coins:150",
    price: 150,
    image: "/images/fallback.png",
    category: { name: "Квинты" },
  },
  {
    name: "Кошель квинтов",
    description: "Описание #2",
    key: "coins:300",
    price: 300,
    image: "/images/fallback.png",
    category: { name: "Квинты" },
  },
  {
    name: "Дюжина квинтов",
    description: "Описание #3",
    key: "coins:450",
    price: 450,
    image: "/images/fallback.ong",
    category: { name: "Квинты" },
  },
];

const rules: OmitDefault<Rule>[] = [
  {
    title: "Основные",
    content: "Основные правила, тут пока ничего нет.",
    order: 1,
  },
  {
    title: "Правила игры",
    content: "Правила игры, тут пока ничего нет.",
    order: 2,
  },
];

const policies: OmitDefault<Policy>[] = [
  {
    type: "PRIVACY" as const,
    title: "Политика конфиденциальности",
    content: "Политика конфиденциальности, тут пока ничего нет.",
  },
  {
    type: "TERMS" as const,
    title: "Пользовательское соглашение",
    content: "Пользовательское соглашение, тут пока ничего нет.",
  },
];

async function main() {
  for (const el of news) {
    await prisma.news.create({ data: el });
  }

  for (const el of rules) {
    await prisma.rule.create({ data: el });
  }

  for (const el of policies) {
    await prisma.policy.upsert({
      where: { type: el.type },
      update: {},
      create: {
        type: el.type,
        title: el.title,
        content: "Пока нет данных",
      },
    });
  }

  for (const el of products) {
    await prisma.product.create({
      data: {
        description: el.description,
        image: el.image,
        key: el.key,
        name: el.name,
        price: el.price,
        category: {
          connectOrCreate: {
            create: {
              name: el.category.name,
            },
            where: { name: el.category.name },
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

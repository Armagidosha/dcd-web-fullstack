"use server";

import LoginButton from "@/app/shared/ui/LoginButton/LoginButton";

import Products from "@/app/shared/widgets/Products/Products";

// TODO: Убрать моковые данные
const mock = ["Привилегии", "Ключи", "Другое"];
// TODO: Убрать моковые данные
const mockProductData = [
  {
    id: "uniq1",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq2",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq3",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq4",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq5",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq6",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq7",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq8",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq9",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq10",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq11",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
  {
    id: "uniq12",
    name: "Пенис оленя",
    price: 220,
    category: mock[0],
    image: "/images/greeting.png",
  },
];

const DonatePage = async () => {
  return (
    <section className="section flex flex-col">
      <LoginButton />
      <Products products={mockProductData} />
    </section>
  );
};

export default DonatePage;

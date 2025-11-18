import Link from "next/link";
import type { Product } from "@/lib/generated/prisma/client";
import MarkdownRenderer from "../MarkDownRenderer";

type ProductCardModalProps = Pick<Product, "price" | "description">;

export default function ProductCardModal({
  description,
  price,
}: ProductCardModalProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Описание: </h3>
        <MarkdownRenderer content={description} />
      </div>
      <form autoComplete="off" className="w-full flex flex-col gap-4">
        <div className="flex flex-col bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold">Данные игрока</h3>
          <label className="mt-3" htmlFor="email">
            Почта
          </label>
          <input
            className="text-sm bg-gray-500 py-2 pl-8 mt-1 rounded-lg ring-1 outline-0 focus-visible:ring-2"
            placeholder="Введите email (для чека)"
            type="email"
            name="email"
            id="email"
            required
          ></input>
          <label className="mt-3" htmlFor="nickname">
            Игровой никнейм
          </label>
          <input
            className="text-sm bg-gray-500 py-2 pl-8 mt-1 rounded-lg ring-1 outline-0 focus-visible:ring-2"
            placeholder="Никнейм на сервере"
            name="nickname"
            id="nickname"
            required
          ></input>
          <label className="mt-3" htmlFor="promo">
            Промокод
          </label>
          <input
            className="text-sm bg-gray-500 py-2 pl-8 mt-1 rounded-lg ring-1 outline-0 focus-visible:ring-2"
            placeholder="Промокод (не обязательно)"
            name="promo"
            id="promo"
          ></input>
          <div className="mt-3 flex gap-2 items-start">
            <input
              className="peer relative appearance-none shrink-0 w-4 h-4 border-2 border-blue-200 rounded-sm mt-1 bg-white focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-blue-100 checked:bg-primary checked:border-0 disabled:border-steel-400 disabled:bg-steel-400"
              type="checkbox"
              name="terms"
              id="terms"
              required
            />
            <svg
              className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Галочка</title>
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div>
              <label className="select-none cursor-pointer" htmlFor="terms">
                Я ознакомился и принимаю{" "}
                <Link
                  className="text-primary underline"
                  href="/privacy"
                  target="_blank"
                >
                  Политику конфиденциальности
                </Link>{" "}
                и{" "}
                <Link
                  className="text-primary underline"
                  href="/terms"
                  target="_blank"
                >
                  Пользовательское соглашение
                </Link>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold">Способы оплаты</h3>
          {/* Способы оплаты тут */}
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold">Информация по заказу</h3>
          <div className="flex justify-between mt-3">
            <p>Цена: </p>
            <span className=" font-semibold">{price} &#x20BD;</span>
          </div>
          <p>
            Скидка: <span>"тут должна быть логика скидки"</span>
          </p>
          <button
            disabled
            className="w-full mt-3 p-2 bg-primary disabled:opacity-60 rounded-md cursor-pointer disabled:cursor-not-allowed font-semibold"
            type="submit"
          >
            Оформить заказ
          </button>
        </div>
      </form>
    </div>
  );
}

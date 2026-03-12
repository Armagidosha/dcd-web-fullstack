import Link from "next/link";
import Logo from "./logo";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="bg-background/80 max-w-330 mx-auto w-full backdrop-blur-sm 
        border-t border-l border-r border-border mt-24 py-4 px-4 z-40 rounded-t-lg"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        {/* Юр инфо */}
        <div>
          <Logo />
          <address className="grid gap-1 mt-2 pl-1 not-italic">
            <p>ИНН: 772879961873</p>
            <p>
              Почта:{" "}
              <a className="link" href="mailto:draimcido@gmail.com">
                draimcido@gmail.com
              </a>
            </p>
          </address>
        </div>

        {/* Политика */}
        <div>
          <h3 className="font-semibold">Документы</h3>
          <ul className="grid gap-1 mt-2">
            <li>
              <Link
                className="hover:opacity-70 transition-opacity duration-300"
                href={"/privacy"}
              >
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link
                className="hover:opacity-70 transition-opacity duration-300"
                href={"/terms"}
              >
                Пользовательское соглашение
              </Link>
            </li>
          </ul>
        </div>

        {/* Соц линки */}
        <div>
          <h3 className="font-semibold">Связь с нами</h3>
          <ul className="grid gap-1 mt-2">
            <li>
              <Link
                className="hover:opacity-70 transition-opacity duration-300"
                href={"https://discord.gg/TBeK3nE"}
              >
                Discord
              </Link>
            </li>
            <li>
              <Link
                className="hover:opacity-70 transition-opacity duration-300"
                href={"https://t.me/draimcido_network"}
              >
                Telegram
              </Link>
            </li>
          </ul>
        </div>

        {/* Навигация по странице */}
        <nav>
          <h3 className="font-semibold">Навигация</h3>
          <ul className="grid gap-1 mt-2">
            <li>
              <Link
                className="hover:opacity-70 transition-opacity duration-300"
                href={"/"}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                className="hover:opacity-70 transition-opacity duration-300"
                href={"/store"}
              >
                Донат-услуги
              </Link>
            </li>
            <li>
              <Link
                className="hover:opacity-70 transition-opacity duration-300"
                href={"/rules"}
              >
                Правила
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <p className="mt-4 text-dim-text">
        &copy; DraimCiDo {currentYear} Все&nbsp;права&nbsp;защищены.
      </p>
    </footer>
  );
}

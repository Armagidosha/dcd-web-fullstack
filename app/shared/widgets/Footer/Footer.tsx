import Link from "next/link";
import Logo from "@/app/shared/ui/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-surface/90 max-w-330 mx-auto w-full backdrop-blur-xs ring-1 ring-zinc-600 mt-24 py-8 px-4 z-50 rounded-t-lg">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        {/* Юр инфо */}
        <div>
          <Logo width={150} withText />
          <address className="grid gap-1 mt-2 pl-1 not-italic">
            <p>ИНН: 772879961873</p>
            <p>
              Почта:{" "}
              <a className="text-primary" href="mailto:draimcido@gmail.com">
                draimcido@gmail.com
              </a>
            </p>
            <p>
              &copy; DraimCiDo {new Date().getFullYear()}{" "}
              Все&nbsp;права&nbsp;защищены.
            </p>
          </address>
        </div>

        {/* Политика */}
        <div>
          <h3 className="font-semibold">Документы</h3>
          <ul className="grid gap-1 mt-2">
            <li>
              <Link href={"/"}>Политика конфиденциальности</Link>
            </li>
            <li>
              <Link href={"/"}>Пользовательское соглашение</Link>
            </li>
          </ul>
        </div>

        {/* Соц линки */}
        <div>
          <h3 className="font-semibold">Связь с нами</h3>
          <ul className="grid gap-1 mt-2">
            <li>
              <Link href={"/"}>Discord</Link>
            </li>
            <li>
              <Link href={"/"}>Telegram</Link>
            </li>
          </ul>
        </div>

        {/* Навигация по странице */}
        <nav>
          <h3 className="font-semibold">Навигация</h3>
          <ul className="grid gap-1 mt-2">
            <li>
              <Link href={"/"}>Главная</Link>
            </li>
            <li>
              <Link href={"/"}>Донат-услуги</Link>
            </li>
            <li>
              <Link href={"/"}>Правила</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

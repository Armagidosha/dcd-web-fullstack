import Link from "next/link";
import Logo from "@/app/shared/ui/Logo/Logo";

const Footer = () => {
  return (
    <footer className="gradient-bg max-w-330 mx-auto w-full backdrop-blur-sm ring-1 ring-border mt-24 py-4 px-4 z-40 rounded-t-lg">
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

      <p className="mt-4 text-zinc-500">
        &copy; DraimCiDo {new Date().getFullYear()}{" "}
        Все&nbsp;права&nbsp;защищены.
      </p>
    </footer>
  );
};

export default Footer;

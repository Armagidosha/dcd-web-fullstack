import Link from "next/link";
import Logo from "@/app/shared/ui/Logo/Logo";
import st from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={`${st.footer} text-sm`}>
      <div className={`${st.container} container`}>
        {/* Юр инфо */}
        <div>
          <Logo width={150} withText />
          <ul className={`${st.list} ${st.list_withPadding}`}>
            <li>ИНН: 772879961873</li>
            <li>
              Почта:&nbsp;
              <a className={st.link} href="mailto:draimcido@gmail.com">
                draimcido@gmail.com
              </a>
            </li>
            <li>
              &copy; DraimCiDo {new Date().getFullYear()} Все права защищены.
            </li>
          </ul>
        </div>

        {/* Политика */}
        <div>
          <h3 className="text-md">Документы</h3>
          <ul className={st.list}>
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
          <h3 className="text-md">Связь с нами</h3>
          <ul className={st.list}>
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
          <h3 className="text-md">Навигация</h3>
          <ul className={st.list}>
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

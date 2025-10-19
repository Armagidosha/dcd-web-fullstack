import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/shared/ui/Logo/Logo";
import st from "./Header.module.scss";

const LINKS = [
  { title: "Главная", path: "/", iconPath: "/icons/home.svg" },
  { title: "Донат-услуги", path: "/store", iconPath: "/icons/cart.svg" },
  { title: "Правила", path: "/rules", iconPath: "/icons/rules.svg" },
];

const Header = () => {
  return (
    <header className={st.header}>
      <div className={st.header_container}>
        <Logo withText={true} />
        <nav className={st.nav}>
          {LINKS.map((link) => (
            <div key={link.title} className={st.link_container}>
              <Image
                width={18}
                height={18}
                src={link.iconPath}
                alt={link.title}
                unoptimized
              />
              <Link href={link.path}>{link.title}</Link>
            </div>
          ))}
        </nav>
        <div className={st.ip}>
          <p>IP: mc.draimcido.net</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

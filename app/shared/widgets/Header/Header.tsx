"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import IpCopy from "@/app/shared/ui/IpCopy/IpCopy";
import Logo from "@/app/shared/ui/Logo/Logo";
import st from "./Header.module.scss";

const LINKS = [
  { title: "Главная", path: "/", iconPath: "/icons/home.svg" },
  { title: "Донат-услуги", path: "/store", iconPath: "/icons/cart.svg" },
  { title: "Правила", path: "/rules", iconPath: "/icons/rules.svg" },
];

const Header = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => setIsOpened(!isOpened);

  return (
    <header className={st.header}>
      <div className={clsx(st.inner, { [st.opened]: isOpened })}>
        <Logo withText />
        <nav className={st.nav}>
          {LINKS.map((link) => (
            <div key={link.title}>
              <Image
                width={18}
                height={19}
                src={link.iconPath}
                alt={link.title}
                unoptimized
              />
              <Link href={link.path}>{link.title}</Link>
            </div>
          ))}
        </nav>
        <IpCopy extraClass={st.copy} />
        <button
          className={clsx(st.burger, { [st.opened]: isOpened })}
          type="button"
          onClick={handleClick}
        >
          <Image
            src={isOpened ? "/icons/x.svg" : "/icons/burger.svg"}
            alt={isOpened ? "Закрыть" : "Меню"}
            width={24}
            height={24}
            unoptimized
          />
        </button>
      </div>
    </header>
  );
};

export default Header;

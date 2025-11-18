"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import IpCopy from "@/app/shared/ui/IpCopy/IpCopy";
import Logo from "@/app/shared/ui/Logo/Logo";

const LINKS = [
  { title: "Главная", path: "/", iconPath: "/icons/home.svg" },
  { title: "Донат-услуги", path: "/store", iconPath: "/icons/cart.svg" },
  { title: "Правила", path: "/rules", iconPath: "/icons/rules.svg" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  useEffect(() => {
    const mq = window.matchMedia("(min-width:1280px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <header className="gradient-bg fixed w-[calc(100%-1rem)] xl:max-w-330 left-2/4 top-4 -translate-x-2/4 backdrop-blur-sm rounded-[1.75rem] ring-1 ring-border z-40">
      <div
        className={clsx(
          "relative flex flex-col items-start xl:items-center justify-between xl:flex-row gap-8 overflow-y-hidden max-h-15 p-2 transition-[max-height] duration-300",
          isOpen ? "max-h-72" : "max-h-15",
        )}
      >
        <Logo withText />
        {/* Бургер меню */}
        <button
          className={clsx(
            "absolute right-3 top-2.5 rounded-full p-2 block xl:hidden hover:bg-primary",
            isOpen && "bg-primary",
          )}
          onClick={handleClick}
          type="button"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
        >
          <Image
            src={isOpen ? "/icons/x.svg" : "/icons/burger.svg"}
            alt={isOpen ? "Закрыть" : "Меню"}
            width={24}
            height={24}
            unoptimized
          />
        </button>
        {/* Навигация по страницам */}
        <nav
          id="main-navigation"
          aria-label="Главная навигация"
          aria-hidden={!isDesktop && !isOpen}
          className="flex flex-col xl:flex-row gap-4 xl:gap-8 ml-2"
        >
          {LINKS.map((link) => (
            <Link
              key={link.title}
              tabIndex={!isDesktop && !isOpen ? -1 : undefined}
              onClick={() => setIsOpen(false)}
              className="flex gap-2"
              href={link.path}
            >
              <Image
                width={19}
                height={24}
                src={link.iconPath}
                alt={link.title}
                unoptimized
              />
              {link.title}
            </Link>
          ))}
        </nav>
        {/* Копирование IP */}
        <IpCopy className="w-full xl:w-fit" />
      </div>
    </header>
  );
};

export default Header;

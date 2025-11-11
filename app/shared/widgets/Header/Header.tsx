"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import IpCopy from "@/app/shared/ui/IpCopy/IpCopy";
import Logo from "@/app/shared/ui/Logo/Logo";

const LINKS = [
  { title: "Главная", path: "/", iconPath: "/icons/home.svg" },
  { title: "Донат-услуги", path: "/store", iconPath: "/icons/cart.svg" },
  { title: "Правила", path: "/rules", iconPath: "/icons/rules.svg" },
];

const Header = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => setIsOpened(!isOpened);

  return (
    <header className="fixed w-[calc(100%-1rem)] xl:max-w-330 left-2/4 top-4 -translate-x-2/4 bg-surface/90 backdrop-blur-xs rounded-[1.75rem] ring-1 ring-zinc-600 z-50">
      <div
        className={clsx(
          "relative flex flex-col items-start xl:items-center justify-between xl:flex-row gap-8 overflow-y-hidden max-h-15 p-2 transition-[max-height]",
          isOpened ? "max-h-72" : "max-h-15",
        )}
      >
        <Logo withText />
        <nav className="flex flex-col xl:flex-row gap-4 xl:gap-8 ml-2">
          {LINKS.map((link) => (
            <Link className="flex gap-2" key={link.title} href={link.path}>
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
        <IpCopy className="w-full xl:w-fit" />
        <button
          className={clsx(
            "absolute right-3 top-2.5 rounded-full p-2 block xl:hidden hover:bg-primary",
            isOpened && "bg-primary",
          )}
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

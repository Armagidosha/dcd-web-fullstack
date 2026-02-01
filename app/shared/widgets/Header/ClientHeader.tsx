"use client";

import Logo from "@shared/ui/Logo";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import IpCopy from "./IpCopy";
import { BurgerIcon, CrossIcon } from "../../../../ui/icons/ui.icons";

interface ILink {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface ClientHeaderProps {
  links: ILink[];
}

export default function ClientHeader({ links }: ClientHeaderProps) {
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
    <header
      className="gradient-bg fixed w-[calc(100%-1rem)] xl:max-w-330 left-2/4 top-4 
        -translate-x-2/4 backdrop-blur-sm rounded-[1.75rem] border border-border z-40"
    >
      <div
        className={clsx(
          "grid transition-[grid-template-rows] duration-300 overflow-hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div
          className="relative flex flex-col items-start xl:items-center 
        justify-between xl:flex-row gap-8 overflow-y-hidden min-h-15 p-2"
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
            {isOpen ? <CrossIcon /> : <BurgerIcon />}
          </button>

          {/* Навигация по страницам */}
          <nav
            id="main-navigation"
            aria-label="Главная навигация"
            aria-hidden={!isDesktop && !isOpen}
            className="flex flex-col xl:flex-row gap-4 xl:gap-8 ml-2"
          >
            {links.map((link) => (
              <Link
                key={link.title}
                className="relative flex items-center gap-1.5 px-4 py-2.5 
                rounded-xl font-semibold hover:text-primary group"
                href={link.path}
                tabIndex={!isDesktop && !isOpen ? -1 : undefined}
                onClick={() => setIsOpen(false)}
              >
                <span>{link.icon}</span>
                <span>{link.title}</span>
                {isDesktop && (
                  <span
                    className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 
                group-hover:scale-x-100 transition-transform duration-300 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Копирование IP */}
          <IpCopy className="w-full xl:w-fit" />
        </div>
      </div>
    </header>
  );
}

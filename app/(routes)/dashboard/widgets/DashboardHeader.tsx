import {
  FileTextIcon,
  HomeIcon,
  PackageIcon,
  RulesIcon,
} from "@shared/icons/icons";
import ImageWithFallback from "@shared/ui/ImageWithFallback";
import Link from "next/link";
import { auth } from "@/app/lib/auth";
import LogoutButton from "../ui/LogoutButton";

const NAV_ITEMS = [
  { icon: HomeIcon, label: "Главная", href: "/" },
  { icon: PackageIcon, label: "Продукты", href: "#products" },
  { icon: RulesIcon, label: "Правила", href: "#rules" },
  { icon: FileTextIcon, label: "Политика", href: "#policy" },
];

export default async function DashboardHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="w-full pt-4">
      <div
        className="rounded-3xl max-w-330 mx-auto lg:rounded-[1.75rem] py-2 px-3 
          backdrop-blur-sm bg-surface border border-border"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full overflow-hidden flex items-center 
                justify-center font-semibold text-sm bg-primary"
            >
              <ImageWithFallback
                width={44}
                height={44}
                src={user?.image}
                alt="Аватар"
                preload
              />
            </div>
            <span className="font-medium text-base text-light-text">
              {user?.name || "Администратор"}
            </span>
          </div>

          {/* Правая часть - Кнопка выхода */}
          <LogoutButton />
        </div>

        <nav
          className="2xl:hidden flex flex-wrap items-center border-t 
          border-border justify-around gap-2 mt-3 pt-4"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-1 items-center gap-2 px-8 py-4 justify-center rounded-xl 
                transition-[color, transform]  duration-300 bg-surface-variant 
                hover:bg-primary hover:scale-103"
            >
              <item.icon width={20} height={20} />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

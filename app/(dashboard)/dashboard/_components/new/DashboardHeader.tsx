import Link from "next/link";
import { auth } from "@/app/lib/auth";
import {
  FileTextIcon,
  HomeIcon,
  NewsIcon,
  PackageIcon,
} from "@/app/shared/icons/icons";
import ImageWithFallback from "@/app/shared/ui/ImageWithFallback/ImageWithFallback";
import LogoutButton from "@/app/shared/ui/LogoutButton/LogoutButton";

const NAV_ITEMS = [
  { icon: HomeIcon, label: "Домой", href: "/" },
  { icon: PackageIcon, label: "Продукты", href: "dashboard/products" },
  { icon: FileTextIcon, label: "Правила", href: "dashboard/rules" },
  { icon: NewsIcon, label: "Новости", href: "dashboard/news" },
];

export default async function DashboardHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="w-full pt-4">
      <div
        className="rounded-3xl max-w-7xl mx-auto lg:rounded-full py-3 px-4 
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

          {/* Центральная часть - Навигация */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  flex items-center gap-2 px-4 py-2 rounded-xl transition-[color, transform] 
                  duration-300 bg-surface-variant hover:bg-secondary hover:scale-103"
              >
                <item.icon width={18} height={18} />
                <span className="text-sm font-medium text-light-text">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Правая часть - Кнопка выхода */}
          <LogoutButton />
        </div>

        {/* Мобильная навигация */}
        <nav
          className="lg:hidden flex flex-wrap items-center border-t 
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

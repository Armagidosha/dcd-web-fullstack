import Link from "next/link";
import { logout } from "@/app/lib/actions/auth";
import { getProductsSecure } from "@/app/lib/actions/product";
import { auth } from "@/app/lib/auth";
import { HomeIcon, LogoutIcon } from "@/app/shared/icons/icons";
import ImageWithFallback from "@/app/shared/ui/ImageWithFallback/ImageWithFallback";
import Chart from "./_components/Chart";
import StatsCard from "./_components/Stats";
import Tabs from "./_components/Tabs";

// Моковые данные
const mockStats = [
  { name: "Продуктов", value: 12 },
  { name: "Категорий", value: 12 },
  { name: "Продаж", value: 12 },
  { name: "Выручка", value: 12 },
];

const mockChartData = [
  { name: "Янв", sales: 40, revenue: 240 },
  { name: "Фев", sales: 30, revenue: 98 },
  { name: "Мар", sales: 20, revenue: 98 },
  { name: "Апр", sales: 20, revenue: 8 },
  { name: "Май", sales: 10, revenue: 40 },
  { name: "Июн", sales: 20, revenue: 30 },
  { name: "Июл", sales: 30, revenue: 43 },
];

export default async function AdminProductsPage() {
  const { products, categories } = await getProductsSecure();
  const session = await auth();
  const user = session?.user;

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-light-text mb-2">
              Панель управления
            </h1>
            <p className="text-primary">Управление продуктами и категориями</p>
          </div>

          {/* Карточка пользователя */}
          <div className="flex items-center w-100 bg-surface/90 p-2 pr-2 rounded-xl border border-border">
            {user && (
              <ImageWithFallback
                className="rounded-full"
                width={50}
                height={50}
                src={user.image ?? "none"}
                alt={`Аватар ${user.name}`}
              />
            )}
            <span className="ml-4 text-lg font-semibold">
              {user?.name ?? "Нет данных"}
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <Link
                className="hover:bg-primary transition-colors duration-300 p-2 rounded-xl"
                href={"/"}
              >
                <HomeIcon />
              </Link>
              <button
                className="hover:bg-primary transition-colors duration-300 p-2 rounded-xl cursor-pointer"
                type="button"
                onClick={logout}
              >
                <LogoutIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mockStats.map((stat) => (
            <StatsCard key={stat.name} card={stat} />
          ))}
        </div>

        {/* Chart */}
        <Chart data={mockChartData} />

        {/* Tabs */}
        <Tabs products={products} categories={categories} />
      </div>
    </div>
  );
}

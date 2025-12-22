import { metaConfig } from "@shared/utils/constants";
import Chart from "../../ui/Chart";
import StatsCard from "../../ui/Stats";
import TitleInfo from "../../ui/TitleInfo";
import Tabs from "../../widgets/Tabs";

// TODO: Убрать моковые данные
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

export const metadata = metaConfig.dashboard;

export default async function AdminProductsPage() {
  return (
    <>
      <TitleInfo description="Управление продуктами и категориями" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockStats.map((stat) => (
          <StatsCard key={stat.name} card={stat} />
        ))}
      </div>

      {/* Chart */}
      <Chart data={mockChartData} />

      {/* Tabs */}
      <Tabs />
    </>
  );
}

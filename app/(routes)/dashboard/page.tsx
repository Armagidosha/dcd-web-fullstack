import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  FileTextIcon,
  HomeIcon,
  PackageIcon,
  RulesIcon,
} from "@/app/shared/icons/icons";
import Paper from "@/app/shared/ui/Paper";
import prisma from "@/lib/prisma";
import Aside from "./ui/Aside";
import Chart from "./ui/Chart";
import StatsCard from "./ui/Stats";
import TitleInfo from "./ui/TitleInfo";
import PolicyManager from "./widgets/PolicyManager";
import RulesManager from "./widgets/RulesManager";
import Tabs from "./widgets/Tabs";

// TODO: Убрать моковые данные
const mockStats = [
  { name: "Продуктов", value: "12" },
  { name: "Категорий", value: "12" },
  { name: "Продаж", value: "12" },
  { name: "Выручка", value: "12" },
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

async function getPolicy() {
  return await prisma.policy.findMany({ orderBy: { type: "asc" } });
}

const ANCHOR_LINKS = [
  {
    anchor: "/",
    icon: HomeIcon,
    label: "На главную",
  },
  {
    anchor: "#products",
    icon: PackageIcon,
    label: "Продукты",
  },
  {
    anchor: "#rules",
    icon: RulesIcon,
    label: "Правила",
  },
  {
    anchor: "#policy",
    icon: FileTextIcon,
    label: "Политика",
  },
];

export default async function AdminProductsPage() {
  const policies = await getPolicy();

  return (
    <>
      <Aside anchors={ANCHOR_LINKS} />

      {/* Stats */}
      <Paper id="products" className="p-4">
        <TitleInfo
          title="Продукты"
          description="Управление продуктами и категориями"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mockStats.map((stat) => (
            <StatsCard key={stat.name} name={stat.name} value={stat.value} />
          ))}
        </div>

        {/* Chart */}
        <Chart data={mockChartData} />

        {/* Tabs */}
        <Tabs />
      </Paper>

      <Paper id="rules" className="p-4 mt-4">
        <TitleInfo
          title="Правила"
          description="Создавайте и редактируйте разделы правил"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {mockStats.map((stat) => (
            <StatsCard key={stat.name} name={stat.name} value={stat.value} />
          ))}
        </div>

        <RulesManager />
      </Paper>

      <Paper id="policy" className="p-4 mt-4">
        <TitleInfo title="Политика" description="Редактируйте политику сайта" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {policies?.map((stat) => (
            <StatsCard
              key={stat.id}
              name={stat.title}
              value={`Последнее обновление: ${format(stat.updatedAt, "dd.MM.yy HH:mm", { locale: ru })}`}
            />
          ))}
        </div>

        <PolicyManager policies={policies} />
      </Paper>
    </>
  );
}

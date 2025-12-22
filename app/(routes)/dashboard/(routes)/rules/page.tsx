import StatsCard from "../../ui/Stats";
import TitleInfo from "../../ui/TitleInfo";
import Rules from "./widgets/Rules";

// TODO: Убрать моковые данные
const mockStats = [
  { name: "Кол-во разделов", value: 12 },
  { name: "Последнее обновление", value: 2077 },
];

export default async function RulesDashboardPage() {
  return (
    <>
      <TitleInfo description="Создавайте и редактируйте разделы правил" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {mockStats.map((stat) => (
          <StatsCard key={stat.name} card={stat} />
        ))}
      </div>

      <Rules />
    </>
  );
}

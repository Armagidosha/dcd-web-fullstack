import Paper from "@/app/shared/ui/Paper";

interface StatsCardProps {
  card: {
    name: string;
    value: number;
  };
}

export default function StatsCard({ card }: StatsCardProps) {
  return (
    <Paper className="p-4" withBorder>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary text-sm font-medium mb-1">{card.name}</p>
          <p className="text-3xl font-bold text-light-text">{card.value}</p>
        </div>
      </div>
    </Paper>
  );
}

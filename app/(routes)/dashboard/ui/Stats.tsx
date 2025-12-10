interface StatsCardProps {
  card: {
    name: string;
    value: number;
  };
}

export default function StatsCard({ card }: StatsCardProps) {
  return (
    <div className="bg-surface/90 rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary text-sm font-medium mb-1">{card.name}</p>
          <p className="text-3xl font-bold text-light-text">{card.value}</p>
        </div>
      </div>
    </div>
  );
}

import clsx from "clsx";
import Paper from "@/app/shared/ui/Paper";

interface StatsCardProps {
  name: string;
  value: string;
}

export default function StatsCard({ name, value }: StatsCardProps) {
  return (
    <Paper className="p-4" withBorder>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium mb-1">{name}</p>
          <p
            className={clsx(
              "text-primary font-bold",
              value.length > 5 ? "text-md" : "text-lg",
            )}
          >
            {value}
          </p>
        </div>
      </div>
    </Paper>
  );
}

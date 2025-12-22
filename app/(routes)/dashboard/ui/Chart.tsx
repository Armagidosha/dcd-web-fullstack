"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  data: {
    name: string;
    sales: number;
    revenue: number;
  }[];
}

export default function Chart({ data }: ChartProps) {
  return (
    <div className="bg-surface/90 rounded-2xl shadow-lg p-6 mb-8 border border-border">
      <h2 className="text-xl font-semibold text-light-text">
        Статистика продаж
      </h2>
      <ResponsiveContainer className={"mt-4"} width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="5 5" stroke="var(--color-dim-text)" />
          <XAxis dataKey="name" stroke="var(--color-dim-text)" />
          <YAxis
            label={{ value: "Доход", angle: -90, position: "insideLeft" }}
            stroke="var(--color-dim-text)"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.5rem",
            }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="var(--color-primary)"
            strokeWidth={3}
            dot={{ fill: "var(--color-primary)", r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-secondary)"
            strokeWidth={3}
            dot={{ fill: "var(--color-secondary)", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/ui/primitives/card";

type MechanicsCardProps = {
  card: {
    title: string;
    description: string;
    Icon: LucideIcon;
  };
};

export default function MechanicsCard({ card }: MechanicsCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex gap-2 font-semibold">
        <card.Icon className="text-primary" />
        <h3 className="text-lg">{card.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-pretty">{card.description}</p>
      </CardContent>
    </Card>
  );
}

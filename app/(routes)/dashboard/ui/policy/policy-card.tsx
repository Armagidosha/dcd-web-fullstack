import { format } from "date-fns";
import { Clock, FileText, Pencil, ScrollText } from "lucide-react";
import type { Policy } from "@/lib/generated/prisma/client";
import { Button } from "@/ui/primitives/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/primitives/card";

type PolicyCardProps = {
  policy: Policy;
  onEdit: () => void;
};

export default function PolicyCard({ policy, onEdit }: PolicyCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md border border-border p-2">
              {policy.type === "PRIVACY" ? (
                <ScrollText
                  size={20}
                  className="text-muted-foreground"
                  aria-label="Privacy"
                />
              ) : (
                <FileText
                  size={20}
                  className="text-muted-foreground"
                  aria-label="Terms"
                />
              )}
            </div>
            <CardTitle className="text-lg">{policy.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-4">
          {policy.content || "Нет данных"}
        </p>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={18} />
          <span>
            {policy.updatedAt
              ? format(policy.updatedAt, "dd.MM.yy, H:mm")
              : "никогда"}
          </span>
        </div>

        <Button
          className="text-muted-foreground"
          variant="outline"
          onClick={() => onEdit()}
        >
          <Pencil size={20} />
          Изменить
        </Button>
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/primitives/card";
import { Skeleton } from "@/ui/primitives/skeleton";

export function RulesCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle>
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-48" />
            </CardDescription>
          </div>
          <CardAction>
            <Skeleton className="h-9 w-40 rounded-md" />
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 h-92">
        {[1, 2, 3, 4].map((el) => (
          <div
            key={el}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/ui/primitives/card";
import { Separator } from "@/ui/primitives/separator";
import { Skeleton } from "@/ui/primitives/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="hidden md:block h-5 w-60" />
        <CardAction className="hidden md:block">
          <Skeleton className="h-8 w-40" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-18" />
        <Skeleton className="h-18" />
        <Skeleton className="h-18" />
        <Separator className="my-4" />
        <Skeleton className="h-15" />
      </CardContent>
    </Card>
  );
}

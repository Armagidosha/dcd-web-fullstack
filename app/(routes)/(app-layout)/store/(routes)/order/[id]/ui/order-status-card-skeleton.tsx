import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/ui/primitives/card";
import { Separator } from "@/ui/primitives/separator";
import { Skeleton } from "@/ui/primitives/skeleton";

export function OrderStatusCardSkeleton() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4">
        {/* Product */}
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-5 w-48" />

        <Separator />

        {/* Customer */}
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-32" />

        <Separator />

        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />

          {/* Details */}
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/*  PromoCode */}
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>

      {/* Total price footer */}
      <CardFooter className="flex justify-between bg-muted/50 rounded-b-lg">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-6 w-24" />
      </CardFooter>
    </Card>
  );
}

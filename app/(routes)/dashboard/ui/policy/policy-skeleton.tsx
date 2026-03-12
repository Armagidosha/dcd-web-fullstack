import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/ui/primitives/card";
import { Skeleton } from "@/ui/primitives/skeleton";

function CardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="h-5 w-40" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-22" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-5 w-25" />
        <Skeleton className="ml-auto h-8 w-30" />
      </CardFooter>
    </Card>
  );
}

export default function PolicyCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {[1, 2].map((el) => (
        <CardSkeleton key={el} />
      ))}
    </div>
  );
}

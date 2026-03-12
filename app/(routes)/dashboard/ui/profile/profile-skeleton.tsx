import { Card, CardContent } from "@/ui/primitives/card";
import { Skeleton } from "@/ui/primitives/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6 flex flex-col items-center gap-6">
          <Skeleton className="rounded-full w-24 h-24" />

          <div className="flex flex-col gap-2">
            <Skeleton className="w-50 h-5" />
            <Skeleton className="w-50 h-5" />
          </div>

          <div className="flex flex-col w-full h-19 gap-3">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

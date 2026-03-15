import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/primitives/card";
import { Item, ItemActions, ItemContent } from "@/ui/primitives/item";
import { Skeleton } from "@/ui/primitives/skeleton";

export default function PromoCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-30 h-5" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-55 h-5" />
        </CardDescription>
        <CardAction>
          <Skeleton className="hidden md:block h-8 w-32 rounded-md" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        {[1, 2, 3].map((el) => (
          <Item key={el} variant="muted">
            <ItemContent>
              <CardTitle>
                <Skeleton className="h-5 w-30" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-60 h-5" />
              </CardDescription>
            </ItemContent>
            <ItemActions>
              <Skeleton className="h-8 w-8" />
            </ItemActions>
          </Item>
        ))}
      </CardContent>
    </Card>
  );
}

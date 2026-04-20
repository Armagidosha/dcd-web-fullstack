import { getOrderAction } from "@/lib/actions/order/get-order";
import { Badge } from "@/ui/primitives/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/ui/primitives/card";
import { Separator } from "@/ui/primitives/separator";

type OrderStatusProps = {
  params: Promise<{ id: string }>;
};

const statusMap = {
  PENDING: "В обработке",
  CANCELED: "Отменен",
  SUCCEEDED: "Выполнен",
  FAILED: "Не выполнен",
};

export default async function OrderStatusCard({ params }: OrderStatusProps) {
  const { id } = await params;
  const order = await getOrderAction(id);

  if (!order) return null;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-muted-foreground uppercase tracking-wide">Заказ</p>
        <Badge
          variant={
            order.status === "SUCCEEDED" || order.status === "PENDING"
              ? "outline"
              : "destructive"
          }
        >
          {statusMap[order.status]}
        </Badge>
      </CardHeader>

      <Separator />

      {/* Product */}
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
          Товар
        </p>
        <p className="font-medium">{order.product.name}</p>

        <Separator />

        {/* Customer */}
        <p className="text-muted-foreground uppercase tracking-wide mb-2">
          Покупатель
        </p>
        <p className="text-sm font-medium">{order.nickname}</p>

        <Separator />

        {/* Details */}
        <div className="space-y-2">
          <p className="text-muted-foreground uppercase tracking-wide">
            Детали цены
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Исходная цена</span>
            <span>&#8381;{order.originalPrice.toFixed(2)}</span>
          </div>

          {/* PromoCode */}
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              Промокод
              {order.promoCode && (
                <Badge variant="outline">{order.promoCode}</Badge>
              )}
            </span>
            <span
              className={
                order.promoCode ? "text-success-foreground" : "text-foreground"
              }
            >
              — &#8381;{order.originalPrice * (order.discount / 100)}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Total price footer */}
      <CardFooter className="flex justify-between bg-muted/50 rounded-b-lg">
        <span className="font-medium">Итого</span>
        <span className="text-lg font-medium">
          &#8381;{order.totalPrice.toFixed(2)}
        </span>
      </CardFooter>
    </Card>
  );
}

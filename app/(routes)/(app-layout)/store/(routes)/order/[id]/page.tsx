import { Suspense } from "react";
import { Section } from "@/ui/primitives/section";
import OrderStatusCard from "./ui/order-status-card";
import { OrderStatusCardSkeleton } from "./ui/order-status-card-skeleton";

type OrderStatusPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderStatusPage({
  params,
}: OrderStatusPageProps) {
  return (
    <Section className="grid min-h-screen place-items-center">
      <Suspense fallback={<OrderStatusCardSkeleton />}>
        <OrderStatusCard params={params} />
      </Suspense>
    </Section>
  );
}

import type { OrderGetPayload } from "@/lib/generated/prisma/models";
import prisma from "@/lib/prisma";

export type OrderStatus = OrderGetPayload<{
  select: {
    status: true;
    nickname: true;
    originalPrice: true;
    promoCode: true;
    discount: true;
    totalPrice: true;
    product: { select: { name: true } };
  };
}>;

export async function getOrderAction(orderId: string) {
  return await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      status: true,
      nickname: true,
      originalPrice: true,
      promoCode: true,
      discount: true,
      totalPrice: true,
      product: { select: { name: true } },
    },
  });
}

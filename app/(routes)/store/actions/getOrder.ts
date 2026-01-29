import prisma from "@/lib/prisma";

export async function getOrder(orderId: string) {
  return await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      status: true,
      customerNick: true,
      originalPrice: true,
      promoCode: true,
      discount: true,
      totalPrice: true,
      product: { select: { name: true } },
    },
  });
}

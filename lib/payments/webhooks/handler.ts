// /lib/payments/webhooks/handler.ts

import { revalidateTag } from "next/cache";
import type { NormalizedEvent } from "@/app/api/webhook/[provider]/route";
import { grantMinecraftPrivilege } from "@/lib/actions/grant-privilege";
import prisma from "@/lib/prisma";

export async function processWebhook(event: NormalizedEvent) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: event.orderId },
      include: { product: true },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    // Idempotency
    if (order.status === "SUCCEEDED" || order.status === "FAILED") {
      return;
    }

    if (event.type === "payment.succeeded") {
      const nickname = order.nickname;
      const key = order.product.key;

      await grantMinecraftPrivilege(nickname, key);

      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "SUCCEEDED",
          paidAt: new Date(),
          paymentId: event.paymentId,
        },
      });

      // Increase promo used count
      if (order.promoCode) {
        await tx.promoCode.updateMany({
          where: { code: order.promoCode },
          data: {
            usedCount: { increment: 1 },
          },
        });
      }

      revalidateTag("latest-PUBLIC", "max");
    }

    // Update status if checkout failed
    if (event.type === "payment.failed") {
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "FAILED",
        },
      });
    }
  });
}

import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { grantMinecraftPrivilege } from "@/lib/actions/grant-privilege";
import prisma from "@/lib/prisma";
import { yooCheckout } from "@/lib/yoo-kassa";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const paymentId = body?.object?.id;

    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    const payment = await yooCheckout.getPayment(paymentId);
    const orderId = payment.metadata.order_id;

    if (payment.status === "succeeded") {
      const order = await prisma.$transaction(async (tx) => {
        const foundOrder = await tx.order.findUnique({
          where: { id: orderId },
          include: { product: { select: { key: true } } },
        });

        if (!foundOrder || foundOrder.status === "succeeded") return;

        await tx.order.update({
          where: { id: orderId },
          data: { status: "succeeded" },
        });

        if (foundOrder.promoCode) {
          await tx.promoCode.update({
            where: { code: foundOrder.promoCode },
            data: { usedCount: { increment: 1 } },
          });
        }

        return foundOrder;
      });

      if (order) {
        await grantMinecraftPrivilege(order.customerNick, order.product.key);
      }
    }

    if (payment.status === "canceled") {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order || order.status === "canceled") return;

      await prisma.order.update({
        where: { id: order.id },
        data: { status: "canceled" },
      });
    }

    revalidatePath(`/store/order/${orderId}`);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

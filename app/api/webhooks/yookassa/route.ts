import { type NextRequest, NextResponse } from "next/server";
import { checkRes } from "@/app/shared/utils/functions";
import prisma from "@/lib/prisma";
import { yooCheckout } from "@/lib/YooKassa";

async function grantMinecraftPrivilege(nick: string, donate: string) {
  try {
    const response = await fetch(`${process.env.DCD_HOST}/api/privilege`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DCD_SECRET}`,
      },
      body: JSON.stringify({
        nick,
        donate: donate,
      }),
    });

    return await checkRes(response);
  } catch (error) {
    console.error("Error granting Minecraft privilege:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.object?.id) {
      return NextResponse.json(
        { error: "Not a notification" },
        { status: 400 },
      );
    }

    const payment = await yooCheckout.getPayment(body.object.id);

    if (payment.status === "succeeded") {
      const orderId = payment.metadata.order_id;

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { product: true },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" });
      }

      if (order.status === "completed") {
        return NextResponse.json({ message: "Already processed" });
      }

      await grantMinecraftPrivilege(order.customerNick, order.product.key);

      if (order.promoCode) {
        await prisma.promoCode.update({
          where: { code: order.promoCode },
          data: { usedCount: { increment: 1 } },
        });
      }

      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "completed",
        },
      });
    }

    if (payment.status === "canceled") {
      const orderId = payment.metadata.order_id;

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { product: true },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      if (order.status === "canceled") {
        return NextResponse.json({ message: "Already canceled" });
      }

      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "canceled",
        },
      });
    }

    return NextResponse.json("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

import type Stripe from "stripe";
import type { NormalizedEvent } from "@/app/api/webhook/[provider]/route";
import { stripe } from "../stripe";

const stripeWebhookKey = process.env.STRIPE_WEBHOOK_SECRET!;

if (!stripeWebhookKey) {
  throw new Error("STRIPE_WEBHOOK_SECRET environment variable is not set");
}

export async function handleStripeWebhook(
  req: Request,
): Promise<NormalizedEvent> {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    throw new Error("Signature is missing");
  }

  const event = stripe.webhooks.constructEvent(body, sig, stripeWebhookKey);
  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.order_id;

  if (!orderId) {
    throw new Error("OrderId not found in meta data");
  }

  if (event.type === "checkout.session.completed") {
    return {
      type: "payment.succeeded",
      paymentId: session.id,
      orderId,
      key: session.metadata?.key ?? "",
      nickname: session.metadata?.nickname ?? "",
      amount: (session.amount_total ?? 0) / 100,
      raw: event,
    };
  }

  if (event.type === "checkout.session.expired") {
    return {
      type: "payment.failed",
      paymentId: session.id,
      orderId,
      raw: event,
    };
  }

  throw new Error("Unhandled Stripe event");
}

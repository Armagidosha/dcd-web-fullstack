import { NextResponse } from "next/server";
import { processWebhook } from "@/lib/payments/webhooks/handler";
import { handleStripeWebhook } from "@/lib/payments/webhooks/stripe";
import { PaymentProvider } from "@/lib/utils/constants/payment-providers";

export type NormalizedEvent =
  | {
      type: "payment.succeeded";
      paymentId: string;
      orderId: string;
      key: string;
      nickname: string;
      amount: number;
      raw: unknown;
    }
  | {
      type: "payment.failed";
      paymentId: string;
      orderId: string;
      raw: unknown;
    };

export async function POST(
  req: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  try {
    const { provider } = await params;

    let event: NormalizedEvent;
    switch (provider) {
      case PaymentProvider.STRIPE:
        event = await handleStripeWebhook(req);
        break;

      default:
        return NextResponse.json("Unsupported provider", { status: 400 });
    }

    await processWebhook(event);

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json("Webhook error", { status: 400 });
  }
}

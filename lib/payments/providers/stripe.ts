import type { ProviderPayload } from "@/lib/payments/factories/payment.factory";
import { stripe } from "../stripe";

export async function createStripePayment(payload: ProviderPayload) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: payload.email,
    line_items: [
      {
        price_data: {
          currency: "EUR",
          product_data: {
            name: payload.productName,
          },
          unit_amount: payload.amount,
        },
        quantity: 1,
      },
    ],

    metadata: {
      order_id: payload.orderId,
      player_nick: payload.nickname,
      promo_code: payload.promoCode ?? "",
    },

    success_url: `${process.env.BASE_URL}/store/order/${payload.orderId}`,
    cancel_url: `${process.env.BASE_URL}/store`,
  });

  return {
    paymentId: session.id,
    confirmationUrl: session.url,
  };
}

import { createStripePayment } from "@/lib/payments/providers/stripe";
import { PaymentProvider } from "@/lib/utils/constants/payment-providers";

export type ProviderPayload = {
  productName: string;
  productId: string;
  orderId: string;
  amount: number;
  email: string;
  nickname: string;
  promoCode: string | null;
  idempotencyKey: string;
};

export async function createPaymentProvider(
  provider: "stripe",
  payload: ProviderPayload,
) {
  switch (provider) {
    case PaymentProvider.STRIPE:
      return createStripePayment(payload);

    default:
      throw new Error("Unsupported payment provider");
  }
}

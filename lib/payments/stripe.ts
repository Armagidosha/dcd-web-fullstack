import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;

if (!secret) {
  console.error("Stripe secret key is missing. Check .env (STRIPE_SECRET_KEY)");
  throw Error("Missing Stripe secret key");
}

export const stripe = new Stripe(secret, {
  apiVersion: "2026-03-25.dahlia",
});

import z from "zod";
import { PaymentProvider } from "../utils/constants/payment-providers";
import { validationErrors } from "../utils/constants/validation.config";

export const nicknameSchema = z
  .string({ error: validationErrors.NOT_A_STRING })
  .min(3, { error: validationErrors.MIN_LENGTH(3) })
  .max(16, validationErrors.MAX_LENGTH(16));

export const emailSchema = z.email({ error: "Некорректный email адрес" });

export const promoCodeSchema = z
  .string({
    error: validationErrors.NOT_A_STRING,
  })
  .max(32, validationErrors.MAX_LENGTH(32));

export const paymentSchema = z.object({
  nickname: nicknameSchema,
  email: emailSchema,
  promoCode: promoCodeSchema,
  terms: z.literal(true, { error: "Нужно принять условия" }),
  provider: z.enum(PaymentProvider),
  idempotencyKey: z.string({ error: validationErrors.NOT_A_STRING }),
});

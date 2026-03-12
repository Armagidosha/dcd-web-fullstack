import { email, string } from "zod";
import { validationErrors } from "../utils/constants/validation.config";

export const nicknameSchema = string({ error: validationErrors.NOT_A_STRING })
  .min(3, { error: validationErrors.MIN_LENGTH(3) })
  .max(16, validationErrors.MAX_LENGTH(16));

export const emailSchema = email({ error: "Некорректный email адрес" });

export const promoCodeSchema = string({
  error: validationErrors.NOT_A_STRING,
}).max(32, validationErrors.MAX_LENGTH(32));

import { date, number, object, string } from "zod";
import { validationErrors } from "../utils/constants/validation.config";

export const promoSchema = object({
  code: string({ error: validationErrors.NOT_A_STRING })
    .min(3, { error: validationErrors.MIN_LENGTH(3) })
    .max(20, { error: validationErrors.MAX_LENGTH(20) }),
  description: string({ error: validationErrors.NOT_A_STRING }).max(60, {
    error: validationErrors.MAX_LENGTH(60),
  }),
  discount: number({ error: validationErrors.NOT_A_NUMBER })
    .min(1, { error: validationErrors.MIN_VALUE(1) })
    .max(100, { error: validationErrors.MAX_VALUE(100) }),
  usageLimit: number({ error: validationErrors.NOT_A_NUMBER })
    .min(0, {
      error: validationErrors.MIN_VALUE(0),
    })
    .nullable(),
  validFrom: date({ error: validationErrors.NOT_A_DATE }),
  validTo: date({ error: validationErrors.NOT_A_DATE }),
});

import { object, string } from "zod";
import { validationErrors } from "../constants/validation.config";

export const ruleSchema = object({
  title: string({ error: validationErrors.NOT_A_STRING })
    .min(3, { error: validationErrors.MIN_LENGTH(3) })
    .max(24, { error: validationErrors.MAX_LENGTH(24) }),
  content: string({ error: validationErrors.NOT_A_STRING }).min(3, {
    error: validationErrors.MIN_LENGTH(3),
  }),
});

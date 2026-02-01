import { z } from "zod";
import { validationErrors } from "../constants/validation.config";

export const ruleSchema = z.object({
  title: z
    .string({ error: validationErrors.NOT_A_STRING })
    .min(3, { error: validationErrors.MIN_LENGTH(3) })
    .max(24, { error: validationErrors.MAX_LENGTH(24) }),
  content: z
    .string({ error: validationErrors.NOT_A_STRING })
    .min(3, { error: validationErrors.MIN_LENGTH(3) }),
});

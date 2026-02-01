import { z } from "zod";
import { validationErrors } from "../constants/validation.config";

export const policySchema = z.object({
  content: z
    .string({ error: validationErrors.NOT_A_STRING })
    .min(200, { error: validationErrors.MIN_LENGTH(200) }),
});

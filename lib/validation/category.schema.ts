import { object, string } from "zod";
import { validationErrors } from "../constants/validation.config";

export const categorySchema = object({
  name: string({ error: validationErrors.NOT_A_STRING })
    .min(3, { error: validationErrors.MIN_LENGTH(3) })
    .max(16, { error: validationErrors.MAX_LENGTH(3) }),
});

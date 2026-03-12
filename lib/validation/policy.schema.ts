import { object, string } from "zod";
import { validationErrors } from "../utils/constants/validation.config";

export const policySchema = object({
  content: string({ error: validationErrors.NOT_A_STRING }).min(200, {
    error: validationErrors.MIN_LENGTH(200),
  }),
});

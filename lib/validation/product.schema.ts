import { coerce, instanceof as instance, object, string } from "zod";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "../constants/file-validation.config";
import { validationErrors } from "../constants/validation.config";

export const productSchema = object({
  description: string({ error: validationErrors.NOT_A_STRING }).min(3, {
    error: validationErrors.MIN_LENGTH(3),
  }),
  image: instance(File, { error: validationErrors.NOT_A_FILE })
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      validationErrors.FILE_TOO_BIG(),
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      validationErrors.UNSUPPORTED_FILE_TYPE(),
    ),
  name: string({ error: validationErrors.NOT_A_STRING })
    .min(3, { error: validationErrors.MIN_LENGTH(3) })
    .max(16, { error: validationErrors.MAX_LENGTH(16) }),
  key: string({ error: validationErrors.NOT_A_STRING }).min(3, {
    error: validationErrors.MIN_LENGTH(3),
  }),
  price: coerce
    .number({ error: validationErrors.NOT_A_NUMBER })
    .min(50, { error: validationErrors.MIN_VALUE(50) })
    .max(10000, { error: validationErrors.MAX_VALUE(10000) }),
  category: string({ error: validationErrors.NOT_A_STRING })
    .min(3, { error: validationErrors.MIN_LENGTH(3) })
    .max(16, { error: validationErrors.MAX_LENGTH(16) }),
});

export const editProductSchema = productSchema.extend({
  image: productSchema.shape.image.nullable().optional(),
});

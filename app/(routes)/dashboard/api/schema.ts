import z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const productSchema = z.object({
  description: z
    .string({ error: "Значение должно быть строкой" })
    .min(3, { error: "Минимальная длина 3 символа" }),
  image: z
    .instanceof(File, { error: "Изображение должно быть файлом" })
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "Файл слишком большой. Максимум 2MB",
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Недопустимый тип файла. Разрешены: JPEG, PNG, WebP",
    ),
  name: z
    .string({ error: "Значение должно быть строкой" })
    .min(3, { error: "Минимальная длина 3 символа" })
    .max(16, { error: "Максимальная длина 16 символов" }),
  price: z.coerce
    .number({ error: "Значение должно быть числом" })
    .min(50, { error: "Минимальное значение 50" })
    .max(10000, { error: "Максимальное значение 10000" }),
  category: z
    .string({ error: "Значение должно быть строкой" })
    .min(3, { error: "Минимальная длина 3 символа" })
    .max(16, { error: "Максимальная длина 16 символов" }),
});

export const categorySchema = z.object({
  name: z
    .string({ error: "Значение должно быть строкой" })
    .min(3, { error: "Минимальная длина 3 символа" })
    .max(16, { error: "Максимальная длина 16 символов" }),
});

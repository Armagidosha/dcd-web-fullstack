export const validationErrors = {
  NOT_A_STRING: "Значение должно быть строкой",
  NOT_A_FILE: "Значение должно быть файлом",
  NOT_A_NUMBER: "Значение должно быть числом",

  UNSUPPORTED_FILE_TYPE: (types: string[] = ["JPEG", "PNG", "WebP"]) =>
    `Недопустимый тип файла. Разрешены ${types.join(", ")}`,
  MIN_LENGTH: (min: number) => `Минимальная длина ${min}`,
  MAX_LENGTH: (max: number) => `Максимальная длина ${max}`,
  MIN_VALUE: (min: number) => `Минимальное значение ${min}`,
  MAX_VALUE: (max: number) => `Максимальное значение ${max}`,

  FILE_TOO_BIG: (maxSize: number = 2) =>
    `Файл слишком большой. Максимум ${maxSize}МБ`,
};

"use server";

import { existsSync, unlinkSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "../auth";
import { UnauthorizedError } from "../errors/UnauthorizedError";

// TODO: Реализовать таблицу с правами
const allowedUsers = [
  "339134373796380694",
  "388646660051304448",
  "1056257180577312798",
];

export const checkRights = async () => {
  const session = await auth();
  if (
    !session?.user?.discordId ||
    !allowedUsers.includes(session.user.discordId)
  ) {
    throw new UnauthorizedError();
  }

  return true;
};

export const saveImage = async (file: File): Promise<string> => {
  // Проверка размера (5MB максимум)
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    throw new Error("Файл слишком большой. Максимум 5MB");
  }

  // Проверка типа файла
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Недопустимый тип файла. Разрешены: JPEG, PNG, WebP");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Создаём уникальное имя файла
  const fileExtension = file.type.split("/")[1] || "png";
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

  const uploadDir = path.join(process.cwd(), "public", "media");

  // Создаём папку
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);

  try {
    await writeFile(filePath, buffer);
  } catch (error) {
    console.error("Ошибка сохранения файла:", error);
    throw new Error("Не удалось сохранить файл");
  }

  return `/media/${fileName}`;
};

export const deleteImage = async (imageName: string) => {
  const imageDir = path.join(process.cwd(), "public");
  const imagePath = path.join(imageDir, imageName);
  if (!existsSync(imagePath)) return;
  unlinkSync(imagePath);
};

import "server-only";

import { existsSync } from "node:fs";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export async function saveImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExtension = file.type.split("/")[1] || "png";
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

  const uploadDir = path.join(process.cwd(), "public", "media");

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
}

export async function deleteImage(imageName: string) {
  const baseDir = path.join(process.cwd(), "public", "media");
  const imagePath = path.resolve(baseDir, path.basename(imageName));

  if (!imagePath.startsWith(baseDir)) {
    throw new Error("Invalid image path");
  }

  if (!existsSync(imagePath)) return;
  await unlink(imagePath);
}

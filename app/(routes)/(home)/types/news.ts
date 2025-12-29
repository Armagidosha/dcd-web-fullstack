import type { News } from "@/lib/generated/prisma/client";

export type ActiveCard = Omit<News, "id" | "createdAt" | "updatedAt"> & {
  formattedDate: string;
};

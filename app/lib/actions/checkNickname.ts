"use server";

import { checkRes } from "@/app/shared/utils/functions";
import prisma from "@/lib/prisma";

type CheckPlayerReturnType =
  | { success: true }
  | {
      success: false;
      error: string;
      details: Record<string, string[]>;
    };

export async function checkPlayerPrivilege(
  nickname: string,
  id: string,
): Promise<CheckPlayerReturnType> {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) throw new Error("Product not found");

  const response = await fetch(
    `${process.env.DCD_HOST}/api/check?nick=${encodeURIComponent(nickname)}&donate=${encodeURIComponent(product.key)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DCD_SECRET}`,
      },
    },
  );
  const checked = await checkRes(response);

  if (checked.status === "not_found") {
    return {
      success: false,
      error: "ERR_PLAYER_NOT_FOUND",
      details: {
        nick: ["Игрок не найден в базе проекта."],
      },
    };
  }

  if (checked.status === "already") {
    return {
      success: false,
      error: "ERR_PLAYER_ALREADY",
      details: {
        nick: ["Игрок уже имеет привилегию этого уровня или выше."],
      },
    };
  }

  return { success: true };
}

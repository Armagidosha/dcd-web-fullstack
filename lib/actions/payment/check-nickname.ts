"use server";

import { PLAYER_ERROR, SERVER_ERROR } from "@/app/shared/utils/constants";
import { checkRes, createErrorResult } from "@/app/shared/utils/functions";
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
  try {
    const product = await prisma.product.findUniqueOrThrow({ where: { id } });

    const response = await fetch(
      `${process.env.DCD_HOST}/api/check?nick=${encodeURIComponent(nickname.trim())}&donate=${encodeURIComponent(product.key)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DCD_SECRET}`,
        },
      },
    );
    const checked = await checkRes(response);

    if (checked.status === "not_found") {
      return createErrorResult(PLAYER_ERROR.PLAYER_NOT_FOUND, {
        playerNick: ["Игрок не найден в базе проекта."],
      });
    }

    if (checked.status === "already") {
      return createErrorResult(PLAYER_ERROR.PLAYER_HAS_PRIVILEGE, {
        playerNick: ["Игрок уже имеет привилегию этого уровня или выше."],
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error checking nickname", error);
    if (error instanceof TypeError) {
      const cause = error.cause as { code?: string } | undefined;
      if (
        cause?.code === "ECONNREFUSED" ||
        cause?.code === "ENOTFOUND" ||
        error.message === "fetch failed"
      ) {
        return createErrorResult(SERVER_ERROR.SERVER_UNAVAILABLE, {
          form: ["Сервер недоступен. Попробуйте позже."],
        });
      }
    }

    throw error;
  }
}

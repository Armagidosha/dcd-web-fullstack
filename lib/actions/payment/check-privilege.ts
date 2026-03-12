"use server";

import prisma from "@/lib/prisma";

type PrivilegeCheckSuccess = { success: true };

type PrivilegeCheckError = {
  success: false;
  message: string;
};

type PrivilegeCheckResult = PrivilegeCheckSuccess | PrivilegeCheckError;

export async function checkPlayerPrivilege(
  nickname: string,
  id: string,
): Promise<PrivilegeCheckResult> {
  try {
    const product = await prisma.product.findUniqueOrThrow({ where: { id } });
    const res = await fetch(
      `${process.env.DCD_HOST}/api/check?nick=${encodeURIComponent(nickname.trim())}&donate=${encodeURIComponent(product.key)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DCD_SECRET}`,
        },
        signal: AbortSignal.timeout(3000),
      },
    );

    const checked = await res.json();
    console.log(checked);
    if (checked.status === "error") {
      if (checked.message === "invalid_privilege") {
        return {
          success: false,
          message:
            "Выбран недействительный продукт. Обратитесь к администратору.",
        };
      }
      return {
        success: false,
        message: "Некорректный никнейм. (От 3-16 символов)",
      };
    }

    if (checked.status === "not_found") {
      return { success: false, message: "Игрок не найден в базе проекта." };
    }

    if (checked.status === "already") {
      return {
        success: false,
        message: "Игрок уже имеет привилегию этого уровня или выше.",
      };
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
        return {
          success: false,
          message: "Сервер недоступен. Попробуйте позже.",
        };
      }
    }

    return { success: false, message: "Неизвестная ошибка. Попробуйте позже." };
  }
}

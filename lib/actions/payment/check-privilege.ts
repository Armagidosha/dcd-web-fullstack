"use server";

import prisma from "@/lib/prisma";

type PrivilegeCheckSuccess = { success: true };

type PrivilegeCheckError = {
  success: false;
  message: string;
};

type PrivilegeCheckResult = PrivilegeCheckSuccess | PrivilegeCheckError;

type DcdResponse =
  | { status: "invalid_nickname" }
  | { status: "invalid_privilege" }
  | { status: "unknown_player" }
  | { status: "already" }
  | { status: "ok" };

const ERROR_MESSAGES = {
  invalid_privilege: "Выбран недействительный продукт.",
  invalid_nickname: "Некорректный никнейм. (От 3-16 символов)",
  unknown_player: "Игрок не найден в базе проекта.",
  already: "Игрок уже имеет привилегию этого уровня или выше.",
  server_down: "Сервер недоступен. Попробуйте позже.",
  unknown: "Неизвестная ошибка. Попробуйте позже.",
} as const;

const DCD_HOST = process.env.DCD_HOST;
const DCD_SECRET = process.env.DCD_SECRET;

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

export async function checkPlayerPrivilege(
  nickname: string,
  id: string,
): Promise<PrivilegeCheckResult> {
  const product = await prisma.product.findUnique({
    where: { id },
    select: { key: true },
  });

  if (!product) {
    return { success: false, message: ERROR_MESSAGES.invalid_privilege };
  }

  const url = new URL("/api/check", DCD_HOST);
  url.searchParams.set("nick", nickname.trim());
  url.searchParams.set("donate", product.key);

  let res: Response;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DCD_SECRET}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);
  } catch (error) {
    console.error(error);
    if (isAbortError(error)) {
      return { success: false, message: ERROR_MESSAGES.server_down };
    }
    return { success: false, message: ERROR_MESSAGES.unknown };
  }

  try {
    const data: DcdResponse = await res.json();

    switch (data.status) {
      case "ok":
        return { success: true };
      case "invalid_nickname":
        return { success: false, message: ERROR_MESSAGES.invalid_nickname };
      case "unknown_player":
        return { success: false, message: ERROR_MESSAGES.unknown_player };
      case "already":
        return { success: false, message: ERROR_MESSAGES.already };
      case "invalid_privilege":
        return { success: false, message: ERROR_MESSAGES.invalid_privilege };
      default:
        return { success: false, message: ERROR_MESSAGES.unknown };
    }
  } catch {
    return { success: false, message: ERROR_MESSAGES.unknown };
  }
}

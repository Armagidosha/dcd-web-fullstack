"use server";

import { logger } from "@/lib/logger";
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
  const log = logger.child({
    module: "dcd",
    nickname,
    productId: id,
  });

  const start = Date.now();

  const product = await prisma.product.findUnique({
    where: { id },
    select: { key: true },
  });

  if (!product) {
    log.warn({ event: "product_not_found" }, "Product not found");

    return { success: false, message: ERROR_MESSAGES.invalid_privilege };
  }

  const url = new URL("/api/check", DCD_HOST);
  url.searchParams.set("nick", nickname.trim());
  url.searchParams.set("donate", product.key);

  let res: Response;

  try {
    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DCD_SECRET}`,
      },
      signal: AbortSignal.timeout(3000),
    });
  } catch (error) {
    const duration = Date.now() - start;

    if (isAbortError(error)) {
      log.error(
        {
          event: "request_timeout",
          url: url.toString(),
          timeoutMs: 3000,
          durationMs: duration,
        },
        "DCD request timeout",
      );

      return { success: false, message: ERROR_MESSAGES.server_down };
    }

    log.error(
      {
        event: "request_failed",
        url: url.toString(),
        error,
        durationMs: duration,
      },
      "DCD request failed",
    );

    return { success: false, message: ERROR_MESSAGES.unknown };
  }

  if (!res.ok) {
    log.warn(
      {
        event: "dcd_bad_response",
        url: url.toString(),
        status: res.status,
        durationMs: Date.now() - start,
      },
      "DCD returned bad status",
    );
  }

  try {
    const data: DcdResponse = await res.json();

    const duration = Date.now() - start;

    log.info(
      {
        event: "check_status",
        durationMs: duration,
        status: data.status,
      },
      "Privilege check status",
    );

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
        return {
          success: false,
          message: ERROR_MESSAGES.invalid_privilege,
        };

      default:
        return { success: false, message: ERROR_MESSAGES.unknown };
    }
  } catch (error) {
    const duration = Date.now() - start;

    log.error(
      {
        event: "json_parse_error",
        url: url.toString(),
        error,
        durationMs: duration,
      },
      "Failed to parse DCD response",
    );

    return { success: false, message: ERROR_MESSAGES.unknown };
  }
}

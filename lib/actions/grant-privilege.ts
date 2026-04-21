import "server-only";

import { logger } from "@/lib/logger";

export async function grantMinecraftPrivilege(nick: string, donate: string) {
  const log = logger.child({
    module: "minecraft",
    action: "grant_privilege",
    nick,
    donate,
  });

  const start = Date.now();

  const url = `${process.env.DCD_HOST}/api/privilege`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DCD_SECRET}`,
      },
      body: JSON.stringify({
        nick,
        donate,
      }),
      signal: AbortSignal.timeout(10000),
    });

    const duration = Date.now() - start;

    let data: unknown;

    try {
      data = await response.json();
    } catch {
      log.error(
        {
          event: "invalid_json_response",
          status: response.status,
          durationMs: duration,
        },
        "Failed to parse response JSON",
      );

      throw new Error("Invalid response from DCD");
    }

    if (!response.ok) {
      log.error(
        {
          event: "request_failed",
          status: response.status,
          response: data,
          durationMs: duration,
        },
        "DCD request failed",
      );

      throw new Error("DCD request failed");
    }

    log.info(
      {
        event: "privilege_granted",
        durationMs: duration,
      },
      "Minecraft privilege granted",
    );

    return data;
  } catch (error) {
    const duration = Date.now() - start;

    log.error(
      {
        event: "grant_privilege_error",
        error,
        durationMs: duration,
      },
      "Unexpected error while granting privilege",
    );

    throw error;
  }
}

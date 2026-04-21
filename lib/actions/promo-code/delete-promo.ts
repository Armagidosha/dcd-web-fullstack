"use server";

import { updateTag } from "next/cache";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export async function deletePromoActionPrivate(id: string) {
  const log = logger.child({
    module: "promo",
    action: "delete",
    promoId: id,
  });

  const start = Date.now();

  try {
    const { success } = await checkRights();

    if (!success) {
      log.warn(
        { event: "unauthorized_delete_attempt" },
        "Unauthorized promo delete attempt",
      );

      throw new Error("Unauthorized");
    }

    const deletedPromo = await prisma.promoCode.delete({
      where: { id },
    });

    updateTag("promo-PRIVATE");

    log.info(
      {
        event: "promo_deleted",
        promoId: deletedPromo.id,
        durationMs: Date.now() - start,
      },
      "Promo deleted",
    );

    return deletedPromo;
  } catch (error) {
    const duration = Date.now() - start;

    if (error instanceof Error && error.message === "Unauthorized") {
      throw error;
    }

    log.error(
      {
        event: "promo_delete_failed",
        error,
        durationMs: duration,
      },
      "Unexpected promo delete error",
    );

    throw error;
  }
}

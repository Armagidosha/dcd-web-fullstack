"use server";

import { updateTag } from "next/cache";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { promoSchema } from "@/lib/validation/promo.schema";
import { checkRights } from "../check-rights";

type UpdatePromoActionArgs = {
  code: string;
  description: string;
  discount: number;
  usageLimit: null | number;
  validFrom: Date;
  validTo: Date;
};

export async function updatePromoActionPrivate(
  id: string,
  args: UpdatePromoActionArgs,
) {
  const log = logger.child({
    module: "promo",
    action: "update",
    promoId: id,
  });

  const start = Date.now();

  try {
    const { success } = await checkRights();

    if (!success) {
      log.warn(
        { event: "unauthorized_update_attempt" },
        "Unauthorized promo update attempt",
      );

      throw new Error("Unauthorized");
    }

    const validatedData = promoSchema.parse(args);

    const existingPromo = await prisma.promoCode.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingPromo) {
      log.warn({ event: "promo_not_found" }, "Promo not found");

      throw new Error("Promo not found");
    }

    const updatedPromo = await prisma.promoCode.update({
      where: { id },
      data: {
        code: validatedData.code,
        discount: validatedData.discount,
        description: validatedData.description,
        validFrom: validatedData.validFrom,
        validTo: validatedData.validTo,
        usageLimit: validatedData.usageLimit,
        isActive: false,
        usedCount: 0,
      },
    });

    updateTag("promo-PRIVATE");

    log.info(
      {
        event: "promo_updated",
        durationMs: Date.now() - start,
      },
      "Promo updated",
    );

    return updatedPromo;
  } catch (error) {
    const duration = Date.now() - start;

    if (error instanceof Error && error.message === "Unauthorized") {
      throw error;
    }

    if (error instanceof Error && error.message === "Promo not found") {
      throw error;
    }

    log.error(
      {
        event: "promo_update_failed",
        error,
        durationMs: duration,
      },
      "Unexpected promo update error",
    );

    throw error;
  }
}

export async function updatePromoStatusActionPrivate(id: string) {
  const log = logger.child({
    module: "promo",
    action: "toggle_status",
    promoId: id,
  });

  const start = Date.now();

  try {
    const { success } = await checkRights();

    if (!success) {
      log.warn(
        { event: "unauthorized_toggle_attempt" },
        "Unauthorized promo status toggle attempt",
      );

      throw new Error("Unauthorized");
    }

    const existingPromo = await prisma.promoCode.findUnique({
      where: { id },
      select: { isActive: true },
    });

    if (!existingPromo) {
      log.warn({ event: "promo_not_found" }, "Promo not found");

      throw new Error("Promo not found");
    }

    const updatedPromo = await prisma.promoCode.update({
      where: { id },
      data: {
        isActive: !existingPromo.isActive,
      },
    });

    updateTag("promo-PRIVATE");

    log.info(
      {
        event: "promo_status_toggled",
        newStatus: updatedPromo.isActive,
        durationMs: Date.now() - start,
      },
      "Promo status toggled",
    );

    return updatedPromo;
  } catch (error) {
    const duration = Date.now() - start;

    if (error instanceof Error && error.message === "Unauthorized") {
      throw error;
    }

    if (error instanceof Error && error.message === "Promo not found") {
      throw error;
    }

    log.error(
      {
        event: "promo_toggle_failed",
        error,
        durationMs: duration,
      },
      "Unexpected promo toggle error",
    );

    throw error;
  }
}

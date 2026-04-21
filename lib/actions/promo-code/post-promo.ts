"use server";

import { updateTag } from "next/cache";
import { ZodError } from "zod";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { promoSchema } from "@/lib/validation/promo.schema";
import { checkRights } from "../check-rights";

type CreatePromoActionPrivateArgs = {
  code: string;
  description: string;
  discount: number;
  usageLimit: null | number;
  validFrom: Date;
  validTo: Date;
};

export type CreatePromoFn = typeof createPromoActionPrivate;

export async function createPromoActionPrivate(
  args: CreatePromoActionPrivateArgs,
) {
  const log = logger.child({
    module: "promo",
    action: "create",
    code: args.code,
  });

  const start = Date.now();

  try {
    const { success } = await checkRights();

    if (!success) {
      log.warn(
        { event: "unauthorized_create_attempt" },
        "Unauthorized promo create attempt",
      );

      throw new Error("Unauthorized");
    }

    const validatedData = promoSchema.parse(args);

    const newPromo = await prisma.promoCode.create({
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
        event: "promo_created",
        promoId: newPromo.id,
        durationMs: Date.now() - start,
      },
      "Promo created",
    );

    return newPromo;
  } catch (error) {
    const duration = Date.now() - start;

    if (error instanceof Error && error.message === "Unauthorized") {
      throw error;
    }

    if (error instanceof ZodError) {
      log.warn(
        {
          event: "promo_validation_failed",
          issues: error.issues,
          durationMs: duration,
        },
        "Promo validation failed",
      );
      throw error;
    }

    log.error(
      {
        event: "promo_create_failed",
        error,
        durationMs: duration,
      },
      "Unexpected promo create error",
    );

    throw error;
  }
}

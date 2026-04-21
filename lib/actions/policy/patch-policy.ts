"use server";

import { revalidateTag, updateTag } from "next/cache";
import { PolicyType } from "@/lib/generated/prisma/enums";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export type ClientPolicyType = keyof typeof PolicyType;

type PatchPolicyParams = {
  type: PolicyType;
  content: string;
};

export async function updatePolicyPrivate({
  type,
  content,
}: PatchPolicyParams) {
  const log = logger.child({
    module: "policy",
    type,
    action: "update",
  });

  const start = Date.now();

  const { success } = await checkRights();

  if (!success) {
    log.warn(
      {
        event: "unauthorized_update_attempt",
      },
      "Unauthorized policy update attempt",
    );

    throw new Error("Unauthorized");
  }

  const updatedPolicy = await prisma.policy.upsert({
    where: { type },
    create: {
      type,
      content,
      title:
        type === PolicyType.TERMS
          ? "Пользовательское соглашение"
          : "Политика конфиденциальности",
    },
    update: { content },
  });

  updateTag("policy-PRIVATE");
  revalidateTag(`policy-${type}`, "max");

  log.info(
    {
      event: "policy_updated",
      policyId: updatedPolicy.id,
      durationMs: Date.now() - start,
    },
    "Policy updated",
  );

  return updatedPolicy;
}

"use server";

import { revalidateTag, updateTag } from "next/cache";
import { PolicyType } from "@/lib/generated/prisma/enums";
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
  const { success } = await checkRights();
  if (!success) throw new Error("Unauthorized");

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

  return updatedPolicy;
}

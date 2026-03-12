"use server";

import { revalidateTag, updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export async function deleteRuleActionPrivate(ruleId: string) {
  const { success } = await checkRights();
  if (!success) {
    throw new Error("Unauthorized");
  }

  const ruleToDelete = await prisma.rule.findUnique({
    where: { id: ruleId },
  });

  if (!ruleToDelete) {
    throw new Error("Rule not found");
  }

  await prisma.$transaction(async (tx) => {
    await tx.rule.delete({ where: { id: ruleToDelete.id } });

    await tx.rule.updateMany({
      where: { order: { gt: ruleToDelete.order } },
      data: { order: { decrement: 1 } },
    });
  });

  updateTag("rules-PRIVATE");
  revalidateTag("rules-PUBLIC", {});

  return { success: true };
}

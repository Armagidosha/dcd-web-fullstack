"use server";

import { revalidateTag, updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { ruleSchema } from "@/lib/validation/rule.schema";
import { checkRights } from "../check-rights";

export async function updateRuleActionPrivate({
  ruleId,
  title,
  content,
}: {
  ruleId: string;
  title?: string;
  content?: string;
}) {
  const { success } = await checkRights();

  if (!success) {
    throw new Error("Unauthorized");
  }

  const validatedData = ruleSchema.partial().parse({ title, content });

  const updatedRule = await prisma.rule.update({
    where: { id: ruleId },
    data: { content: validatedData.content, title: validatedData.title },
  });

  updateTag("rules-PRIVATE");
  revalidateTag("rules-PUBLIC", {});

  return updatedRule;
}

export async function reorderRuleActionPrivate(
  ruleId: string,
  direction: number,
) {
  const { success } = await checkRights();

  if (!success) {
    throw new Error("Unauthorized");
  }

  await prisma.$transaction(async (tx) => {
    const currentRule = await tx.rule.findUnique({
      where: { id: ruleId },
      select: { order: true },
    });

    if (!currentRule) {
      throw new Error("Rule not found");
    }

    const currentOrder = currentRule.order;
    const newOrder = currentOrder + direction;

    if (newOrder < 0) {
      throw new Error("Cannot move beyond first position");
    }

    const swapRule = await tx.rule.findFirst({
      where: { order: newOrder },
      select: { id: true, order: true },
    });

    if (!swapRule) {
      throw new Error("Cannot move beyond last position");
    }

    await tx.rule.update({
      where: { id: ruleId },
      data: { order: -1 },
    });

    await tx.rule.update({
      where: { id: swapRule.id },
      data: { order: currentOrder },
    });

    await tx.rule.update({
      where: { id: ruleId },
      data: { order: newOrder },
    });
  });

  updateTag("rules-PRIVATE");
  revalidateTag("rules-PUBLIC", "max");

  return { success: true };
}

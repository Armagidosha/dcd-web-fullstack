"use server";

import { revalidateTag, updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { ruleSchema } from "@/lib/validation/rule.schema";
import { checkRights } from "../check-rights";

export async function createRuleActionPrivate(title: string, content: string) {
  const { success } = await checkRights();

  if (!success) {
    throw new Error("Unauthorized");
  }

  const validatedData = ruleSchema.parse({
    title,
    content,
  });

  const newRule = await prisma.$transaction(async (tx) => {
    const maxOrder = await tx.rule.aggregate({
      _max: { order: true },
    });

    const nextOrder = (maxOrder._max.order ?? 0) + 1;

    return tx.rule.create({
      data: {
        ...validatedData,
        order: nextOrder,
      },
    });
  });

  updateTag("rules-PRIVATE");
  revalidateTag("rules-PUBLIC", "max");

  return newRule;
}

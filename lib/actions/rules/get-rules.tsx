"use server";

import { cacheTag } from "next/cache";
import type { RuleGetPayload } from "@/lib/generated/prisma/models";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export type RuleProps = RuleGetPayload<{
  select: { order: true; title: true; content: true; updatedAt: true };
}>;

async function getRulesPrivate() {
  "use cache";
  cacheTag("rules-PRIVATE");

  return prisma.rule.findMany({ orderBy: { order: "asc" } });
}

export async function getRulesActionPrivate() {
  const { success } = await checkRights();
  if (!success) throw new Error("Unauthorized");

  return await getRulesPrivate();
}

export async function getRulesAction() {
  "use cache";
  cacheTag("rules-PUBLIC");

  return await prisma.rule.findMany({
    select: {
      order: true,
      title: true,
      content: true,
      updatedAt: true,
    },
    orderBy: { order: "asc" },
  });
}

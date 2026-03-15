"use server";

import { format } from "date-fns";
import { cacheTag } from "next/cache";
import type { PolicyType } from "@/lib/generated/prisma/enums";
import type { PolicyGetPayload } from "@/lib/generated/prisma/models";
import prisma from "@/lib/prisma";
import { checkRights } from "../check-rights";

export type Policy = PolicyGetPayload<{
  select: { title: true; content: true; updatedAt: true; type: true };
}> & { formattedDate: string };

async function getPolicyPrivate() {
  "use cache";
  cacheTag(`policy-PRIVATE`);

  return prisma.policy.findMany({ orderBy: { type: "asc" } });
}

export async function getPolicyActionPrivate() {
  const { success } = await checkRights();

  if (!success) throw new Error("Unauthorized");

  return await getPolicyPrivate();
}

export async function getPolicyAction(type: PolicyType) {
  "use cache";
  cacheTag(`policy-${type}`);

  const policy = await prisma.policy.findFirst({
    where: { type },
    select: { title: true, content: true, updatedAt: true, type: true },
  });

  return {
    ...policy,
    formattedDate: format(policy?.updatedAt as Date, "dd.MM.yyyy"),
  };
}

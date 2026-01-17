"use server";

import prisma from "@/lib/prisma";

export const getRules = async () => {
  return await prisma.rule.findMany({ orderBy: { order: "asc" } });
};

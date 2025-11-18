import prisma from "@/lib/prisma";

export const getRules = async () => {
  const rules = await prisma.rule.findMany();
  return rules;
};

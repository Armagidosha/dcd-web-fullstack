import { POLICY_TYPES } from "@/app/shared/utils/constants";
import prisma from "@/lib/prisma";

export const getTerms = async () => {
  return await prisma.policy.findFirst({ where: { type: POLICY_TYPES.TERMS } });
};

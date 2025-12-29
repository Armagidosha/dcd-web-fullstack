"use server";

import { POLICY_TYPES } from "@/app/shared/utils/constants";
import prisma from "@/lib/prisma";

export const getPrivacy = async () => {
  return await prisma.policy.findFirst({
    where: { type: POLICY_TYPES.PRIVACY },
  });
};

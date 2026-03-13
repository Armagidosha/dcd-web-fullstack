"use server";

import { cacheTag } from "next/cache";
import type { OrderGetPayload } from "@/lib/generated/prisma/models";
import prisma from "@/lib/prisma";

export type Latest = OrderGetPayload<{
  select: {
    nickname: true;
    product: { select: { image: true; name: true } };
  };
}>;

export async function getLatestAction() {
  "use cache";
  cacheTag("latest-PUBLIC");

  return await prisma.order.findMany({
    orderBy: { updatedAt: "desc" },
    where: { status: "SUCCEEDED" },
    take: 6,
    select: {
      nickname: true,
      product: { select: { image: true, name: true } },
    },
  });
}

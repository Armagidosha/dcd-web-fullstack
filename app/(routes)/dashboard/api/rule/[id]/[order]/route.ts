import { type NextRequest, NextResponse } from "next/server";
import { checkRights } from "@/app/lib/actions/auth";
import { UnauthorizedError } from "@/app/shared/errors/UnauthorizedError";
import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; order: string }> },
) {
  try {
    await checkRights();
    const { id: ruleId, order } = await params;

    await prisma.$transaction(async (tx) => {
      // Получаем текущее правило
      const currentRule = await tx.rule.findUnique({
        where: { id: ruleId },
        select: { order: true },
      });

      if (!currentRule) {
        throw new Error("Rule not found");
      }

      const currentOrder = currentRule.order;
      const newOrder = currentOrder + Number(order);

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order:", error);

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Rule not found" }, { status: 404 });
      }
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update order",
      },
      { status: 400 },
    );
  }
}

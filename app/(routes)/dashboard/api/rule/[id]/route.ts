import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { checkRights } from "@/lib/actions/check-rights";
import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ruleSchema } from "@/lib/validation/rule.schema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { success } = await checkRights();

    if (!success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: ruleId } = await params;
    const { title, content } = await request.json();

    const validatedData = ruleSchema.partial().parse({ title, content });

    const updated = await prisma.rule.update({
      where: { id: ruleId },
      data: { content: validatedData.content, title: validatedData.title },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating rule:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: z.flattenError(error).fieldErrors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { success } = await checkRights();

    if (!success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: ruleId } = await params;

    const ruleToDelete = await prisma.rule.findUnique({
      where: { id: ruleId },
      select: { order: true },
    });

    if (!ruleToDelete) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.rule.delete({ where: { id: ruleId } });

      await tx.rule.updateMany({
        where: { order: { gt: ruleToDelete.order } },
        data: { order: { decrement: 1 } },
      });
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Error deleting rule", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Rule not found" }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

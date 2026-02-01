import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { checkRights } from "@/lib/actions/check-rights";
import prisma from "@/lib/prisma";
import { ruleSchema } from "@/lib/validation/rule.schema";

export async function GET() {
  try {
    const { success } = await checkRights();

    if (!success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      await prisma.rule.findMany({ orderBy: { order: "asc" } }),
    );
  } catch (error) {
    console.error("Error getting rules:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { success } = await checkRights();

    if (!success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();

    const validatedData = ruleSchema.parse({ title, content });

    const newRule = await prisma.$transaction(async (tx) => {
      const maxOrder = await prisma.rule.aggregate({ _max: { order: true } });
      const nextOrder = (maxOrder._max.order ?? 0) + 1;

      return await tx.rule.create({
        data: { ...validatedData, order: nextOrder },
      });
    });

    return NextResponse.json(newRule);
  } catch (error) {
    console.error("Error posting rule:", error);

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

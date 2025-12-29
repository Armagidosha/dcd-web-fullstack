import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { checkRights } from "@/app/lib/actions/utils";
import { UnauthorizedError } from "@/app/lib/errors/UnauthorizedError";
import prisma from "@/lib/prisma";
import { ruleSchema } from "../schema";

export async function GET() {
  try {
    await checkRights();
    return NextResponse.json(
      await prisma.rule.findMany({ orderBy: { order: "asc" } }),
    );
  } catch (error) {
    console.error("Error getting rules:", error);

    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    await checkRights();

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

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { checkRights } from "@/app/lib/actions/utils";
import { UnauthorizedError } from "@/app/lib/errors/UnauthorizedError";
import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { policySchema } from "../../schema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await checkRights();
    const requestData = await request.json();
    const { id } = await params;

    const { content } = policySchema.parse(requestData);

    const updated = await prisma.policy.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Policy not found" },
          { status: 404 },
        );
      }
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

    console.error("Unexpected error in PATCH /api/policy/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

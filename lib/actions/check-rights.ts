import "server-only";

import { headers } from "next/headers";
import { connection } from "next/server";
import { auth } from "@/lib/auth";

const allowedUsers = process.env.ALLOWED_DISCORD_IDS?.split(",") || [];

export async function checkRights() {
  await connection();

  const session = await auth.api.getSession({ headers: await headers() });

  if (
    !session?.user?.discordId ||
    !allowedUsers.includes(session.user.discordId)
  ) {
    return { success: false };
  }

  return { success: true };
}

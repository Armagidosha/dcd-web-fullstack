"use server";

import { auth } from "../auth";

const allowedUsers = process.env.ALLOWED_DISCORD_IDS?.split(",") || [];

export async function checkRights() {
  try {
    const session = await auth();
    if (
      !session?.user?.discordId ||
      !allowedUsers.includes(session.user.discordId)
    ) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Error checking rights:", error);
    return { success: false };
  }
}

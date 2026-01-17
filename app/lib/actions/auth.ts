"use server";

import { auth, signIn, signOut } from "../auth";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export async function login() {
  await signIn("discord", { redirectTo: "/dashboard" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

// TODO: Реализовать таблицу с правами
const allowedUsers = ["339134373796380694", "388646660051304448"];

export async function checkRights() {
  const session = await auth();
  if (
    !session?.user?.discordId ||
    !allowedUsers.includes(session.user.discordId)
  ) {
    throw new UnauthorizedError();
  }

  return true;
}

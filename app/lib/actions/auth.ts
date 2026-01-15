"use server";

import { auth, signIn, signOut } from "../auth";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export const login = async () => {
  await signIn("discord", { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

// TODO: Реализовать таблицу с правами
const allowedUsers = ["339134373796380694", "388646660051304448"];

export const checkRights = async () => {
  const session = await auth();
  if (
    !session?.user?.discordId ||
    !allowedUsers.includes(session.user.discordId)
  ) {
    throw new UnauthorizedError();
  }

  return true;
};

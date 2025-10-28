"use server";

import { signIn, signOut } from "../auth";

export const login = async () => {
  await signIn("discord", { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

"use client";

import { DiscordIcon } from "@/app/shared/icons/DiscordIcon";
import { authClient } from "@/lib/auth-client";

export default function LoginButton() {
  return (
    <button
      className="flex text-center items-center gap-4 bg-secondary p-4 
      rounded-xl cursor-pointer hover:opacity-80 transition-opacity duration-300"
      type="button"
      onClick={() =>
        authClient.signIn.social({
          provider: "discord",
        })
      }
    >
      <DiscordIcon />
      Вход через Discord
    </button>
  );
}

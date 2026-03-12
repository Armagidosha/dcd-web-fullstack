"use client";

import { authClient } from "@/lib/auth-client";
import { DiscordIcon } from "@/ui/icons/media.icons";
import { Button } from "@/ui/primitives/button";

export default function LoginViaDiscordButton() {
  const handleClick = () => authClient.signIn.social({ provider: "discord" });
  return (
    <Button size="lg" variant="secondary" onClick={handleClick}>
      <DiscordIcon /> Вход через Discord
    </Button>
  );
}

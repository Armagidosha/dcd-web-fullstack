import "server-only";

import { checkRes } from "@/app/shared/utils/functions";

export async function grantMinecraftPrivilege(nick: string, donate: string) {
  try {
    const response = await fetch(`${process.env.DCD_HOST}/api/privilege`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DCD_SECRET}`,
      },
      body: JSON.stringify({
        nick,
        donate: donate,
      }),
    });

    return await checkRes(response);
  } catch (error) {
    console.error("Error granting Minecraft privilege:", error);
    throw error;
  }
}

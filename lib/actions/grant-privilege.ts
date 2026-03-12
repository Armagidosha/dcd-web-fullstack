import "server-only";

export async function grantMinecraftPrivilege(nick: string, donate: string) {
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

  return await response.json();
}

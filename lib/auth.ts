import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BASE_URL as string,
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      discordId: {
        type: "string",
        nullable: true,
      },
    },
  },

  plugins: [
    customSession(async ({ user }) => {
      const account = await prisma.account.findFirst({
        where: { providerId: "discord", userId: user.id },
        select: { accountId: true },
      });

      return {
        user: {
          image: user.image,
          email: user.email,
          name: user.name,
          discordId: account?.accountId,
        },
      };
    }),
  ],
});

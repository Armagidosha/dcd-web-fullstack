import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";
import prisma from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // внутренний ID
      discordId: string; // ID из Discord
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [Discord],
  pages: {
    signIn: "/",
    error: "/",
    signOut: "/",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        const account = await prisma.account.findFirst({
          where: { userId: user.id, provider: "discord" },
          select: { providerAccountId: true },
        });

        if (account) {
          session.user.discordId = account.providerAccountId;
        }
      }
      return session;
    },
  },
});

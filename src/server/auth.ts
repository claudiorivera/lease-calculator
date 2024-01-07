import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import { db } from "~/server/db";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const authOptions = {
	adapter: PrismaAdapter(db),
	providers: [GitHubProvider, DiscordProvider],
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
			},
		}),
	},
} satisfies NextAuthConfig;

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth(authOptions);

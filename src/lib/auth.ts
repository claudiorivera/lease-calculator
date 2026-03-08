import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { oAuthProxy } from "better-auth/plugins/oauth-proxy";
import { env } from "@/env.mjs";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	socialProviders: {
		discord: {
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
			redirectURI:
				"https://lease-calculator.claudiorivera.com/api/auth/callback/discord",
		},
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
			redirectURI:
				"https://lease-calculator.claudiorivera.com/api/auth/callback/github",
		},
	},
	plugins: [oAuthProxy()],
	emailAndPassword: {
		enabled: true,
	},
	secret: env.BETTER_AUTH_SECRET,
	logger: {
		level: env.NODE_ENV === "development" ? "debug" : "info",
	},
	trustedOrigins: process.env.VERCEL_URL
		? [`https://${process.env.VERCEL_URL}`]
		: [],
	user: {
		additionalFields: {
			role: {
				type: Object.values(schema.Role),
				input: false,
				default: schema.Role.user,
			},
		},
	},
});

export type Session = typeof auth.$Infer.Session;

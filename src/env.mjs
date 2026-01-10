import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		BETTER_AUTH_SECRET: z.string(),
		DATABASE_URL: z.url(),
		DISCORD_CLIENT_ID: z.string(),
		DISCORD_CLIENT_SECRET: z.string(),
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		REDIRECT_URI: z.url().optional(),
	},
	runtimeEnv: {
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
		DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		NODE_ENV: process.env.NODE_ENV,
		REDIRECT_URI: process.env.REDIRECT_URI,
	},
	skipValidation: !!process.env.SKIP_VALIDATION,
	emptyStringAsUndefined: true,
});

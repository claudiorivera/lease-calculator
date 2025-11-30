import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		BETTER_AUTH_SECRET: z.string(),
		DATABASE_URL: z.url(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		REDIRECT_URI: z.url().optional(),
	},
	runtimeEnv: {
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		REDIRECT_URI: process.env.REDIRECT_URI,
	},
	skipValidation: !!process.env.SKIP_VALIDATION,
	emptyStringAsUndefined: true,
});

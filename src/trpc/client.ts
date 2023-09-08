"use client";

import { httpBatchLink, loggerLink } from "@trpc/client";
import {
	experimental_createActionHook as createActionHook,
	experimental_createTRPCNextAppDirClient as createTRPCNextAppDirClient,
	experimental_serverActionLink as serverActionLink,
} from "@trpc/next/app-dir/client";
import { env } from "~/env.mjs";
import { type AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";

export const api = createTRPCNextAppDirClient<AppRouter>({
	config() {
		return {
			transformer,
			links: [
				loggerLink({
					enabled: (op) =>
						env.NODE_ENV === "development" ||
						(op.direction === "down" && op.result instanceof Error),
				}),
				httpBatchLink({
					url: getUrl(),
					headers() {
						return {
							"x-trpc-source": "client",
						};
					},
				}),
			],
		};
	},
});

export const useAction = createActionHook({
	links: [loggerLink(), serverActionLink()],
	transformer,
});

/** Export type helpers */
export type * from "./shared";

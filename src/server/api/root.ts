import { authRouter } from "~/server/api/routers/auth";
import { leaseRouter } from "~/server/api/routers/lease";
import { odometerReadingRouter } from "~/server/api/routers/odometerReading";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	lease: leaseRouter,
	odometerReading: odometerReadingRouter,
	auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

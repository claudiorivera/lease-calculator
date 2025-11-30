import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
	session: protectedProcedure.query(({ ctx }) => {
		return ctx.session;
	}),
});

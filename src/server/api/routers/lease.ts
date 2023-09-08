import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { createLeaseSchema } from "~/utils/schemas/createLease";

export const leaseRouter = createTRPCRouter({
	all: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.lease.findMany();
	}),
	create: protectedProcedure
		.input(createLeaseSchema)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.lease.create({
				data: {
					...input,
					user: {
						connect: {
							id: ctx.session.user.id,
						},
					},
				},
			});
		}),
});

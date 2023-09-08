import { createLeaseSchema } from "~/schemas/lease";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

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
	mine: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.lease.findMany({
			where: {
				user: {
					id: ctx.session.user.id,
				},
			},
		});
	}),
});

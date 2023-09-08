import { createLeaseSchema } from "~/schemas/lease";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

export const all = publicProcedure.query(({ ctx }) => {
	return ctx.prisma.lease.findMany();
});

export const create = protectedProcedure
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
	});

export const mine = protectedProcedure.query(({ ctx }) => {
	return ctx.prisma.lease.findMany({
		where: {
			user: {
				id: ctx.session.user.id,
			},
		},
	});
});

export const leaseRouter = createTRPCRouter({
	all,
	create,
	mine,
});

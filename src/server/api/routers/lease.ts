import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createLeaseSchema } from "~/schemas/lease";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { type RouterOutputs } from "~/trpc/shared";

const defaultLeaseSelect = Prisma.validator<Prisma.LeaseSelect>()({
	id: true,
	name: true,
});

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
			select: defaultLeaseSelect,
		});
	}),
	byId: protectedProcedure.input(z.string().cuid()).query(({ ctx, input }) => {
		return ctx.prisma.lease.findUniqueOrThrow({
			where: {
				id: input,
			},
			select: {
				...defaultLeaseSelect,
				allowedMiles: true,
				excessFeePerMileInCents: true,
				numberOfMonths: true,
				startDate: true,
				userId: true,
				odometerReadings: {
					select: {
						createdAt: true,
						miles: true,
					},
				},
			},
		});
	}),
});

export type LeaseByIdOutput = RouterOutputs["lease"]["byId"];

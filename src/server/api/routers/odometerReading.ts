import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
	createOdometerReadingSchema,
	updateOdometerReadingSchema,
} from "~/schemas/odometerReading";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type RouterOutputs } from "~/trpc/shared";

const defaultOdometerReadingSelect =
	Prisma.validator<Prisma.OdometerReadingSelect>()({
		id: true,
		createdAt: true,
		miles: true,
	});

export const odometerReadingRouter = createTRPCRouter({
	create: protectedProcedure
		.input(createOdometerReadingSchema)
		.mutation(({ ctx, input }) => {
			return ctx.db.odometerReading.create({
				data: input,
				select: defaultOdometerReadingSelect,
			});
		}),
	byLeaseId: protectedProcedure
		.input(z.string().cuid())
		.query(({ ctx, input }) => {
			return ctx.db.odometerReading.findMany({
				where: {
					leaseId: input,
				},
				orderBy: {
					createdAt: "asc",
				},
			});
		}),
	update: protectedProcedure
		.input(updateOdometerReadingSchema)
		.mutation(({ ctx, input }) => {
			return ctx.db.odometerReading.update({
				where: {
					id: input.id,
				},
				data: {
					miles: input.miles,
				},
				select: defaultOdometerReadingSelect,
			});
		}),
	byId: protectedProcedure.input(z.string().cuid()).query(({ ctx, input }) => {
		return ctx.db.odometerReading.findUniqueOrThrow({
			where: {
				id: input,
			},
			select: { ...defaultOdometerReadingSelect, leaseId: true },
		});
	}),
	delete: protectedProcedure
		.input(z.string().cuid())
		.mutation(({ ctx, input }) => {
			return ctx.db.odometerReading.delete({
				where: {
					id: input,
				},
			});
		}),
});

export type OdometerReadingByIdOutput =
	RouterOutputs["odometerReading"]["byId"];

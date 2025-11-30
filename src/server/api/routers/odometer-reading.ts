import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import {
	createOdometerReadingSchema,
	updateOdometerReadingSchema,
} from "@/schemas/odometer-reading";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { odometerReading } from "@/server/db/schema";
import type { RouterOutputs } from "@/trpc/react";

export const odometerReadingRouter = createTRPCRouter({
	create: protectedProcedure
		.input(createOdometerReadingSchema)
		.mutation(async ({ ctx, input }) => {
			const [result] = await ctx.db
				.insert(odometerReading)
				.values(input)
				.returning({
					id: odometerReading.id,
					createdAt: odometerReading.createdAt,
					miles: odometerReading.miles,
				});
			return result;
		}),
	byLeaseId: protectedProcedure.input(z.cuid2()).query(({ ctx, input }) => {
		return ctx.db
			.select()
			.from(odometerReading)
			.where(eq(odometerReading.leaseId, input))
			.orderBy(asc(odometerReading.createdAt));
	}),
	update: protectedProcedure
		.input(updateOdometerReadingSchema)
		.mutation(async ({ ctx, input }) => {
			const [result] = await ctx.db
				.update(odometerReading)
				.set({
					miles: input.miles,
				})
				.where(eq(odometerReading.id, input.id))
				.returning({
					id: odometerReading.id,
					createdAt: odometerReading.createdAt,
					miles: odometerReading.miles,
				});
			return result;
		}),
	byId: protectedProcedure.input(z.cuid2()).query(async ({ ctx, input }) => {
		const result = await ctx.db
			.select({
				id: odometerReading.id,
				createdAt: odometerReading.createdAt,
				miles: odometerReading.miles,
				leaseId: odometerReading.leaseId,
			})
			.from(odometerReading)
			.where(eq(odometerReading.id, input))
			.limit(1);

		if (!result[0]) {
			throw new Error("Odometer reading not found");
		}

		return result[0];
	}),
	delete: protectedProcedure.input(z.cuid2()).mutation(({ ctx, input }) => {
		return ctx.db.delete(odometerReading).where(eq(odometerReading.id, input));
	}),
});

export type OdometerReadingByIdOutput =
	RouterOutputs["odometerReading"]["byId"];

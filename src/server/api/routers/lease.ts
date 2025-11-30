import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createLeaseSchema } from "@/schemas/lease";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { lease } from "@/server/db";
import type { RouterOutputs } from "@/trpc/react";

export const leaseRouter = createTRPCRouter({
	all: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.lease.findMany();
	}),
	create: protectedProcedure
		.input(createLeaseSchema)
		.mutation(async ({ ctx, input }) => {
			const [result] = await ctx.db
				.insert(lease)
				.values({
					...input,
					userId: ctx.session.user.id,
				})
				.returning();

			if (!result) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Unable to create lease, please try again later.",
				});
			}

			return result;
		}),
	mine: protectedProcedure.query(({ ctx }) => {
		return ctx.db.query.lease.findMany({
			where: eq(lease.userId, ctx.session.user.id),
			columns: {
				id: true,
				name: true,
			},
		});
	}),
	byId: protectedProcedure.input(z.cuid2()).query(async ({ ctx, input }) => {
		const result = await ctx.db.query.lease.findFirst({
			where: eq(lease.id, input),
			columns: {
				id: true,
				name: true,
				initialMiles: true,
				allowedMiles: true,
				excessFeePerMileInCents: true,
				numberOfMonths: true,
				startDate: true,
				userId: true,
			},
			with: {
				odometerReadings: {
					columns: {
						createdAt: true,
						miles: true,
					},
				},
			},
		});

		if (!result) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: `No lease with id '${input}' found.`,
			});
		}

		return result;
	}),
	deleteById: protectedProcedure.input(z.cuid2()).mutation(({ ctx, input }) => {
		return ctx.db.delete(lease).where(eq(lease.id, input));
	}),
});

export type LeaseByIdOutput = RouterOutputs["lease"]["byId"];
export type LeaseMineOutput = RouterOutputs["lease"]["mine"];

import { Prisma } from "@prisma/client";
import { createOdometerReadingSchema } from "~/schemas/odometerReading";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
});

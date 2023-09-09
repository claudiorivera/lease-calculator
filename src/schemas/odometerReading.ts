import { z } from "zod";

export const createOdometerReadingSchema = z.object({
	date: z.date(),
	miles: z.number().positive(),
	leaseId: z.string().cuid(),
});

export type CreateOdometerReadingInput = z.infer<
	typeof createOdometerReadingSchema
>;

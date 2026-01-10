import { z } from "zod";

export const createOdometerReadingSchema = z.object({
	miles: z.number().positive(),
	leaseId: z.string().cuid2(),
});

export const updateOdometerReadingSchema = z.object({
	id: z.string().cuid2(),
	miles: z.number().positive().optional(),
});

export type CreateOdometerReadingInput = z.infer<
	typeof createOdometerReadingSchema
>;

export type UpdateOdometerReadingInput = z.infer<
	typeof updateOdometerReadingSchema
>;

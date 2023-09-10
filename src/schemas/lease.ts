import { z } from "zod";

export const createLeaseSchema = z.object({
	name: z.string().min(1, "Name must be at least 1 character long"),
	startDate: z.date(),
	numberOfMonths: z.number().positive(),
	initialMiles: z.number().positive().default(0),
	allowedMiles: z.number().positive(),
	excessFeePerMileInCents: z.number().positive(),
});

export type CreateLeaseInput = z.infer<typeof createLeaseSchema>;

import { z } from "zod";

export const createLeaseSchema = z.object({
	name: z.string().min(1, "Name must be at least 1 character long"),
	startDate: z.date(),
	numberOfMonths: z.number().positive(),
	initialMiles: z.number().min(0).default(0),
	allowedMiles: z.number().positive(),
	excessFeePerMileInCents: z.number().positive(),
});

export type CreateLeaseInput = z.infer<typeof createLeaseSchema>;

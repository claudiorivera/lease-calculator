import { z } from "zod";

export const createLeaseSchema = z.object({
	name: z.string().min(1, "Name must be at least 1 character long"),
	startDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.transform((value) => new Date(value)),
	numberOfMonths: z.number().positive(),
	allowedMiles: z.number().positive(),
	excessFeePerMileInCents: z.number().positive(),
});

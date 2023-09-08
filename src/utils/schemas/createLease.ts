import { z } from "zod";

export const createLeaseSchema = z.object({
  name: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  allowedMileage: z.number().min(0),
  feePerMile: z.number().min(0),
});

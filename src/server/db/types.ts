import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { lease, odometerReading, user } from "@/server/db/schema";

export type User = InferSelectModel<typeof user>;
export type Lease = InferSelectModel<typeof lease>;
export type OdometerReading = InferSelectModel<typeof odometerReading>;

export type UserInsertInput = InferInsertModel<typeof user>;
export type LeaseInsertInput = InferInsertModel<typeof lease>;
export type OdometerReadingInsertInput = InferInsertModel<
	typeof odometerReading
>;

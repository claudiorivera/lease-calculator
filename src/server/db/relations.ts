import { relations } from "drizzle-orm";
import { lease, odometerReading, user } from "@/server/db/schema";

export const userRelations = relations(user, ({ many }) => ({
	leases: many(lease),
}));

export const leaseRelations = relations(lease, ({ one, many }) => ({
	user: one(user, {
		fields: [lease.userId],
		references: [user.id],
	}),
	odometerReadings: many(odometerReading),
}));

export const odometerReadingRelations = relations(
	odometerReading,
	({ one }) => ({
		lease: one(lease, {
			fields: [odometerReading.leaseId],
			references: [lease.id],
		}),
	}),
);

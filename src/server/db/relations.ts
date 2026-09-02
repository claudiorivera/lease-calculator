import { relations } from "drizzle-orm";
import {
	account,
	lease,
	odometerReading,
	session,
	user,
} from "@/server/db/schema";

export const userRelations = relations(user, ({ many }) => ({
	leases: many(lease),
	sessions: many(session),
	accounts: many(account),
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

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

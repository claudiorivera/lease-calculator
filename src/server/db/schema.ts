import { createId } from "@paralleldrive/cuid2";
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

function id() {
	return text("id")
		.primaryKey()
		.$defaultFn(() => createId());
}

export const Role = {
	user: "user",
	admin: "admin",
	demo: "demo",
} as const;

export const roleEnum = pgEnum("role", Role);

export const user = pgTable("user", {
	id: id(),
	name: text("name"),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	role: roleEnum("role").notNull().default(Role.user),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const lease = pgTable("lease", {
	id: id(),
	name: text("name").notNull(),
	startDate: timestamp("start_date").notNull(),
	initialMiles: integer("initial_miles")
		.notNull()
		.$default(() => 0),
	numberOfMonths: integer("number_of_months").notNull(),
	allowedMiles: integer("allowed_miles").notNull(),
	excessFeePerMileInCents: integer("excess_fee_per_mile_in_cents").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const odometerReading = pgTable("odometer_reading", {
	id: id(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	miles: integer("miles").notNull(),
	leaseId: text("lease_id")
		.notNull()
		.references(() => lease.id, { onDelete: "cascade" }),
});

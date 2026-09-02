import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { lease, odometerReading, Role, user } from "@/server/db/schema";

export async function seed() {
	await db.delete(user);

	const { user: newUser } = await auth.api.signUpEmail({
		body: {
			name: "Demo User",
			email: "demo@example.com",
			password: "password1234",
		},
	});

	await db
		.update(user)
		.set({
			role: Role.demo,
		})
		.where(eq(user.id, newUser.id));

	const [newLease] = await db
		.insert(lease)
		.values({
			userId: newUser.id,
			allowedMiles: 12000,
			excessFeePerMileInCents: 25,
			name: "Demo Lease",
			startDate: new Date(2026, 0, 1),
			numberOfMonths: 12,
			initialMiles: 0,
		})
		.returning();

	if (!newLease) {
		throw new Error("Failed to create demo lease");
	}

	await db.insert(odometerReading).values([
		{
			miles: 1100,
			createdAt: new Date(2026, 1, 1),
			leaseId: newLease.id,
		},
		{
			miles: 1900,
			createdAt: new Date(2026, 2, 1),
			leaseId: newLease.id,
		},
		{
			miles: 2600,
			createdAt: new Date(2026, 3, 1),
			leaseId: newLease.id,
		},
		{
			miles: 5800,
			createdAt: new Date(2026, 5, 1),
			leaseId: newLease.id,
		},
		{
			miles: 6200,
			createdAt: new Date(2026, 6, 1),
			leaseId: newLease.id,
		},
		{
			miles: 8500,
			createdAt: new Date(2026, 7, 1),
			leaseId: newLease.id,
		},
	]);
}

import { describe, expect, it } from "bun:test";
import { getTermProgress } from "~/lib/leases/getTermProgress";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

describe("getTermProgress", () => {
	const mockLease: LeaseByIdOutput = {
		id: "1",
		allowedMiles: 100,
		excessFeePerMileInCents: 10,
		numberOfMonths: 12,
		startDate: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), // Subtracting 6 months in milliseconds
		name: "Test Lease",
		userId: "1",
		odometerReadings: [
			{
				date: new Date(),
				miles: 100,
			},
		],
	};

	it("should return 0.5 when halfway through the lease", () => {
		const { startDate, numberOfMonths } = mockLease;
		const termProgress = getTermProgress(startDate, numberOfMonths);

		expect(termProgress).toBe(0.5);
	});
});

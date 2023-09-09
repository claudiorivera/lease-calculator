import { describe, expect, it } from "bun:test";
import { getLeaseProgress } from "~/lib/leases/getLeaseProgress";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

describe("getLeaseProgress", () => {
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

	const mockLeaseWithNoOdometerReadings: LeaseByIdOutput = {
		...mockLease,
		odometerReadings: [],
	};

	const mockLeaseWithStartDateToday: LeaseByIdOutput = {
		...mockLease,
		startDate: new Date(),
	};

	makeTest(mockLease, 0.5, 1);
	makeTest(mockLeaseWithStartDateToday, 0, 1);
	makeTest(mockLeaseWithNoOdometerReadings, 0.5, 0);
});

function makeTest(
	lease: LeaseByIdOutput,
	expectedTermProgress: number,
	expectedMilesProgress: number,
) {
	it(`should return ${expectedTermProgress} term progress and ${expectedMilesProgress} mile(s) progress`, () => {
		const { termProgress, milesProgress } = getLeaseProgress(lease);

		expect(termProgress).toBe(expectedTermProgress);
		expect(milesProgress).toBe(expectedMilesProgress);
	});
}

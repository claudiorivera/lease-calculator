import { describe, expect, it } from "bun:test";
import { getLatestOdometerReading } from "~/lib/leases/getLatestOdometerReading";
import { getMilesProgress } from "~/lib/leases/getMilesProgress";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

describe("getMilesProgress", () => {
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

	it("should return 0% miles progress", () => {
		const { allowedMiles, odometerReadings } = mockLeaseWithNoOdometerReadings;

		const latestOdometerReading = getLatestOdometerReading(odometerReadings);

		const milesProgress = getMilesProgress(allowedMiles, latestOdometerReading);

		expect(milesProgress).toBe(0);
	});

	it("should return 100% miles progress", () => {
		const { allowedMiles, odometerReadings } = mockLease;

		const latestOdometerReading = getLatestOdometerReading(odometerReadings);

		const milesProgress = getMilesProgress(allowedMiles, latestOdometerReading);

		expect(milesProgress).toBe(1);
	});
});

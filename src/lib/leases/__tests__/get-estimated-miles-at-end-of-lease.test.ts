import { describe, expect, test } from "vitest";
import { getEstimatedMilesAtEndOfLease } from "@/lib/leases";

describe("getEstimatedMilesAtEndOfLease", () => {
	test.each([
		{
			averageMilesPerDay: 1,
			leaseDaysRemaining: 1,
			latestOdometerReading: 1,
			expectedEstimatedMilesAtEndOfLease: 2,
		},
		{
			averageMilesPerDay: 0,
			leaseDaysRemaining: 100,
			latestOdometerReading: 0,
			expectedEstimatedMilesAtEndOfLease: 0,
		},
		{
			averageMilesPerDay: 10,
			leaseDaysRemaining: 10,
			latestOdometerReading: 100,
			expectedEstimatedMilesAtEndOfLease: 200,
		},
	])("should return $expectedEstimatedMilesAtEndOfLease when averageMilesPerDay is $averageMilesPerDay, leaseDaysRemaining is $leaseDaysRemaining and latestOdometerReading is $latestOdometerReading", ({
		averageMilesPerDay,
		leaseDaysRemaining,
		latestOdometerReading,
		expectedEstimatedMilesAtEndOfLease,
	}) => {
		expect(
			getEstimatedMilesAtEndOfLease({
				averageMilesPerDay,
				leaseDaysRemaining,
				latestOdometerReading,
			}),
		).toBe(expectedEstimatedMilesAtEndOfLease);
	});
});

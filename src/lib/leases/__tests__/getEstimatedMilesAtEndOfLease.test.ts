import { describe, expect, it } from "vitest";
import { getEstimatedMilesAtEndOfLease } from "~/lib/leases";

type MakeTestArgs = {
	averageMilesPerDay: number;
	leaseDaysRemaining: number;
	latestOdometerReading: number;
	expectedEstimatedMilesAtEndOfLease: number;
};

describe("getEstimatedMilesAtEndOfLease", () => {
	makeTest({
		averageMilesPerDay: 1,
		leaseDaysRemaining: 1,
		latestOdometerReading: 1,
		expectedEstimatedMilesAtEndOfLease: 2,
	});

	makeTest({
		averageMilesPerDay: 0,
		leaseDaysRemaining: 100,
		latestOdometerReading: 0,
		expectedEstimatedMilesAtEndOfLease: 0,
	});

	makeTest({
		averageMilesPerDay: 10,
		leaseDaysRemaining: 10,
		latestOdometerReading: 100,
		expectedEstimatedMilesAtEndOfLease: 200,
	});
});

function makeTest({
	averageMilesPerDay,
	leaseDaysRemaining,
	latestOdometerReading,
	expectedEstimatedMilesAtEndOfLease,
}: MakeTestArgs) {
	return it(`should return ${expectedEstimatedMilesAtEndOfLease} when averageMilesPerDay is ${averageMilesPerDay}, leaseDaysRemaining is ${leaseDaysRemaining} and latestOdometerReading is ${latestOdometerReading}`, () => {
		const estimatedMilesAtEndOfLease = getEstimatedMilesAtEndOfLease({
			averageMilesPerDay,
			latestOdometerReading,
			leaseDaysRemaining,
		});

		expect(estimatedMilesAtEndOfLease).toBe(expectedEstimatedMilesAtEndOfLease);
	});
}

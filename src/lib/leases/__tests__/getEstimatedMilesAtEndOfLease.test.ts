import { describe, expect, it } from "vitest";
import { getEstimatedMilesAtEndOfLease } from "~/lib/leases";

type MakeTestArgs = {
	leaseDaysElapsed: number;
	leaseDaysRemaining: number;
	initialMiles?: number;
	currentOdometerReading: number;
	expectedEstimatedMilesAtEndOfLease: number;
};

describe("getEstimatedMilesAtEndOfLease", () => {
	makeTest({
		leaseDaysElapsed: 0,
		leaseDaysRemaining: 0,
		currentOdometerReading: 0,
		expectedEstimatedMilesAtEndOfLease: 0,
	});

	makeTest({
		leaseDaysElapsed: 1,
		leaseDaysRemaining: 1,
		currentOdometerReading: 1,
		expectedEstimatedMilesAtEndOfLease: 2,
	});

	makeTest({
		leaseDaysElapsed: 99,
		leaseDaysRemaining: 1,
		currentOdometerReading: 1,
		expectedEstimatedMilesAtEndOfLease: 2, // we round up
	});

	makeTest({
		leaseDaysElapsed: 1,
		leaseDaysRemaining: 99,
		currentOdometerReading: 1,
		expectedEstimatedMilesAtEndOfLease: 100,
	});

	makeTest({
		leaseDaysElapsed: 1,
		leaseDaysRemaining: 99,
		currentOdometerReading: 0,
		expectedEstimatedMilesAtEndOfLease: 0,
	});

	makeTest({
		leaseDaysElapsed: 1,
		leaseDaysRemaining: 1,
		initialMiles: 100,
		currentOdometerReading: 101,
		expectedEstimatedMilesAtEndOfLease: 102,
	});
});

function makeTest({
	leaseDaysElapsed,
	leaseDaysRemaining,
	initialMiles = 0,
	currentOdometerReading,
	expectedEstimatedMilesAtEndOfLease,
}: MakeTestArgs) {
	return it("should calculate the estimated miles at end of lease", () => {
		const estimatedMilesAtEndOfLease = getEstimatedMilesAtEndOfLease({
			leaseDaysElapsed,
			leaseDaysRemaining,
			initialMiles,
			currentOdometerReading,
		});

		expect(estimatedMilesAtEndOfLease).toBe(expectedEstimatedMilesAtEndOfLease);
	});
}

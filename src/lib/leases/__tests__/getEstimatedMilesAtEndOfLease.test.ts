import { describe, expect, it } from "vitest";
import { getEstimatedMilesAtEndOfLease } from "~/lib/leases";

type MakeTestArgs = {
	leaseDaysElapsed: number;
	leaseDaysRemaining: number;
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
});

function makeTest({
	leaseDaysElapsed,
	leaseDaysRemaining,
	currentOdometerReading,
	expectedEstimatedMilesAtEndOfLease,
}: MakeTestArgs) {
	return it("should calculate the estimated miles at end of lease", () => {
		const estimatedMilesAtEndOfLease = getEstimatedMilesAtEndOfLease({
			leaseDaysElapsed,
			leaseDaysRemaining,
			currentOdometerReading,
		});

		expect(estimatedMilesAtEndOfLease).toBe(expectedEstimatedMilesAtEndOfLease);
	});
}

import { describe, expect, it } from "vitest";
import { getAverageMilesPerDay } from "~/lib/leases";

type MakeTestArgs = {
	leaseDaysElapsed: number;
	initialMiles: number;
	latestOdometerReading: number;
	expectedAverageMilesPerDay: number;
};

describe("getAverageMilesPerDay", () => {
	makeTest({
		leaseDaysElapsed: 0,
		initialMiles: 0,
		latestOdometerReading: 0,
		expectedAverageMilesPerDay: 0,
	});

	makeTest({
		leaseDaysElapsed: 1,
		initialMiles: 0,
		latestOdometerReading: 10,
		expectedAverageMilesPerDay: 10,
	});

	makeTest({
		leaseDaysElapsed: 10,
		initialMiles: 0,
		latestOdometerReading: 20,
		expectedAverageMilesPerDay: 2,
	});

	makeTest({
		leaseDaysElapsed: 3,
		initialMiles: 0,
		latestOdometerReading: 1,
		expectedAverageMilesPerDay: 0.33,
	});
});

function makeTest({
	leaseDaysElapsed,
	initialMiles,
	latestOdometerReading,
	expectedAverageMilesPerDay,
}: MakeTestArgs) {
	return it(`should return ${expectedAverageMilesPerDay} when leaseDaysElapsed is ${leaseDaysElapsed}, initialMiles is ${initialMiles}, latestOdometerReading is ${latestOdometerReading}`, () => {
		expect(
			getAverageMilesPerDay({
				leaseDaysElapsed,
				initialMiles,
				latestOdometerReading,
			}),
		).toBeCloseTo(expectedAverageMilesPerDay);
	});
}

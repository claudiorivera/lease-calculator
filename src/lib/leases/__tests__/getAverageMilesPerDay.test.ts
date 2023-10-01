import { describe, expect, it } from "vitest";
import { getAverageMilesPerDay } from "~/lib/leases";

type MakeTestArgs = {
	daysElapsed: number;
	initialMiles: number;
	currentOdometerReading: number;
	expectedAverageMilesPerDay: number;
};

describe("getAverageMilesPerDay", () => {
	makeTest({
		daysElapsed: 0,
		initialMiles: 0,
		currentOdometerReading: 0,
		expectedAverageMilesPerDay: 0,
	});

	makeTest({
		daysElapsed: 1,
		initialMiles: 0,
		currentOdometerReading: 10,
		expectedAverageMilesPerDay: 10,
	});

	makeTest({
		daysElapsed: 10,
		initialMiles: 0,
		currentOdometerReading: 20,
		expectedAverageMilesPerDay: 2,
	});

	makeTest({
		daysElapsed: 3,
		initialMiles: 0,
		currentOdometerReading: 1,
		expectedAverageMilesPerDay: 0.33,
	});
});

function makeTest({
	daysElapsed,
	initialMiles,
	currentOdometerReading,
	expectedAverageMilesPerDay,
}: MakeTestArgs) {
	return it(`should return ${expectedAverageMilesPerDay} when daysElapsed is ${daysElapsed}, initialMiles is ${initialMiles}, currentOdometerReading is ${currentOdometerReading}`, () => {
		expect(
			getAverageMilesPerDay({
				daysElapsed,
				initialMiles,
				currentOdometerReading,
			}),
		).toBeCloseTo(expectedAverageMilesPerDay);
	});
}

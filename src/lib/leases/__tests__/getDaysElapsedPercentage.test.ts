import { describe, expect, it } from "vitest";
import { getDaysElapsedPercentage } from "~/lib/leases";

type MakeTestArgs = {
	daysElapsed: number;
	totalLeaseDays: number;
	expectedDaysElapsedPercentage: number;
};

describe("getDaysElapsedPercentage", () => {
	makeTest({
		daysElapsed: 0,
		totalLeaseDays: 100,
		expectedDaysElapsedPercentage: 0,
	});

	makeTest({
		daysElapsed: 50,
		totalLeaseDays: 100,
		expectedDaysElapsedPercentage: 50,
	});

	makeTest({
		daysElapsed: 1,
		totalLeaseDays: 3,
		expectedDaysElapsedPercentage: 33,
	});

	makeTest({
		daysElapsed: 1,
		totalLeaseDays: 1,
		expectedDaysElapsedPercentage: 100,
	});

	makeTest({
		daysElapsed: 2,
		totalLeaseDays: 1,
		expectedDaysElapsedPercentage: 200,
	});
});

function makeTest({
	daysElapsed,
	totalLeaseDays,
	expectedDaysElapsedPercentage,
}: MakeTestArgs) {
	it(`should return ${expectedDaysElapsedPercentage} when daysElapsed is ${daysElapsed} and totalLeaseDays is ${totalLeaseDays}`, () => {
		const daysElapsedPercentage = getDaysElapsedPercentage({
			daysElapsed,
			totalLeaseDays,
		});

		expect(daysElapsedPercentage).toBe(expectedDaysElapsedPercentage);
	});
}

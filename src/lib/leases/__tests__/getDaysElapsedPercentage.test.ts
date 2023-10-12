import { describe, expect, it } from "vitest";
import { getDaysElapsedPercentage } from "~/lib/leases";

type MakeTestArgs = {
	leaseDaysElapsed: number;
	totalLeaseDays: number;
	expectedDaysElapsedPercentage: number;
};

describe("getDaysElapsedPercentage", () => {
	makeTest({
		leaseDaysElapsed: 0,
		totalLeaseDays: 100,
		expectedDaysElapsedPercentage: 0,
	});

	makeTest({
		leaseDaysElapsed: 50,
		totalLeaseDays: 100,
		expectedDaysElapsedPercentage: 50,
	});

	makeTest({
		leaseDaysElapsed: 1,
		totalLeaseDays: 3,
		expectedDaysElapsedPercentage: 33,
	});

	makeTest({
		leaseDaysElapsed: 1,
		totalLeaseDays: 1,
		expectedDaysElapsedPercentage: 100,
	});

	makeTest({
		leaseDaysElapsed: 2,
		totalLeaseDays: 1,
		expectedDaysElapsedPercentage: 200,
	});
});

function makeTest({
	leaseDaysElapsed,
	totalLeaseDays,
	expectedDaysElapsedPercentage,
}: MakeTestArgs) {
	it(`should return ${expectedDaysElapsedPercentage} when leaseDaysElapsed is ${leaseDaysElapsed} and totalLeaseDays is ${totalLeaseDays}`, () => {
		const daysElapsedPercentage = getDaysElapsedPercentage({
			leaseDaysElapsed,
			totalLeaseDays,
		});

		expect(daysElapsedPercentage).toBe(expectedDaysElapsedPercentage);
	});
}

import { describe, expect, test } from "vitest";
import { getDaysElapsedPercentage } from "~/lib/leases";

describe("getDaysElapsedPercentage", () => {
	test.each([
		{
			leaseDaysElapsed: 0,
			totalLeaseDays: 100,
			expectedDaysElapsedPercentage: 0,
		},
		{
			leaseDaysElapsed: 50,
			totalLeaseDays: 100,
			expectedDaysElapsedPercentage: 50,
		},
		{
			leaseDaysElapsed: 1,
			totalLeaseDays: 3,
			expectedDaysElapsedPercentage: 33,
		},
		{
			leaseDaysElapsed: 1,
			totalLeaseDays: 1,
			expectedDaysElapsedPercentage: 100,
		},
		{
			leaseDaysElapsed: 2,
			totalLeaseDays: 1,
			expectedDaysElapsedPercentage: 200,
		},
	])(
		"should return $expectedDaysElapsedPercentage when leaseDaysElapsed is $leaseDaysElapsed and totalLeaseDays is $totalLeaseDays",
		({ leaseDaysElapsed, totalLeaseDays, expectedDaysElapsedPercentage }) => {
			const daysElapsedPercentage = getDaysElapsedPercentage({
				leaseDaysElapsed,
				totalLeaseDays,
			});

			expect(daysElapsedPercentage).toBe(expectedDaysElapsedPercentage);
		},
	);
});

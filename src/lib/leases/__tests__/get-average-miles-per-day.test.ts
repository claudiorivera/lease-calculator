import { describe, expect, it, test } from "vitest";
import { getAverageMilesPerDay } from "~/lib/leases";

describe("getAverageMilesPerDay", () => {
	test.each([
		{
			leaseDaysElapsed: 0,
			initialMiles: 0,
			latestOdometerReading: 0,
			expectedAverageMilesPerDay: 0,
		},
		{
			leaseDaysElapsed: 1,
			initialMiles: 0,
			latestOdometerReading: 10,
			expectedAverageMilesPerDay: 10,
		},
		{
			leaseDaysElapsed: 10,
			initialMiles: 0,
			latestOdometerReading: 20,
			expectedAverageMilesPerDay: 2,
		},
		{
			leaseDaysElapsed: 3,
			initialMiles: 0,
			latestOdometerReading: 1,
			expectedAverageMilesPerDay: 0.33,
		},
	])(
		"should return $expectedAverageMilesPerDay when leaseDaysElapsed is $leaseDaysElapsed, initialMiles is $initialMiles, latestOdometerReading is $latestOdometerReading",
		({
			leaseDaysElapsed,
			initialMiles,
			latestOdometerReading,
			expectedAverageMilesPerDay,
		}) => {
			expect(
				getAverageMilesPerDay({
					leaseDaysElapsed,
					initialMiles,
					latestOdometerReading,
				}),
			).toBeCloseTo(expectedAverageMilesPerDay);
		},
	);
});

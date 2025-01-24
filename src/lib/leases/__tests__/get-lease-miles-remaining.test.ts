import { describe, expect, test } from "vitest";
import { getLeaseMilesRemaining } from "~/lib/leases";

describe("getLeaseMilesRemaining", () => {
	test.each([
		{
			initialMiles: 0,
			allowedMiles: 100,
			latestOdometerReading: 0,
			expectedLeaseMilesRemaining: 100,
		},
		{
			initialMiles: 100,
			allowedMiles: 100,
			latestOdometerReading: 0,
			expectedLeaseMilesRemaining: 200,
		},
	])(
		"should return $expectedLeaseMilesRemaining when initial miles is $initialMiles and allowed miles is $allowedMiles and latest odometer reading is $latestOdometerReading",
		({
			initialMiles,
			allowedMiles,
			latestOdometerReading,
			expectedLeaseMilesRemaining,
		}) => {
			const leaseMilesRemaining = getLeaseMilesRemaining({
				initialMiles,
				allowedMiles,
				latestOdometerReading,
			});

			expect(leaseMilesRemaining).toBe(expectedLeaseMilesRemaining);
		},
	);
});

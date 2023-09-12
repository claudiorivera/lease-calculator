import { describe, expect, it } from "vitest";
import { getLeaseMilesRemaining } from "~/lib/leases";

type MakeTestArgs = {
	initialMiles: number;
	allowedMiles: number;
	latestOdometerReading: number;
	expectedLeaseMilesRemaining: number;
};

describe("getLeaseMilesRemaining", () => {
	makeTest({
		initialMiles: 0,
		allowedMiles: 100,
		latestOdometerReading: 0,
		expectedLeaseMilesRemaining: 100,
	});

	makeTest({
		initialMiles: 100,
		allowedMiles: 100,
		latestOdometerReading: 0,
		expectedLeaseMilesRemaining: 200,
	});

	it("should return 100 when there are no odometer readings and initial miles is 100", () => {
		const leaseMilesRemaining = getLeaseMilesRemaining({
			initialMiles: 100,
			allowedMiles: 100,
			odometerReadings: [],
		});

		expect(leaseMilesRemaining).toBe(100);
	});
});

function makeTest({
	initialMiles,
	allowedMiles,
	latestOdometerReading,
	expectedLeaseMilesRemaining,
}: MakeTestArgs) {
	return it(`should return ${expectedLeaseMilesRemaining} when initial miles is ${initialMiles} and allowed miles is ${allowedMiles} and latest odometer reading is ${latestOdometerReading}`, () => {
		const leaseMilesRemaining = getLeaseMilesRemaining({
			initialMiles,
			allowedMiles,
			odometerReadings: [
				{
					createdAt: new Date(),
					miles: latestOdometerReading,
				},
			],
		});

		expect(leaseMilesRemaining).toBe(expectedLeaseMilesRemaining);
	});
}

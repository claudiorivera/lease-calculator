import { describe, expect, test } from "vitest";
import { getLatestOdometerReading } from "~/lib/leases";

describe("getLatestOdometerReading", () => {
	test.each([
		{
			initialMiles: 0,
			odometerReadings: [],
			expectedLatestOdometerReading: 0,
		},
		{
			initialMiles: 100,
			odometerReadings: [],
			expectedLatestOdometerReading: 100,
		},
		{
			initialMiles: 100,
			odometerReadings: [
				{
					createdAt: new Date(),
					miles: 101,
				},
			],
			expectedLatestOdometerReading: 101,
		},
		{
			initialMiles: 100,
			odometerReadings: [
				{
					createdAt: new Date(),
					miles: 0,
				},
			],
			expectedLatestOdometerReading: 0,
		},
	])(
		"should return $expectedLatestOdometerReading when initial miles is $initialMiles and odometer readings are $odometerReadings",
		({ initialMiles, odometerReadings, expectedLatestOdometerReading }) => {
			const latestOdometerReading = getLatestOdometerReading({
				odometerReadings,
				initialMiles,
			});

			expect(latestOdometerReading).toBe(expectedLatestOdometerReading);
		},
	);
});

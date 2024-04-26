import { describe, expect, it } from "bun:test";
import { getLatestOdometerReading } from "~/lib/leases";
import type { LeaseByIdOutput } from "~/server/api/routers/lease";

type MakeTestArgs = {
	odometerReadings: LeaseByIdOutput["odometerReadings"];
	initialMiles: number;
	expectedLatestOdometerReading: number;
};

describe("getLatestOdometerReading", () => {
	makeTest({
		initialMiles: 0,
		odometerReadings: [],
		expectedLatestOdometerReading: 0,
	});

	makeTest({
		initialMiles: 100,
		odometerReadings: [],
		expectedLatestOdometerReading: 100,
	});

	makeTest({
		initialMiles: 100,
		odometerReadings: [
			{
				createdAt: new Date(),
				miles: 101,
			},
		],
		expectedLatestOdometerReading: 101,
	});

	makeTest({
		initialMiles: 100,
		odometerReadings: [
			{
				createdAt: new Date(),
				miles: 0,
			},
		],
		expectedLatestOdometerReading: 0,
	});
});

function makeTest({
	odometerReadings,
	initialMiles,
	expectedLatestOdometerReading,
}: MakeTestArgs) {
	return it(`should return ${expectedLatestOdometerReading} when initial miles is ${initialMiles} and odometer readings are ${JSON.stringify(
		odometerReadings,
	)}`, () => {
		const latestOdometerReading = getLatestOdometerReading({
			odometerReadings,
			initialMiles,
		});

		expect(latestOdometerReading).toBe(expectedLatestOdometerReading);
	});
}

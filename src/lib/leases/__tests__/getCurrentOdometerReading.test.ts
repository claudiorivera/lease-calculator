import { describe, expect, it } from "vitest";
import { getCurrentOdometerReading } from "~/lib/leases";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

type MakeTestArgs = {
	odometerReadings: LeaseByIdOutput["odometerReadings"];
	initialMiles: number;
	expectedCurrentOdometerReading: number;
};

describe("getCurrentOdometerReading", () => {
	makeTest({
		initialMiles: 0,
		odometerReadings: [],
		expectedCurrentOdometerReading: 0,
	});

	makeTest({
		initialMiles: 100,
		odometerReadings: [],
		expectedCurrentOdometerReading: 100,
	});

	makeTest({
		initialMiles: 100,
		odometerReadings: [
			{
				createdAt: new Date(),
				miles: 101,
			},
		],
		expectedCurrentOdometerReading: 101,
	});

	makeTest({
		initialMiles: 100,
		odometerReadings: [
			{
				createdAt: new Date(),
				miles: 0,
			},
		],
		expectedCurrentOdometerReading: 0,
	});
});

function makeTest({
	odometerReadings,
	initialMiles,
	expectedCurrentOdometerReading,
}: MakeTestArgs) {
	return it(`should return ${expectedCurrentOdometerReading} when initial miles is ${initialMiles} and odometer readings are ${JSON.stringify(
		odometerReadings,
	)}`, () => {
		const currentOdometerReading = getCurrentOdometerReading({
			odometerReadings,
			initialMiles,
		});

		expect(currentOdometerReading).toBe(expectedCurrentOdometerReading);
	});
}

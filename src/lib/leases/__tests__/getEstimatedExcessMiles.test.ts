import { describe, expect, it } from "vitest";
import { getEstimatedExcessMiles } from "~/lib/leases";

type MakeTestArgs = {
	estimatedMilesAtEndOfLease: number;
	initialMiles: number;
	allowedMiles: number;
	expectedEstimatedExcessMiles: number;
};

describe("getEstimatedExcessMiles", () => {
	makeTest({
		estimatedMilesAtEndOfLease: 0,
		initialMiles: 0,
		allowedMiles: 0,
		expectedEstimatedExcessMiles: 0,
	});

	makeTest({
		estimatedMilesAtEndOfLease: 100,
		initialMiles: 0,
		allowedMiles: 0,
		expectedEstimatedExcessMiles: 100,
	});

	makeTest({
		estimatedMilesAtEndOfLease: 10,
		initialMiles: 0,
		allowedMiles: 50,
		expectedEstimatedExcessMiles: -40,
	});
});

function makeTest({
	estimatedMilesAtEndOfLease,
	initialMiles,
	allowedMiles,
	expectedEstimatedExcessMiles,
}: MakeTestArgs) {
	return it(`should return ${expectedEstimatedExcessMiles} when estimatedMilesAtEndOfLease is ${estimatedMilesAtEndOfLease} and initialMiles is ${initialMiles} and allowedMiles is ${allowedMiles}`, () => {
		expect(
			getEstimatedExcessMiles({
				estimatedMilesAtEndOfLease,
				initialMiles,
				allowedMiles,
			}),
		).toBe(expectedEstimatedExcessMiles);
	});
}

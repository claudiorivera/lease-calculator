import { describe, expect, it } from "vitest";
import { getEstimatedTotalFeesAtEndOfLease } from "~/lib/leases";

type MakeTestArgs = {
	estimatedExcessMiles: number;
	excessFeePerMileInCents: number;
	expectedEstimatedTotalFeesAtEndOfLease: number;
};

describe("getEstimatedTotalFeesAtEndOfLease", () => {
	makeTest({
		estimatedExcessMiles: 100,
		excessFeePerMileInCents: 10,
		expectedEstimatedTotalFeesAtEndOfLease: 1000,
	});

	makeTest({
		estimatedExcessMiles: -100,
		excessFeePerMileInCents: 10,
		expectedEstimatedTotalFeesAtEndOfLease: 0,
	});
});

function makeTest({
	estimatedExcessMiles,
	excessFeePerMileInCents,
	expectedEstimatedTotalFeesAtEndOfLease,
}: MakeTestArgs) {
	return it(`should return ${expectedEstimatedTotalFeesAtEndOfLease} when estimatedExcessMiles is ${estimatedExcessMiles} and excessFeePerMileInCents is ${excessFeePerMileInCents}`, () => {
		expect(
			getEstimatedTotalFeesAtEndOfLease({
				estimatedExcessMiles,
				excessFeePerMileInCents,
			}),
		).toBe(expectedEstimatedTotalFeesAtEndOfLease);
	});
}

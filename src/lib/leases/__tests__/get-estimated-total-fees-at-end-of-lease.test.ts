import { describe, expect, test } from "vitest";
import { getEstimatedTotalFeesAtEndOfLease } from "~/lib/leases";

describe("getEstimatedTotalFeesAtEndOfLease", () => {
	test.each([
		{
			estimatedExcessMiles: 100,
			excessFeePerMileInCents: 10,
			expectedEstimatedTotalFeesAtEndOfLease: 1000,
		},
		{
			estimatedExcessMiles: -100,
			excessFeePerMileInCents: 10,
			expectedEstimatedTotalFeesAtEndOfLease: 0,
		},
	])(
		"should return $expectedEstimatedTotalFeesAtEndOfLease when estimatedExcessMiles is $estimatedExcessMiles and excessFeePerMileInCents is $excessFeePerMileInCents",
		({
			estimatedExcessMiles,
			excessFeePerMileInCents,
			expectedEstimatedTotalFeesAtEndOfLease,
		}) => {
			expect(
				getEstimatedTotalFeesAtEndOfLease({
					estimatedExcessMiles,
					excessFeePerMileInCents,
				}),
			).toBe(expectedEstimatedTotalFeesAtEndOfLease);
		},
	);
});

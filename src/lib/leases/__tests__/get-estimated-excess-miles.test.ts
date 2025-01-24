import { describe, expect, test } from "vitest";
import { getEstimatedExcessMiles } from "~/lib/leases";

describe("getEstimatedExcessMiles", () => {
	test.each([
		{
			estimatedMilesAtEndOfLease: 0,
			initialMiles: 0,
			allowedMiles: 0,
			expectedEstimatedExcessMiles: 0,
		},
		{
			estimatedMilesAtEndOfLease: 100,
			initialMiles: 0,
			allowedMiles: 0,
			expectedEstimatedExcessMiles: 100,
		},
		{
			estimatedMilesAtEndOfLease: 10,
			initialMiles: 0,
			allowedMiles: 50,
			expectedEstimatedExcessMiles: -40,
		},
	])(
		"should return $expectedEstimatedExcessMiles when estimatedMilesAtEndOfLease is $estimatedMilesAtEndOfLease and initialMiles is $initialMiles and allowedMiles is $allowedMiles",
		({
			estimatedMilesAtEndOfLease,
			initialMiles,
			allowedMiles,
			expectedEstimatedExcessMiles,
		}) => {
			expect(
				getEstimatedExcessMiles({
					estimatedMilesAtEndOfLease,
					initialMiles,
					allowedMiles,
				}),
			).toBe(expectedEstimatedExcessMiles);
		},
	);
});

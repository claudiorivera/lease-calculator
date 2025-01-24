import MockDate from "mockdate";
import { afterEach, describe, expect, it, test } from "vitest";
import { getLastDay, getNumberOfDays } from "~/lib/dates";
import { getAllowedMilesToDate, getLeaseDaysElapsed } from "~/lib/leases";

describe("getAllowedMilesToDate", () => {
	afterEach(() => {
		MockDate.reset();
	});

	test.each([
		{
			startDate: "2020-01-01",
			today: "2020-01-02",
			allowedMiles: 31,
			initialMiles: 0,
			numberOfMonths: 1,
			expectedAllowedMilesToDate: 1,
		},
		{
			startDate: "2020-01-01",
			today: "2020-12-31",
			allowedMiles: 365,
			initialMiles: 0,
			numberOfMonths: 12,
			expectedAllowedMilesToDate: 364,
		},
		{
			startDate: "2020-01-01",
			today: "2021-01-01",
			allowedMiles: 365,
			initialMiles: 0,
			numberOfMonths: 12,
			expectedAllowedMilesToDate: 365,
		},
		{
			startDate: "2020-01-01",
			today: "2020-01-01",
			allowedMiles: 100,
			initialMiles: 100,
			numberOfMonths: 1,
			expectedAllowedMilesToDate: 100,
		},
		{
			startDate: "2020-01-01",
			today: "2020-01-31",
			allowedMiles: 31,
			initialMiles: 100,
			numberOfMonths: 1,
			expectedAllowedMilesToDate: 130,
		},
	])(
		"should return $expectedAllowedMilesToDate when start date is $startDate and today is $today and allowed miles is $allowedMiles and number of months is $numberOfMonths",
		({
			startDate,
			today,
			allowedMiles,
			initialMiles,
			numberOfMonths,
			expectedAllowedMilesToDate,
		}) => {
			MockDate.set(today);
			const leaseDaysElapsed = getLeaseDaysElapsed({
				startDate: new Date(startDate),
			});

			const totalLeaseDays = getNumberOfDays({
				start: new Date(startDate),
				end: getLastDay({
					startDate: new Date(startDate),
					numberOfMonths,
				}),
			});

			const allowedMilesToDate = getAllowedMilesToDate({
				allowedMiles,
				initialMiles,
				leaseDaysElapsed,
				totalLeaseDays,
			});

			expect(allowedMilesToDate).toBe(expectedAllowedMilesToDate);
		},
	);
});

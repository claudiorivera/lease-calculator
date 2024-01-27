import { afterEach, describe, expect, it } from "bun:test";
import MockDate from "mockdate";
import { getLastDay, getNumberOfDays } from "~/lib/dates";
import { getAllowedMilesToDate, getLeaseDaysElapsed } from "~/lib/leases";

type MakeTestArgs = {
	startDate: string;
	today: string;
	initialMiles?: number;
	allowedMiles: number;
	numberOfMonths: number;
	expectedAllowedMilesToDate: number;
};

describe("getAllowedMilesToDate", () => {
	afterEach(() => {
		MockDate.reset();
	});

	makeTest({
		startDate: "2020-01-01",
		today: "2020-01-02",
		allowedMiles: 31,
		numberOfMonths: 1,
		expectedAllowedMilesToDate: 1,
	});

	makeTest({
		startDate: "2020-01-01",
		today: "2020-12-31",
		allowedMiles: 365,
		numberOfMonths: 12,
		expectedAllowedMilesToDate: 364,
	});

	makeTest({
		startDate: "2020-01-01",
		today: "2021-01-01",
		allowedMiles: 365,
		numberOfMonths: 12,
		expectedAllowedMilesToDate: 365,
	});

	makeTest({
		startDate: "2020-01-01",
		today: "2020-01-01",
		allowedMiles: 100,
		initialMiles: 100,
		numberOfMonths: 1,
		expectedAllowedMilesToDate: 100,
	});

	makeTest({
		startDate: "2020-01-01",
		today: "2020-01-31",
		allowedMiles: 31,
		initialMiles: 100,
		numberOfMonths: 1,
		expectedAllowedMilesToDate: 130,
	});
});

function makeTest({
	startDate,
	today,
	allowedMiles,
	initialMiles = 0,
	numberOfMonths,
	expectedAllowedMilesToDate,
}: MakeTestArgs) {
	return it(`should return ${expectedAllowedMilesToDate} when start date is ${startDate} and today is ${today} and allowed miles is ${allowedMiles} and number of months is ${numberOfMonths}`, () => {
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
	});
}

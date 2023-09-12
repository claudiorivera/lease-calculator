import MockDate from "mockdate";
import { afterEach, describe, expect, it } from "vitest";
import { getLeaseDaysRemaining } from "~/lib/leases";

type MakeTestArgs = {
	startDate: string;
	totalLeaseDays: number;
	today: string;
	expectedLeaseDaysRemaining: number;
};

describe("getLeaseDaysRemaining", () => {
	afterEach(() => {
		MockDate.reset();
	});

	makeTest({
		startDate: "2023-01-01",
		totalLeaseDays: 365,
		today: "2023-01-01",
		expectedLeaseDaysRemaining: 365,
	});

	makeTest({
		startDate: "2023-01-02",
		totalLeaseDays: 365,
		today: "2023-01-01",
		expectedLeaseDaysRemaining: 366,
	});

	makeTest({
		startDate: "2023-01-01",
		totalLeaseDays: 1,
		today: "2023-01-03",
		expectedLeaseDaysRemaining: -1,
	});
});

function makeTest({
	startDate,
	totalLeaseDays,
	today,
	expectedLeaseDaysRemaining,
}: MakeTestArgs) {
	return it(`should return ${expectedLeaseDaysRemaining} when start date is ${startDate} and total lease days is ${totalLeaseDays} and today is ${today}`, () => {
		MockDate.set(today);

		const actualLeaseDaysRemaining = getLeaseDaysRemaining({
			startDate: new Date(startDate),
			totalLeaseDays,
		});

		expect(actualLeaseDaysRemaining).toBe(expectedLeaseDaysRemaining);
	});
}

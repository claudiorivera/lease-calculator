import MockDate from "mockdate";
import { afterEach, describe, expect, it } from "vitest";
import { getLastDay, getNumberOfDays } from "~/lib/dates";
import { getLeaseDaysRemaining, getLeaseMilesRemaining } from "~/lib/leases";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

type BaseTestLease = Pick<
	LeaseByIdOutput,
	"id" | "name" | "userId" | "excessFeePerMileInCents"
>;

type MakeTestArgs = {
	baseTestLease: BaseTestLease;
	startDate: string;
	initialMiles?: number;
	numberOfMonths: number;
	today: string;
	expectedLeaseDaysRemaining: number;
	allowedMiles: number;
	latestOdometerReadingMiles: number;
	expectedLeaseMilesRemaining: number;
};

describe("getLeaseProgress", () => {
	const baseTestLease: BaseTestLease = {
		id: "1",
		name: "Test Lease",
		userId: "1",
		excessFeePerMileInCents: 0,
	};

	afterEach(() => {
		MockDate.reset();
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		numberOfMonths: 12,
		today: "2023-12-31",
		expectedLeaseDaysRemaining: 1,
		allowedMiles: 0,
		latestOdometerReadingMiles: 0,
		expectedLeaseMilesRemaining: 0,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		numberOfMonths: 12,
		today: "2023-01-01",
		expectedLeaseDaysRemaining: 365,
		allowedMiles: 0,
		latestOdometerReadingMiles: 0,
		expectedLeaseMilesRemaining: 0,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		numberOfMonths: 12,
		today: "2024-01-01",
		expectedLeaseDaysRemaining: 0,
		allowedMiles: 0,
		latestOdometerReadingMiles: 0,
		expectedLeaseMilesRemaining: 0,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		numberOfMonths: 12,
		today: "2023-12-31",
		expectedLeaseDaysRemaining: 1,
		allowedMiles: 100,
		latestOdometerReadingMiles: 50,
		expectedLeaseMilesRemaining: 50,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		numberOfMonths: 12,
		today: "2023-12-31",
		expectedLeaseDaysRemaining: 1,
		allowedMiles: 100,
		latestOdometerReadingMiles: 0,
		expectedLeaseMilesRemaining: 100,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		numberOfMonths: 12,
		today: "2023-12-31",
		expectedLeaseDaysRemaining: 1,
		allowedMiles: 100,
		latestOdometerReadingMiles: 100,
		expectedLeaseMilesRemaining: 0,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		numberOfMonths: 12,
		today: "2024-01-01",
		expectedLeaseDaysRemaining: 0,
		allowedMiles: 100,
		latestOdometerReadingMiles: 101,
		expectedLeaseMilesRemaining: -1,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		initialMiles: 100,
		numberOfMonths: 1,
		today: "2023-01-01",
		allowedMiles: 100,
		latestOdometerReadingMiles: 100,
		expectedLeaseDaysRemaining: 31,
		expectedLeaseMilesRemaining: 100,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		initialMiles: 100,
		numberOfMonths: 12,
		today: "2023-12-31",
		allowedMiles: 100,
		latestOdometerReadingMiles: 199,
		expectedLeaseDaysRemaining: 1,
		expectedLeaseMilesRemaining: 1,
	});
});

function makeTest({
	baseTestLease,
	startDate,
	initialMiles = 0,
	numberOfMonths,
	today,
	expectedLeaseDaysRemaining,
	allowedMiles,
	latestOdometerReadingMiles,
	expectedLeaseMilesRemaining,
}: MakeTestArgs) {
	return it(`should return ${expectedLeaseDaysRemaining} day(s) remaining and ${expectedLeaseMilesRemaining} miles remaining when lease started on ${startDate} and today is ${today} and odometer started with ${initialMiles} miles and now reads ${latestOdometerReadingMiles}`, () => {
		MockDate.set(new Date(today));

		const testLease: LeaseByIdOutput = {
			...baseTestLease,
			startDate: new Date(startDate),
			initialMiles,
			numberOfMonths,
			allowedMiles,
			odometerReadings: [
				{
					createdAt: new Date(today),
					miles: latestOdometerReadingMiles,
				},
			],
		};

		const leaseDaysRemaining = getLeaseDaysRemaining({
			startDate: testLease.startDate,
			totalLeaseDays: getNumberOfDays({
				start: testLease.startDate,
				end: getLastDay({
					startDate: testLease.startDate,
					numberOfMonths: testLease.numberOfMonths,
				}),
			}),
		});
		const leaseMilesRemaining = getLeaseMilesRemaining(testLease);

		expect(leaseDaysRemaining).toBe(expectedLeaseDaysRemaining);
		expect(leaseMilesRemaining).toBe(expectedLeaseMilesRemaining);
	});
}

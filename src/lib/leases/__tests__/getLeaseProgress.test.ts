import { afterEach, describe, expect, it } from "bun:test";
import MockDate from "mockdate";
import { getLeaseProgress } from "~/lib/leases";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

type BaseTestLease = Pick<LeaseByIdOutput, "id" | "name" | "userId">;

type MakeTestArgs = {
	baseTestLease: BaseTestLease;
	startDate: string;
	numberOfMonths: number;
	today: string;
	expectedLeaseDaysRemaining: number;
	allowedMiles: number;
	excessFeePerMileInCents: number;
	latestOdometerReadingMiles: number;
	expectedLeaseMilesRemaining: number;
};

describe("getLeaseProgress", () => {
	const baseTestLease = {
		id: "1",
		name: "Test Lease",
		userId: "1",
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
		allowedMiles: 100,
		excessFeePerMileInCents: 25,
		latestOdometerReadingMiles: 0,
		expectedLeaseMilesRemaining: 100,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		numberOfMonths: 12,
		today: "2023-01-01",
		expectedLeaseDaysRemaining: 365,
		allowedMiles: 100,
		excessFeePerMileInCents: 25,
		latestOdometerReadingMiles: 100,
		expectedLeaseMilesRemaining: 0,
	});

	makeTest({
		baseTestLease,
		startDate: "2023-01-01",
		numberOfMonths: 12,
		today: "2023-07-01",
		expectedLeaseDaysRemaining: 184,
		allowedMiles: 100,
		excessFeePerMileInCents: 25,
		latestOdometerReadingMiles: 50,
		expectedLeaseMilesRemaining: 50,
	});
});

function makeTest({
	baseTestLease,
	startDate,
	numberOfMonths,
	today,
	expectedLeaseDaysRemaining,
	allowedMiles,
	excessFeePerMileInCents,
	latestOdometerReadingMiles,
	expectedLeaseMilesRemaining,
}: MakeTestArgs) {
	return it(`
  should return ${expectedLeaseDaysRemaining} day(s) remaining and ${expectedLeaseMilesRemaining} miles remaining
  when start date is ${startDate}
  and when today is ${today} 
  and latest odometer reads ${latestOdometerReadingMiles}`, () => {
		MockDate.set(new Date(today));

		const testLease: LeaseByIdOutput = {
			...baseTestLease,
			startDate: new Date(startDate),
			numberOfMonths,
			allowedMiles,
			excessFeePerMileInCents,
			odometerReadings: [
				{
					date: new Date(today),
					miles: latestOdometerReadingMiles,
				},
			],
		};

		const { leaseDaysRemaining, leaseMilesRemaining } =
			getLeaseProgress(testLease);

		expect(leaseDaysRemaining).toBe(expectedLeaseDaysRemaining);
		expect(leaseMilesRemaining).toBe(expectedLeaseMilesRemaining);
	});
}

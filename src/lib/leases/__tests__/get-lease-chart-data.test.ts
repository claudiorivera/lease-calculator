import { describe, expect, it } from "bun:test";
import { getLeaseChartData } from "~/lib/leases";
import type { LeaseByIdOutput } from "~/server/api/routers/lease";

describe("getLeaseChartData", () => {
	it("works", () => {
		const lease = {
			id: "1",
			name: "Lease 1",
			userId: "1",
			excessFeePerMileInCents: 10,
			allowedMiles: 12,
			initialMiles: 0,
			numberOfMonths: 12,
			startDate: new Date("2020-01-01"),
			odometerReadings: [
				{
					createdAt: new Date("2020-06-01"),
					miles: 5,
				},
				{
					createdAt: new Date("2020-07-01"),
					miles: 6,
				},
			],
		} satisfies LeaseByIdOutput;

		const data = getLeaseChartData({
			lease,
		});

		expect(data).toEqual([
			{
				monthsSinceLeaseStart: 0,
				odometerReading: 0,
				expectedOdometerReading: 0,
			},
			{
				monthsSinceLeaseStart: 5,
				odometerReading: 5,
				expectedOdometerReading: 5,
			},
			{
				monthsSinceLeaseStart: 6,
				odometerReading: 6,
				expectedOdometerReading: 6,
			},
			{
				monthsSinceLeaseStart: 12,
				expectedOdometerReading: 12,
			},
		]);
	});
});

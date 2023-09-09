import { describe, expect, it } from "bun:test";
import { getLatestOdometerReading } from "~/lib/leases/getLatestOdometerReading";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

describe("getLatestOdometerReading", () => {
	it("should return the latest odometer reading, regardless of date", () => {
		const odometerReadings: LeaseByIdOutput["odometerReadings"] = [
			{
				date: new Date(),
				miles: 50,
			},
			{
				date: new Date("2020-01-01"),
				miles: 100,
			},
		];

		const latestOdometerReading = getLatestOdometerReading(odometerReadings);

		expect(latestOdometerReading).toBe(100);
	});
});

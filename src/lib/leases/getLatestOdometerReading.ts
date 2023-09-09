import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function getLatestOdometerReading(
	odometerReadings: LeaseByIdOutput["odometerReadings"],
) {
	const latestOdometerReading = Math.max(
		...odometerReadings.map(({ miles }) => miles),
	);

	return latestOdometerReading;
}

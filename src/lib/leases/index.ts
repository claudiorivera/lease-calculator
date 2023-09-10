import { getDaysSince } from "~/lib/dates";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function getEstimatedMilesAtEndOfLease({
	leaseDaysElapsed,
	leaseDaysRemaining,
	currentOdometerReading,
}: {
	leaseDaysElapsed: number;
	leaseDaysRemaining: number;
	currentOdometerReading: number;
}) {
	if (leaseDaysElapsed === 0) return currentOdometerReading;

	const averageMilesPerDay = currentOdometerReading / leaseDaysElapsed;

	return Math.ceil(
		averageMilesPerDay * leaseDaysRemaining + currentOdometerReading,
	);
}

export function getLeaseDaysElapsed({
	startDate,
}: Pick<LeaseByIdOutput, "startDate">) {
	return getDaysSince(startDate);
}

export function getLeaseDaysRemaining({
	startDate,
	totalLeaseDays,
}: {
	startDate: LeaseByIdOutput["startDate"];
	totalLeaseDays: number;
}) {
	const leaseDaysElapsed = getLeaseDaysElapsed({ startDate });

	return totalLeaseDays - leaseDaysElapsed;
}

export function getLeaseMilesRemaining({
	allowedMiles,
	odometerReadings,
}: Pick<LeaseByIdOutput, "allowedMiles" | "odometerReadings">) {
	const currentOdometerReading = getCurrentOdometerReading({
		odometerReadings,
	});

	return allowedMiles - currentOdometerReading;
}

export function getCurrentOdometerReading({
	odometerReadings,
}: {
	odometerReadings: LeaseByIdOutput["odometerReadings"];
}) {
	if (!odometerReadings.length) return 0;

	return odometerReadings.at(-1)?.miles ?? 0;
}

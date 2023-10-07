import { getDaysSince } from "~/lib/dates";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function getLeaseDaysElapsed({
	startDate,
}: Pick<LeaseByIdOutput, "startDate">) {
	return getDaysSince(startDate);
}

export function getLeaseMilesRemaining({
	initialMiles,
	allowedMiles,
	currentOdometerReading,
}: Pick<LeaseByIdOutput, "allowedMiles" | "initialMiles"> & {
	currentOdometerReading: number;
}) {
	return initialMiles + allowedMiles - currentOdometerReading;
}

export function getCurrentOdometerReading({
	odometerReadings,
	initialMiles,
}: Pick<LeaseByIdOutput, "odometerReadings" | "initialMiles">) {
	if (!odometerReadings.length) return initialMiles;

	return odometerReadings.at(-1)?.miles ?? 0;
}

export function getDaysElapsedPercentage({
	daysElapsed,
	totalLeaseDays,
}: {
	daysElapsed: number;
	totalLeaseDays: number;
}) {
	if (totalLeaseDays === 0) return 0;

	return Math.floor((daysElapsed / totalLeaseDays) * 100);
}

export function getAllowedMilesToDate({
	allowedMiles,
	initialMiles,
	leaseDaysElapsed,
	totalLeaseDays,
}: Pick<LeaseByIdOutput, "allowedMiles" | "initialMiles"> & {
	leaseDaysElapsed: number;
	totalLeaseDays: number;
}) {
	return (
		Math.floor((leaseDaysElapsed * allowedMiles) / totalLeaseDays) +
		initialMiles
	);
}

export function getAverageMilesPerDay({
	daysElapsed,
	initialMiles,
	currentOdometerReading,
}: {
	daysElapsed: number;
	initialMiles: number;
	currentOdometerReading: number;
}) {
	if (daysElapsed === 0) return 0;

	return (currentOdometerReading - initialMiles) / daysElapsed;
}

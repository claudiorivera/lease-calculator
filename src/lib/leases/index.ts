import { getDaysSince } from "~/lib/dates";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function getEstimatedMilesAtEndOfLease({
	leaseDaysElapsed,
	leaseDaysRemaining,
	initialMiles,
	currentOdometerReading,
}: {
	leaseDaysElapsed: number;
	leaseDaysRemaining: number;
	initialMiles: number;
	currentOdometerReading: number;
}) {
	if (leaseDaysElapsed === 0) return initialMiles;

	const averageMilesPerDay =
		(currentOdometerReading - initialMiles) / leaseDaysElapsed;

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
	initialMiles,
	allowedMiles,
	odometerReadings,
}: Pick<
	LeaseByIdOutput,
	"allowedMiles" | "odometerReadings" | "initialMiles"
>) {
	const currentOdometerReading = getCurrentOdometerReading({
		odometerReadings,
		initialMiles,
	});

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

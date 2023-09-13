import { getDaysSince, getLastDay, getNumberOfDays } from "~/lib/dates";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

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

export function getAllowedMilesToDate({
	startDate,
	numberOfMonths,
	allowedMiles,
	initialMiles,
}: Pick<
	LeaseByIdOutput,
	"startDate" | "numberOfMonths" | "allowedMiles" | "initialMiles"
>) {
	const leaseDaysElapsed = getLeaseDaysElapsed({
		startDate,
	});

	const totalLeaseDays = getNumberOfDays({
		start: startDate,
		end: getLastDay({
			startDate,
			numberOfMonths,
		}),
	});

	return (
		Math.floor((leaseDaysElapsed * allowedMiles) / totalLeaseDays) +
		initialMiles
	);
}

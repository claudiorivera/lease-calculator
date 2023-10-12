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
	latestOdometerReading,
}: Pick<LeaseByIdOutput, "allowedMiles" | "initialMiles"> & {
	latestOdometerReading: number;
}) {
	return initialMiles + allowedMiles - latestOdometerReading;
}

export function getLatestOdometerReading({
	odometerReadings,
	initialMiles,
}: Pick<LeaseByIdOutput, "odometerReadings" | "initialMiles">) {
	if (!odometerReadings.length) return initialMiles;

	return odometerReadings.at(-1)?.miles ?? 0;
}

export function getDaysElapsedPercentage({
	leaseDaysElapsed,
	totalLeaseDays,
}: {
	leaseDaysElapsed: number;
	totalLeaseDays: number;
}) {
	if (totalLeaseDays === 0) return 0;

	return Math.floor((leaseDaysElapsed / totalLeaseDays) * 100);
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
	leaseDaysElapsed,
	initialMiles,
	latestOdometerReading,
}: {
	leaseDaysElapsed: number;
	initialMiles: number;
	latestOdometerReading: number;
}) {
	if (leaseDaysElapsed === 0) return 0;

	return (latestOdometerReading - initialMiles) / leaseDaysElapsed;
}

export function getEstimatedTotalFeesAtEndOfLease({
	estimatedExcessMiles,
	excessFeePerMileInCents,
}: {
	estimatedExcessMiles: number;
	excessFeePerMileInCents: number;
}) {
	return Math.max(estimatedExcessMiles * excessFeePerMileInCents, 0);
}

export function getEstimatedExcessMiles({
	estimatedMilesAtEndOfLease,
	initialMiles,
	allowedMiles,
}: {
	estimatedMilesAtEndOfLease: number;
	initialMiles: number;
	allowedMiles: number;
}) {
	return estimatedMilesAtEndOfLease - initialMiles - allowedMiles;
}

export function getEstimatedMilesAtEndOfLease({
	averageMilesPerDay,
	leaseDaysRemaining,
	latestOdometerReading,
}: {
	averageMilesPerDay: number;
	leaseDaysRemaining: number;
	latestOdometerReading: number;
}) {
	return latestOdometerReading + averageMilesPerDay * leaseDaysRemaining;
}

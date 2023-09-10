import { getDaysSince, getDaysUntil, getLastDay } from "~/lib/dates";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function getEstimatedExcessMileageFeeInCents(lease: LeaseByIdOutput) {
	const currentOdometerReading = getCurrentOdometerReading(
		lease.odometerReadings,
	);

	const averageMilesPerDay =
		currentOdometerReading / getLeaseDaysElapsed(lease);

	const leaseDaysRemaining = getLeaseDaysRemaining(lease);

	const estimatedMilesAtLeaseEnd =
		averageMilesPerDay * leaseDaysRemaining + currentOdometerReading;

	const estimatedExcessMiles = estimatedMilesAtLeaseEnd - lease.allowedMiles;

	return estimatedExcessMiles * lease.excessFeePerMileInCents;
}

function getLeaseDaysElapsed({ startDate }: LeaseByIdOutput) {
	return getDaysSince(startDate);
}

export function getLeaseDaysRemaining({
	startDate,
	numberOfMonths,
}: LeaseByIdOutput) {
	const lastLeaseDay = getLastDay({
		startDate,
		numberOfMonths,
	});

	return getDaysUntil(lastLeaseDay);
}

export function getLeaseMilesRemaining({
	allowedMiles,
	odometerReadings,
}: LeaseByIdOutput) {
	const currentOdometerReading = getCurrentOdometerReading(odometerReadings);

	return allowedMiles - currentOdometerReading;
}

function getCurrentOdometerReading(
	odometerReadings: LeaseByIdOutput["odometerReadings"],
) {
	if (!odometerReadings.length) return 0;

	return odometerReadings.at(-1)?.miles ?? 0;
}

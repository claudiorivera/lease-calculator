import { getDaysUntil, getLastDay } from "~/lib/dates";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function getLeaseProgress({
	startDate,
	numberOfMonths,
	allowedMiles,
	odometerReadings,
}: LeaseByIdOutput) {
	const lastLeaseDay = getLastDay({
		startDate,
		numberOfMonths,
	});
	const leaseDaysRemaining = getDaysUntil(lastLeaseDay);
	const leaseMilesRemaining = getLeaseMilesRemaining({
		allowedMiles,
		odometerReadings,
	});

	return {
		leaseDaysRemaining,
		leaseMilesRemaining,
	};
}

function getLeaseMilesRemaining({
	allowedMiles,
	odometerReadings,
}: {
	allowedMiles: number;
	odometerReadings: LeaseByIdOutput["odometerReadings"];
}) {
	if (!odometerReadings.length) return allowedMiles;

	const currentOdometerReading = odometerReadings.at(-1);

	const leaseMilesRemaining =
		allowedMiles - (currentOdometerReading?.miles ?? 0);

	return leaseMilesRemaining;
}

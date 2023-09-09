import { getDaysUntil, getLastDay } from "~/lib/dates";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function getLeaseProgress({
	startDate,
	numberOfMonths,
	allowedMiles,
	odometerReadings,
}: LeaseByIdOutput) {
	return {
		leaseDaysRemaining: getLeaseDaysRemaining({
			startDate,
			numberOfMonths,
		}),
		leaseMilesRemaining: getLeaseMilesRemaining({
			allowedMiles,
			odometerReadings,
		}),
	};
}

function getLeaseDaysRemaining({
	startDate,
	numberOfMonths,
}: {
	startDate: LeaseByIdOutput["startDate"];
	numberOfMonths: LeaseByIdOutput["numberOfMonths"];
}) {
	const lastLeaseDay = getLastDay({
		startDate,
		numberOfMonths,
	});

	return getDaysUntil(lastLeaseDay);
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

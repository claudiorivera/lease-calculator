import { getLatestOdometerReading } from "~/lib/leases/getLatestOdometerReading";
import { getMilesProgress } from "~/lib/leases/getMilesProgress";
import { getTermProgress } from "~/lib/leases/getTermProgress";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function getLeaseProgress({
	startDate,
	numberOfMonths,
	allowedMiles,
	odometerReadings,
}: LeaseByIdOutput) {
	const termProgress = getTermProgress(startDate, numberOfMonths);
	const latestOdometerReading = getLatestOdometerReading(odometerReadings);
	const milesProgress = getMilesProgress(allowedMiles, latestOdometerReading);

	return {
		termProgress,
		milesProgress,
	};
}

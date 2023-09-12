import { Fragment } from "react";
import { getLastDay, getNumberOfDays } from "~/lib/dates";
import {
	getCurrentOdometerReading,
	getEstimatedMilesAtEndOfLease,
	getLeaseDaysElapsed,
	getLeaseDaysRemaining,
	getLeaseMilesRemaining,
} from "~/lib/leases";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";
import { type RouterOutputs } from "~/trpc/shared";

export function LeaseDetailsView({
	lease,
}: {
	lease: NonNullable<RouterOutputs["lease"]["byId"]>;
}) {
	const { allowedMiles, id } = lease;

	const {
		leaseDaysRemaining,
		leaseMilesRemaining,
		estimatedMilesAtEndOfLease,
	} = useLeaseDetails(lease);

	return (
		<Fragment>
			<section>
				<p>Days left:&nbsp;</p>
				<span>{leaseDaysRemaining}</span>
				<p>Miles left:&nbsp;</p>
				<span>{leaseMilesRemaining}</span>
				<p>Estimated miles at end of lease:&nbsp;</p>
				<span>{estimatedMilesAtEndOfLease}</span>
				<p>Estimated difference:&nbsp;</p>
				<span>{estimatedMilesAtEndOfLease - allowedMiles}</span>
			</section>

			<a href={`/leases/${id}/odometer-readings/new`}>
				Add an odometer reading
			</a>
		</Fragment>
	);
}

function useLeaseDetails(lease: LeaseByIdOutput) {
	const {
		startDate,
		numberOfMonths,
		allowedMiles,
		odometerReadings,
		initialMiles,
	} = lease;

	const leaseDaysRemaining = getLeaseDaysRemaining({
		startDate,
		totalLeaseDays: getNumberOfDays({
			start: startDate,
			end: getLastDay({
				startDate,
				numberOfMonths,
			}),
		}),
	});
	const leaseMilesRemaining = getLeaseMilesRemaining({
		initialMiles,
		allowedMiles,
		odometerReadings,
	});
	const estimatedMilesAtEndOfLease = getEstimatedMilesAtEndOfLease({
		leaseDaysElapsed: getLeaseDaysElapsed({
			startDate,
		}),
		initialMiles,
		currentOdometerReading: getCurrentOdometerReading({
			odometerReadings,
			initialMiles,
		}),
		leaseDaysRemaining,
	});

	return {
		leaseDaysRemaining,
		leaseMilesRemaining,
		estimatedMilesAtEndOfLease,
	};
}

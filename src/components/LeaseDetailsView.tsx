import { Fragment } from "react";
import { getLastDay, getNumberOfDays } from "~/lib/dates";
import {
	getCurrentOdometerReading,
	getEstimatedMilesAtEndOfLease,
	getLeaseDaysElapsed,
	getLeaseDaysRemaining,
	getLeaseMilesRemaining,
} from "~/lib/leases";
import { type RouterOutputs } from "~/trpc/shared";

export function LeaseDetailsView({
	lease,
}: {
	lease: NonNullable<RouterOutputs["lease"]["byId"]>;
}) {
	const {
		startDate,
		numberOfMonths,
		allowedMiles,
		odometerReadings,
		initialMiles,
		id,
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

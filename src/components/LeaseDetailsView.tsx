import { Fragment } from "react";
import { getLastDay, getNumberOfDays } from "~/lib/dates";
import {
	getCurrentOdometerReading,
	getEstimatedMilesAtEndOfLease,
	getLeaseDaysElapsed,
	getLeaseDaysRemaining,
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

	const totalLeaseDays = getNumberOfDays({
		start: startDate,
		end: getLastDay({
			startDate,
			numberOfMonths,
		}),
	});

	const leaseDaysRemaining = getLeaseDaysRemaining({
		startDate,
		totalLeaseDays,
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

	const estimatedMiles = estimatedMilesAtEndOfLease - allowedMiles;

	return (
		<Fragment>
			<div className="flex flex-col items-center rounded-full bg-neutral-100 p-4">
				<p className="text-2xl font-bold">{Math.abs(estimatedMiles)}</p>
				<p>
					miles{" "}
					<span className="font-semibold">
						{estimatedMiles > 0 ? "over" : "under"}
					</span>{" "}
					your allowance
				</p>
			</div>

			<a href={`/leases/${id}/odometer-readings/new`}>
				Add an odometer reading
			</a>
		</Fragment>
	);
}

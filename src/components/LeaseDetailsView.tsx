import Link from "next/link";
import { getLastDay, getNumberOfDays } from "~/lib/dates";
import {
	getCurrentOdometerReading,
	getDaysElapsedPercentage,
	getEstimatedMilesAtEndOfLease,
	getLeaseDaysElapsed,
	getLeaseDaysRemaining,
} from "~/lib/leases";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function LeaseDetailsView({
	lease,
}: {
	lease: NonNullable<LeaseByIdOutput>;
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

	const currentOdometerReading = getCurrentOdometerReading({
		odometerReadings,
		initialMiles,
	});

	const estimatedMilesAtEndOfLease = getEstimatedMilesAtEndOfLease({
		leaseDaysElapsed: getLeaseDaysElapsed({
			startDate,
		}),
		initialMiles,
		currentOdometerReading,
		leaseDaysRemaining,
	});

	const estimatedMiles = estimatedMilesAtEndOfLease - allowedMiles;

	const daysElapsedPercentage = getDaysElapsedPercentage({
		daysElapsed: totalLeaseDays - leaseDaysRemaining,
		totalLeaseDays,
	});

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col items-center">
				<h1 className="text-lg">Current Status</h1>
				<Link className="text-sm" href={`/leases/${id}/odometer-readings/new`}>
					Update Now
				</Link>
			</div>
			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center py-8">
					<p className="text-4xl font-black">{Math.abs(estimatedMiles)}</p>
					<p>
						miles{" "}
						<span className="font-semibold">
							{estimatedMiles > 0 ? "over" : "under"}
						</span>{" "}
						your allowance
					</p>
				</div>
				<p className="text-sm">
					<span className="font-semibold">{daysElapsedPercentage}%</span> of
					lease elapsed
				</p>
			</div>
			<div className="flex w-full justify-evenly py-8">
				<DisplayValueAndLabel
					label="Current Miles"
					value={currentOdometerReading}
				/>
				<div className="w-0.5 bg-neutral-100"></div>
				<DisplayValueAndLabel label="Allowed Miles" value={allowedMiles} />
				<div className="w-0.5 bg-neutral-100"></div>
				<DisplayValueAndLabel
					label="Days Remaining"
					value={leaseDaysRemaining}
				/>
			</div>
		</div>
	);
}

function DisplayValueAndLabel({
	value,
	label,
}: {
	value: number;
	label: string;
}) {
	return (
		<div>
			<div className="flex flex-col items-center">
				<p className="text-xl">{value}</p>
				<p className="text-sm">{label}</p>
			</div>
		</div>
	);
}

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getLastDay, getNumberOfDays } from "~/lib/dates";
import {
	getAllowedMilesToDate,
	getCurrentOdometerReading,
	getDaysElapsedPercentage,
	getLeaseDaysRemaining,
} from "~/lib/leases";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function LeaseDetailsView({ lease }: { lease: LeaseByIdOutput }) {
	const {
		estimatedMilesToDate,
		daysElapsedPercentage,
		currentOdometerReading,
		allowedMilesToDate,
		leaseDaysRemaining,
	} = getLeaseProgress(lease);

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col items-center">
				<h1 className="text-lg">Current Status</h1>
				<Button asChild variant="ghost">
					<Link
						className="text-sm"
						href={`/leases/${lease.id}/odometer-readings/new`}
					>
						Update Now
					</Link>
				</Button>
			</div>
			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center py-8">
					<p className="text-4xl font-black">
						{Math.abs(estimatedMilesToDate)}
					</p>
					<p>
						miles{" "}
						<span className="font-semibold">
							{estimatedMilesToDate > 0 ? "over" : "under"}
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
				<DisplayValueAndLabel
					label="Allowed Miles"
					value={allowedMilesToDate}
				/>
				<div className="w-0.5 bg-neutral-100"></div>
				<DisplayValueAndLabel
					label="Days Remaining"
					value={leaseDaysRemaining}
				/>
			</div>
		</div>
	);
}

function getLeaseProgress({
	startDate,
	numberOfMonths,
	allowedMiles,
	odometerReadings,
	initialMiles,
}: Omit<
	LeaseByIdOutput,
	"name" | "excessFeePerMileInCents" | "id" | "userId"
>) {
	const endDate = getLastDay({
		startDate,
		numberOfMonths,
	});

	const totalLeaseDays = getNumberOfDays({
		start: startDate,
		end: endDate,
	});

	const leaseDaysRemaining = getLeaseDaysRemaining({
		startDate,
		totalLeaseDays,
	});

	const currentOdometerReading = getCurrentOdometerReading({
		odometerReadings,
		initialMiles,
	});

	const daysElapsedPercentage = getDaysElapsedPercentage({
		daysElapsed: totalLeaseDays - leaseDaysRemaining,
		totalLeaseDays,
	});

	const allowedMilesToDate = getAllowedMilesToDate({
		allowedMiles,
		numberOfMonths,
		startDate,
		initialMiles,
	});

	const estimatedMilesToDate = currentOdometerReading - allowedMilesToDate;

	return {
		estimatedMilesToDate,
		daysElapsedPercentage,
		currentOdometerReading,
		allowedMilesToDate,
		leaseDaysRemaining,
	};
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

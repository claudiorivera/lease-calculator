import Link from "next/link";
import { DeleteLeaseButton } from "~/components/DeleteLeaseButton";
import { MilesDisplay } from "~/components/LeaseDetailsMilesDisplay";
import { LeaseStats } from "~/components/LeaseDetailsStats";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { getLastDay, getNumberOfDays } from "~/lib/dates";
import {
	getAllowedMilesToDate,
	getAverageMilesPerDay,
	getDaysElapsedPercentage,
	getEstimatedExcessMiles,
	getEstimatedMilesAtEndOfLease,
	getEstimatedTotalFeesAtEndOfLease,
	getLatestOdometerReading,
	getLeaseDaysElapsed,
} from "~/lib/leases";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";

export function LeaseDetailsView({ lease }: { lease: LeaseByIdOutput }) {
	const {
		milesOverOrUnder,
		daysElapsedPercentage,
		latestOdometerReading,
		allowedMilesToDate,
		leaseDaysRemaining,
		estimatedFeesAtEndOfLease,
		estimatedExcessMiles,
	} = getLeaseProgress(lease);

	return (
		<div className="flex flex-col items-center gap-6">
			<section className="flex flex-col items-center">
				<p className="py-1 text-xl font-semibold">Current Status</p>
				<Button asChild variant="link">
					<Link href={`/leases/${lease.id}/odometer-readings/new`}>
						Update Now
					</Link>
				</Button>
			</section>

			<MilesDisplay
				daysElapsedPercentage={daysElapsedPercentage}
				milesOverOrUnder={milesOverOrUnder}
			/>

			<LeaseStats
				allowedMilesToDate={allowedMilesToDate}
				latestOdometerReading={latestOdometerReading}
				leaseDaysRemaining={leaseDaysRemaining}
			/>

			<Separator />

			<section className="flex w-full flex-col items-center gap-4">
				<p className="text-xl font-semibold">Predictions</p>
				<div className="w-full rounded bg-neutral-200 p-8 text-center dark:bg-neutral-800">
					<p className="text-6xl font-black">
						${(estimatedFeesAtEndOfLease / 100).toFixed(2)}
					</p>
					<div className="h-4"></div>
					<p>
						total fees{" "}
						<span className="font-semibold">
							with {Math.abs(Math.round(estimatedExcessMiles))} miles{" "}
							{estimatedExcessMiles > 0 ? "over" : "under"}
						</span>{" "}
						your allowance at{" "}
						<span className="font-semibold">
							${(lease.excessFeePerMileInCents / 100).toFixed(2)} per mile
						</span>
					</p>
				</div>
			</section>

			<Separator />

			<section className="flex w-full justify-evenly">
				<DeleteLeaseButton leaseId={lease.id} />
			</section>
		</div>
	);
}

function getLeaseProgress({
	startDate,
	numberOfMonths,
	allowedMiles,
	odometerReadings,
	initialMiles,
	excessFeePerMileInCents,
}: Omit<LeaseByIdOutput, "name" | "id" | "userId">) {
	const endDate = getLastDay({
		startDate,
		numberOfMonths,
	});

	const totalLeaseDays = getNumberOfDays({
		start: startDate,
		end: endDate,
	});

	const leaseDaysElapsed = getLeaseDaysElapsed({ startDate });

	const leaseDaysRemaining = totalLeaseDays - leaseDaysElapsed;

	const latestOdometerReading = getLatestOdometerReading({
		odometerReadings,
		initialMiles,
	});

	const daysElapsedPercentage = getDaysElapsedPercentage({
		leaseDaysElapsed: totalLeaseDays - leaseDaysRemaining,
		totalLeaseDays,
	});

	const allowedMilesToDate = getAllowedMilesToDate({
		allowedMiles,
		initialMiles,
		leaseDaysElapsed,
		totalLeaseDays,
	});

	const milesOverOrUnder = latestOdometerReading - allowedMilesToDate;

	const averageMilesPerDay = getAverageMilesPerDay({
		latestOdometerReading,
		leaseDaysElapsed: leaseDaysElapsed,
		initialMiles,
	});

	const estimatedMilesAtEndOfLease = getEstimatedMilesAtEndOfLease({
		averageMilesPerDay,
		latestOdometerReading,
		leaseDaysRemaining,
	});

	const estimatedExcessMiles = getEstimatedExcessMiles({
		allowedMiles,
		estimatedMilesAtEndOfLease,
		initialMiles,
	});

	const estimatedFeesAtEndOfLease = getEstimatedTotalFeesAtEndOfLease({
		estimatedExcessMiles,
		excessFeePerMileInCents,
	});

	return {
		milesOverOrUnder,
		daysElapsedPercentage,
		latestOdometerReading,
		allowedMilesToDate,
		leaseDaysRemaining,
		estimatedFeesAtEndOfLease,
		estimatedExcessMiles,
	};
}

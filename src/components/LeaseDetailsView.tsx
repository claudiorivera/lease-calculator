import Link from "next/link";
import { DeleteLeaseButton } from "~/components/DeleteLeaseButton";
import { MilesDisplay } from "~/components/LeaseDetailsMilesDisplay";
import { LeaseStats } from "~/components/LeaseDetailsStats";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
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
				estimatedMilesToDate={estimatedMilesToDate}
			/>

			<LeaseStats
				allowedMilesToDate={allowedMilesToDate}
				currentOdometerReading={currentOdometerReading}
				leaseDaysRemaining={leaseDaysRemaining}
			/>

			<Separator />

			<section className="flex w-full flex-col items-center gap-4">
				<p className="text-xl font-semibold">Predictions</p>
				<div className="w-full rounded bg-neutral-200 p-8 text-center dark:bg-neutral-800">
					<p className="text-6xl font-black">${(0).toFixed(2)}</p>
					<div className="h-4"></div>
					<p>
						total fees{" "}
						<span className="font-semibold">
							with {Math.abs(estimatedMilesToDate)} miles{" "}
							{estimatedMilesToDate > 0 ? "over" : "under"}
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

import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteLeaseButton } from "~/components/DeleteLeaseButton";
import { LeasePredictions } from "~/components/LeaseDetailsLeasePredictions";
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
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function LeaseDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	const lease = await api.lease.byId.query(params.id);

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

			<LeasePredictions
				excessFeePerMileInCents={lease.excessFeePerMileInCents}
				estimatedExcessMiles={estimatedExcessMiles}
				estimatedFeesAtEndOfLease={estimatedFeesAtEndOfLease}
			/>
			<Button asChild variant="link">
				<Link href={`/leases/${lease.id}/odometer-readings`}>Edit History</Link>
			</Button>

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

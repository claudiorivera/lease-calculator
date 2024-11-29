import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteLease } from "~/app/leases/[leaseId]/delete-lease";
import { LeaseChart } from "~/app/leases/[leaseId]/lease-chart";
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
import type { LeaseByIdOutput } from "~/server/api/routers/lease";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function LeaseDetailsPage(props: {
	params: Promise<{ leaseId: string }>;
}) {
	const params = await props.params;
	const session = await auth();

	if (!session) {
		return redirect("/welcome");
	}

	const lease = await api.lease.byId.query(params.leaseId);

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

			<LeaseChart lease={lease} />

			<Button asChild variant="link">
				<Link href={`/leases/${lease.id}/odometer-readings`}>Edit History</Link>
			</Button>

			<Separator />

			<DeleteLease leaseId={lease.id} />

			<Separator />
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

function LeasePredictions({
	estimatedFeesAtEndOfLease,
	estimatedExcessMiles,
	excessFeePerMileInCents,
}: {
	estimatedFeesAtEndOfLease: number;
	estimatedExcessMiles: number;
	excessFeePerMileInCents: number;
}) {
	return (
		<section className="flex w-full flex-col items-center gap-4">
			<p className="text-xl font-semibold">Predictions</p>
			<div className="w-full rounded bg-neutral-200 p-8 text-center dark:bg-neutral-800">
				<p className="text-6xl font-black">
					${(estimatedFeesAtEndOfLease / 100).toFixed(2)}
				</p>
				<div className="h-4" />
				<p>
					total fees{" "}
					<span className="font-semibold">
						with {Math.abs(Math.round(estimatedExcessMiles))} miles{" "}
						{estimatedExcessMiles > 0 ? "over" : "under"}
					</span>{" "}
					your allowance at{" "}
					<span className="font-semibold">
						${(excessFeePerMileInCents / 100).toFixed(2)} per mile
					</span>
				</p>
			</div>
		</section>
	);
}

function LeaseStats({
	latestOdometerReading,
	allowedMilesToDate,
	leaseDaysRemaining,
}: {
	latestOdometerReading: number;
	allowedMilesToDate: number;
	leaseDaysRemaining: number;
}) {
	return (
		<section className="flex w-full justify-evenly">
			<DisplayValueAndLabel
				label="Current Miles"
				value={latestOdometerReading}
			/>
			<div className="w-0.5 bg-neutral-100" />
			<DisplayValueAndLabel label="Allowed Miles" value={allowedMilesToDate} />
			<div className="w-0.5 bg-neutral-100" />
			<DisplayValueAndLabel label="Days Remaining" value={leaseDaysRemaining} />
		</section>
	);
}

function MilesDisplay({
	milesOverOrUnder,
	daysElapsedPercentage,
}: {
	milesOverOrUnder: number;
	daysElapsedPercentage: number;
}) {
	return (
		<section className="w-full rounded bg-neutral-200 p-8 text-center dark:bg-neutral-800">
			<p className="text-6xl font-black">{Math.abs(milesOverOrUnder)}</p>
			<div className="h-4" />
			<p>
				miles{" "}
				<span className="font-semibold">
					{milesOverOrUnder > 0 ? "over" : "under"}
				</span>{" "}
				your allowance
			</p>
			<p>
				with <span className="font-semibold">{daysElapsedPercentage}%</span> of
				lease elapsed
			</p>
		</section>
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
		<div className="flex flex-1 flex-col items-center">
			<p className="text-xl">{value}</p>
			<p className="text-sm">{label}</p>
		</div>
	);
}

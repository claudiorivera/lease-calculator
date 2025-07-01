import dayjs from "dayjs";
import { getDaysSince } from "~/lib/dates";
import type { LeaseByIdOutput } from "~/server/api/routers/lease";

export function getLeaseDaysElapsed({
	startDate,
}: Pick<LeaseByIdOutput, "startDate">) {
	return getDaysSince(startDate);
}

export function getLeaseMilesRemaining({
	initialMiles,
	allowedMiles,
	latestOdometerReading,
}: Pick<LeaseByIdOutput, "allowedMiles" | "initialMiles"> & {
	latestOdometerReading: number;
}) {
	return initialMiles + allowedMiles - latestOdometerReading;
}

export function getLatestOdometerReading({
	odometerReadings,
	initialMiles,
}: Pick<LeaseByIdOutput, "odometerReadings" | "initialMiles">) {
	if (!odometerReadings.length) return initialMiles;

	return odometerReadings.at(-1)?.miles ?? 0;
}

export function getDaysElapsedPercentage({
	leaseDaysElapsed,
	totalLeaseDays,
}: {
	leaseDaysElapsed: number;
	totalLeaseDays: number;
}) {
	if (totalLeaseDays === 0) return 0;

	return Math.floor((leaseDaysElapsed / totalLeaseDays) * 100);
}

export function getAllowedMilesToDate({
	allowedMiles,
	initialMiles,
	leaseDaysElapsed,
	totalLeaseDays,
}: Pick<LeaseByIdOutput, "allowedMiles" | "initialMiles"> & {
	leaseDaysElapsed: number;
	totalLeaseDays: number;
}) {
	return (
		Math.floor((leaseDaysElapsed * allowedMiles) / totalLeaseDays) +
		initialMiles
	);
}

export function getAverageMilesPerDay({
	leaseDaysElapsed,
	initialMiles,
	latestOdometerReading,
}: {
	leaseDaysElapsed: number;
	initialMiles: number;
	latestOdometerReading: number;
}) {
	if (leaseDaysElapsed === 0) return 0;

	return (latestOdometerReading - initialMiles) / leaseDaysElapsed;
}

export function getEstimatedTotalFeesAtEndOfLease({
	estimatedExcessMiles,
	excessFeePerMileInCents,
}: {
	estimatedExcessMiles: number;
	excessFeePerMileInCents: number;
}) {
	return Math.max(estimatedExcessMiles * excessFeePerMileInCents, 0);
}

export function getEstimatedExcessMiles({
	estimatedMilesAtEndOfLease,
	initialMiles,
	allowedMiles,
}: {
	estimatedMilesAtEndOfLease: number;
	initialMiles: number;
	allowedMiles: number;
}) {
	return estimatedMilesAtEndOfLease - initialMiles - allowedMiles;
}

export function getEstimatedMilesAtEndOfLease({
	averageMilesPerDay,
	leaseDaysRemaining,
	latestOdometerReading,
}: {
	averageMilesPerDay: number;
	leaseDaysRemaining: number;
	latestOdometerReading: number;
}) {
	return latestOdometerReading + averageMilesPerDay * leaseDaysRemaining;
}

type LeaseChartData = {
	monthsSinceLeaseStart: number;
	expectedOdometerReading: number;
	odometerReading?: number;
};

export function getLeaseChartData({ lease }: { lease: LeaseByIdOutput }) {
	const chartData = new Set<LeaseChartData>();

	chartData.add({
		monthsSinceLeaseStart: 0,
		odometerReading: lease.initialMiles,
		expectedOdometerReading: lease.initialMiles,
	});

	chartData.add({
		monthsSinceLeaseStart: lease.numberOfMonths,
		expectedOdometerReading: lease.initialMiles + lease.allowedMiles,
	});

	for (const odometerReading of lease.odometerReadings) {
		const monthsSinceLeaseStart = dayjs(odometerReading.createdAt).diff(
			lease.startDate,
			"months",
		);

		chartData.add({
			monthsSinceLeaseStart,
			odometerReading: odometerReading.miles,
			expectedOdometerReading:
				lease.initialMiles +
				monthsSinceLeaseStart * (lease.allowedMiles / lease.numberOfMonths),
		});
	}

	const data = [...chartData].sort(
		(a, b) => a.monthsSinceLeaseStart - b.monthsSinceLeaseStart,
	);

	return data;
}

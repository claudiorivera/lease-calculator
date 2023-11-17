import NewOdometerReadingForm from "~/app/leases/[leaseId]/odometer-readings/new/new-odometer-reading-form";
import { getLatestOdometerReading } from "~/lib/leases";
import { api } from "~/trpc/server";

export default async function NewOdometerReadingPage({
	params,
}: {
	params: { leaseId: string };
}) {
	const { initialMiles, odometerReadings } = await api.lease.byId.query(
		params.leaseId,
	);

	const latestOdometerReading = getLatestOdometerReading({
		initialMiles,
		odometerReadings,
	});

	return (
		<NewOdometerReadingForm
			leaseId={params.leaseId}
			latestOdometerReading={latestOdometerReading}
		/>
	);
}

import NewOdometerReadingForm from "~/app/leases/[leaseId]/odometer-readings/new/new-odometer-reading-form";
import { getLatestOdometerReading } from "~/lib/leases";
import { api } from "~/trpc/server";

export default async function NewOdometerReadingPage(props: {
	params: Promise<{ leaseId: string }>;
}) {
	const params = await props.params;
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

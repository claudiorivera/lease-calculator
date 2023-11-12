import NewOdometerReadingForm from "~/components/NewOdometerReadingForm";
import { getLatestOdometerReading } from "~/lib/leases";
import { api } from "~/trpc/server";

export default async function NewOdometerReadingPage({
	params,
}: {
	params: { id: string };
}) {
	const { initialMiles, odometerReadings } = await api.lease.byId.query(
		params.id,
	);

	const latestOdometerReading = getLatestOdometerReading({
		initialMiles,
		odometerReadings,
	});

	return (
		<NewOdometerReadingForm
			leaseId={params.id}
			latestOdometerReading={latestOdometerReading}
		/>
	);
}

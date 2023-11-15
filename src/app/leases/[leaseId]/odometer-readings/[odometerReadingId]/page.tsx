import UpdateOdometerReadingForm from "~/components/UpdateOdometerReadingForm";
import { api } from "~/trpc/server";

export default async function OdometerReadingPage({
	params,
}: {
	params: { odometerReadingId: string };
}) {
	const odometerReading = await api.odometerReading.byId.query(
		params.odometerReadingId,
	);

	return <UpdateOdometerReadingForm odometerReading={odometerReading} />;
}

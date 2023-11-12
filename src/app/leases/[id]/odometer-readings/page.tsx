import { api } from "~/trpc/server";

export default async function OdometerReadingsPage({
	params,
}: {
	params: { id: string };
}) {
	const odometerReadings = await api.odometerReading.byLeaseId.query(params.id);

	return <pre>{JSON.stringify(odometerReadings, null, 2)}</pre>;
}

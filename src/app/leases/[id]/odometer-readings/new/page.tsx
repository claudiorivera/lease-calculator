import NewOdometerReadingForm from "~/components/NewOdometerReadingForm";

export default function NewOdometerReadingPage({
	params,
}: {
	params: { id: string };
}) {
	const leaseId = params.id;

	return <NewOdometerReadingForm leaseId={leaseId} />;
}

import NewOdometerReadingForm from "~/components/NewOdometerReadingForm";

export default function NewOdometerReadingPage({
	params,
}: {
	params: { id: string };
}) {
	return <NewOdometerReadingForm leaseId={params.id} />;
}

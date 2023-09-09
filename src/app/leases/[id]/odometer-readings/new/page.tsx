import { Fragment } from "react";
import NewOdometerReadingForm from "~/components/NewOdometerReadingForm";

export default function NewOdometerReadingPage({
	params,
}: {
	params: { id: string };
}) {
	const leaseId = params.id;

	return (
		<Fragment>
			<h1>New Odometer Reading</h1>

			<NewOdometerReadingForm leaseId={leaseId} />
		</Fragment>
	);
}

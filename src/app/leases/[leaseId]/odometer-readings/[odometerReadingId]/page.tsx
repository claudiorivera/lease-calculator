import Link from "next/link";
import { DeleteOdometerReadingButton } from "~/app/leases/[leaseId]/odometer-readings/[odometerReadingId]/DeleteOdometerReadingButton";
import UpdateOdometerReadingForm from "~/app/leases/[leaseId]/odometer-readings/[odometerReadingId]/UpdateOdometerReadingForm";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function OdometerReadingPage({
	params,
}: {
	params: { odometerReadingId: string };
}) {
	const odometerReading = await api.odometerReading.byId.query(
		params.odometerReadingId,
	);

	return (
		<div className="flex flex-col gap-2">
			<UpdateOdometerReadingForm odometerReading={odometerReading} />
			<Button asChild variant="secondary">
				<Link href={`/leases/${odometerReading.leaseId}/odometer-readings`}>
					Cancel
				</Link>
			</Button>
			<DeleteOdometerReadingButton odometerReading={odometerReading} />
		</div>
	);
}

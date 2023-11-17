"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { type OdometerReadingByIdOutput } from "~/server/api/routers/odometerReading";
import { api } from "~/trpc/client";

export function DeleteOdometerReadingButton({
	odometerReading,
}: {
	odometerReading: OdometerReadingByIdOutput;
}) {
	const router = useRouter();

	const { mutate: deleteOdometerReading } =
		api.odometerReading.delete.useMutation({
			onSuccess: () =>
				router.push(`/leases/${odometerReading.leaseId}/odometer-readings`),
		});

	return (
		<Button
			variant="destructive"
			onClick={() => deleteOdometerReading(odometerReading.id)}
		>
			Delete
		</Button>
	);
}

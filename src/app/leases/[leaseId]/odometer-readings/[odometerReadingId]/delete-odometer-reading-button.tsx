"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { OdometerReadingByIdOutput } from "@/server/api/routers/odometer-reading";
import { api } from "@/trpc/react";

export function DeleteOdometerReadingButton({
	odometerReading,
}: {
	odometerReading: OdometerReadingByIdOutput;
}) {
	const router = useRouter();
	const utils = api.useUtils();

	const { mutate: deleteOdometerReading } =
		api.odometerReading.delete.useMutation({
			onSuccess: async () => {
				await utils.odometerReading.byLeaseId.invalidate(
					odometerReading.leaseId,
				);
				router.push(`/leases/${odometerReading.leaseId}/odometer-readings`);
			},
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

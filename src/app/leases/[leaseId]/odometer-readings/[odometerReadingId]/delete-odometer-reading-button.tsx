"use client";

import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/loading-button";
import type { OdometerReadingByIdOutput } from "@/server/api/routers/odometer-reading";
import { api } from "@/trpc/react";

export function DeleteOdometerReadingButton({
	odometerReading,
}: {
	odometerReading: OdometerReadingByIdOutput;
}) {
	const router = useRouter();
	const utils = api.useUtils();

	const { mutate: deleteOdometerReading, isPending } =
		api.odometerReading.delete.useMutation({
			onSuccess: async () => {
				await utils.odometerReading.byLeaseId.invalidate(
					odometerReading.leaseId,
				);
				router.push(`/leases/${odometerReading.leaseId}/odometer-readings`);
			},
		});

	return (
		<LoadingButton
			isLoading={isPending}
			variant="destructive"
			onClick={() => deleteOdometerReading(odometerReading.id)}
		>
			Delete
		</LoadingButton>
	);
}

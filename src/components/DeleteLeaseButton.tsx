"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";
import { api } from "~/trpc/client";

export function DeleteLeaseButton({
	leaseId,
}: {
	leaseId: LeaseByIdOutput["id"];
}) {
	const router = useRouter();
	const utils = api.useUtils();
	const { mutate: deleteLease, isLoading } = api.lease.deleteById.useMutation();

	return (
		<Button
			disabled={isLoading}
			onClick={() =>
				deleteLease(leaseId, {
					onSuccess: () => {
						void utils.lease.invalidate();
						router.push("/");
					},
				})
			}
			variant="destructive"
		>
			{isLoading ? "Deleting..." : "Delete Lease"}
		</Button>
	);
}

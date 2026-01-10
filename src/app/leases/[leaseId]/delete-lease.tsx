"use client";

import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/loading-button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { LeaseByIdOutput } from "@/server/api/routers/lease";
import { api } from "@/trpc/react";

export function DeleteLease({ leaseId }: { leaseId: LeaseByIdOutput["id"] }) {
	const router = useRouter();
	const utils = api.useUtils();
	const { mutate: deleteLease, isPending } = api.lease.deleteById.useMutation();

	return (
		<section className="flex w-full justify-evenly">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<LoadingButton isLoading={isPending} variant="destructive">
						Delete Lease
					</LoadingButton>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							Deleting a lease will delete all associated odometer readings
							permanently. This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() =>
								deleteLease(leaseId, {
									onSuccess: () => {
										void utils.lease.invalidate();
										router.push("/");
									},
								})
							}
						>
							{isPending ? "Deleting..." : "Continue"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</section>
	);
}

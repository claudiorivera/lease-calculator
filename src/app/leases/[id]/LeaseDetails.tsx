"use client";

import { LeaseDetailsLoadingError } from "~/app/leases/[id]/LeaseDetailsLoadingError";
import { LeaseDetailsLoadingSkeleton } from "~/app/leases/[id]/LeaseDetailsLoadingSkeleton";
import { LeaseDetailsView } from "~/app/leases/[id]/LeaseDetailsView";
import { api } from "~/trpc/client";

export default function LeaseDetails({ id }: { id: string }) {
	const {
		data: lease,
		isLoading,
		isError,
		error,
	} = api.lease.byId.useQuery(id);

	if (isError) return <LeaseDetailsLoadingError error={error} />;

	if (isLoading) return <LeaseDetailsLoadingSkeleton />;

	return <LeaseDetailsView lease={lease} />;
}

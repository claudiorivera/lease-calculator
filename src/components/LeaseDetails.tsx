"use client";

import { LeaseDetailsLoadingError } from "~/components/LeaseDetailsLoadingError";
import { LeaseDetailsLoadingSkeleton } from "~/components/LeaseDetailsLoadingSkeleton";
import { LeaseDetailsView } from "~/components/LeaseDetailsView";
import { api } from "~/trpc/client";

export function LeaseDetails({ id }: { id: string }) {
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

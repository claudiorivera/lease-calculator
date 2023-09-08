"use client";

import { LeaseList } from "~/app/LeaseList";
import { LeaseListEmpty } from "~/app/LeaseListEmpty";
import LeaseListLoadingError from "~/app/LeaseListLoadingError";
import { LeaseListLoadingSkeleton } from "~/app/LeaseListLoadingSkeleton";
import { api } from "~/trpc/client";

export default function CurrentUserLeaseList() {
	const { data: leases, isLoading, isError } = api.lease.mine.useQuery();

	if (isLoading) return <LeaseListLoadingSkeleton />;

	if (isError) return <LeaseListLoadingError />;

	if (!leases.length) return <LeaseListEmpty />;

	return <LeaseList leases={leases} />;
}

"use client";

import { LeaseList } from "~/components/LeaseList";
import { LeaseListEmpty } from "~/components/LeaseListEmpty";
import { LeaseListLoadingError } from "~/components/LeaseListLoadingError";
import { LeaseListLoadingSkeleton } from "~/components/LeaseListLoadingSkeleton";
import { api } from "~/trpc/client";

export function CurrentUserLeaseList() {
	const { data: leases, isLoading, isError } = api.lease.mine.useQuery();

	if (isLoading) return <LeaseListLoadingSkeleton />;

	if (isError) return <LeaseListLoadingError />;

	if (!leases.length) return <LeaseListEmpty />;

	return <LeaseList leases={leases} />;
}

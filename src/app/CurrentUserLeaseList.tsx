"use client";

import { LeaseList } from "~/app/LeaseList";
import { LeaseListEmpty } from "~/app/LeaseListEmpty";
import { LeaseListLoadingSkeleton } from "~/app/LeaseListLoadingSkeleton";
import { api } from "~/trpc/client";

export default function CurrentUserLeaseList() {
	const { data: leases } = api.lease.mine.useQuery();

	if (!leases) return <LeaseListLoadingSkeleton />;

	if (!leases.length) return <LeaseListEmpty />;

	return <LeaseList leases={leases} />;
}

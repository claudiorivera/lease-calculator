"use client";

import { Fragment } from "react";
import { api, type RouterOutputs } from "~/trpc/client";

export default function CurrentUserLeaseList() {
	const { data: leases } = api.lease.mine.useQuery();

	if (!leases) return <LeaseListLoadingSkeleton />;

	if (!leases.length) return <LeaseListEmpty />;

	return <LeaseList leases={leases} />;
}

function LeaseList({
	leases,
}: {
	leases: NonNullable<RouterOutputs["lease"]["mine"]>;
}) {
	return (
		<Fragment>
			<a href="/leases/new">Create new lease</a>
			{leases.map((lease) => (
				<p key={lease.id}>{lease.name}</p>
			))}
		</Fragment>
	);
}

function LeaseListEmpty() {
	return (
		<div>
			<p>No leases!</p>
			<a href="/leases/new">Add one here</a>
		</div>
	);
}

function LeaseListLoadingSkeleton() {
	return <p>Loading...</p>;
}

"use client";

import { api } from "~/trpc/client";

export default function LeaseDetails({ id }: { id: string }) {
	const { data: lease } = api.lease.byId.useQuery(id);

	return <pre>{JSON.stringify(lease, null, 2)}</pre>;
}

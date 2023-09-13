import Link from "next/link";
import { Fragment } from "react";
import { type RouterOutputs } from "~/trpc/shared";

export function LeaseList({
	leases,
}: {
	leases: RouterOutputs["lease"]["mine"];
}) {
	return (
		<Fragment>
			<Link href="/leases/new">Create new lease</Link>
			<ul>
				{leases.map((lease) => (
					<li key={lease.id}>
						<Link href={`/leases/${lease.id}`}>{lease.name}</Link>
					</li>
				))}
			</ul>
		</Fragment>
	);
}

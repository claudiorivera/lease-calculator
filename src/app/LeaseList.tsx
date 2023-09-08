import { Fragment } from "react";
import { type RouterOutputs } from "~/trpc/shared";

export function LeaseList({
	leases,
}: {
	leases: NonNullable<RouterOutputs["lease"]["mine"]>;
}) {
	return (
		<Fragment>
			<a href="/leases/new">Create new lease</a>
			<ul>
				{leases.map((lease) => (
					<li key={lease.id}>
						<a href={`/leases/${lease.id}`}>{lease.name}</a>
					</li>
				))}
			</ul>
		</Fragment>
	);
}

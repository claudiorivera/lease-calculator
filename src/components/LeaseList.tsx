import Link from "next/link";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { type RouterOutputs } from "~/trpc/shared";

export function LeaseList({
	leases,
}: {
	leases: RouterOutputs["lease"]["mine"];
}) {
	return (
		<Fragment>
			<Button asChild>
				<Link href="/leases/new">Create new lease</Link>
			</Button>
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

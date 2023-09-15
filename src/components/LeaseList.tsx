import Link from "next/link";
import { type RouterOutputs } from "~/trpc/shared";

export function LeaseList({
	leases,
}: {
	leases: RouterOutputs["lease"]["mine"];
}) {
	return (
		<ul className="flex flex-col items-center gap-4">
			{leases.map((lease) => (
				<li key={lease.id}>
					<Link href={`/leases/${lease.id}`}>{lease.name}</Link>
				</li>
			))}
		</ul>
	);
}

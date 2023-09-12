import Link from "next/link";

export function LeaseListEmpty() {
	return (
		<div>
			<p>No leases!</p>
			<Link href="/leases/new">Add one here</Link>
		</div>
	);
}

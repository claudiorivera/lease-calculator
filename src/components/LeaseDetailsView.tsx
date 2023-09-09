import { Fragment } from "react";
import { getLeaseProgress } from "~/lib/leases";
import { type RouterOutputs } from "~/trpc/shared";

export function LeaseDetailsView({
	lease,
}: {
	lease: NonNullable<RouterOutputs["lease"]["byId"]>;
}) {
	const { leaseDaysRemaining, leaseMilesRemaining } = getLeaseProgress(lease);

	return (
		<Fragment>
			<section>
				<p>Days left:&nbsp;</p>
				<span>{leaseDaysRemaining}</span>
				<p>Miles left:&nbsp;</p>
				<span>{leaseMilesRemaining}</span>
			</section>

			<a href={`/leases/${lease.id}/odometer-readings/new`}>
				Add an odometer reading
			</a>
		</Fragment>
	);
}

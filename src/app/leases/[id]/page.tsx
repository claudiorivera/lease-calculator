import { redirect } from "next/navigation";
import { Fragment } from "react";
import LeaseDetails from "~/app/leases/[id]/LeaseDetails";
import { getServerAuthSession } from "~/server/auth";

export default async function LeaseDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	return (
		<Fragment>
			<h1>Lease Details</h1>

			<LeaseDetails id={params.id} />
		</Fragment>
	);
}

import { redirect } from "next/navigation";
import { Fragment } from "react";
import { LeaseDetails } from "~/components/LeaseDetails";
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
			<a href="/">Back</a>

			<section>
				<LeaseDetails id={params.id} />
			</section>
		</Fragment>
	);
}

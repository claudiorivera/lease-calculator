import { redirect } from "next/navigation";
import { Fragment } from "react";
import { NewLeaseForm } from "~/app/leases/new/NewLeaseForm";
import { getServerAuthSession } from "~/server/auth";

export default async function NewLeasePage() {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	return (
		<Fragment>
			<h1>New Lease</h1>

			<NewLeaseForm />
		</Fragment>
	);
}

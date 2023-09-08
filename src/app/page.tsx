import { redirect } from "next/navigation";
import { Fragment } from "react";
import CurrentUserLeaseList from "~/app/CurrentUserLeaseList";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	return (
		<Fragment>
			<a href="/api/auth/signout">Sign Out</a>
			<h1>My Leases</h1>

			<CurrentUserLeaseList />
		</Fragment>
	);
}

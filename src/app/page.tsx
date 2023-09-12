import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { CurrentUserLeaseList } from "~/components/CurrentUserLeaseList";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	return (
		<Fragment>
			<Link href="/api/auth/signout">Sign Out</Link>
			<h1>My Leases</h1>

			<CurrentUserLeaseList />
		</Fragment>
	);
}

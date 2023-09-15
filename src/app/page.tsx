import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { CurrentUserLeaseList } from "~/components/CurrentUserLeaseList";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	return (
		<Fragment>
			<Button asChild>
				<Link href="/api/auth/signout">Sign Out</Link>
			</Button>
			<h1>My Leases</h1>

			<CurrentUserLeaseList />
		</Fragment>
	);
}

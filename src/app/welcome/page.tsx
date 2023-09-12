import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function WelcomePage() {
	const session = await getServerAuthSession();

	if (session) {
		return redirect("/");
	}

	return (
		<Fragment>
			<Link href="/api/auth/signin">Sign In</Link>
			<h1>Welcome to Lease Calculator</h1>
		</Fragment>
	);
}

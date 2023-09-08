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
			<a href="/api/auth/signin">Sign In</a>
			<h1>Welcome to Lease Calculator</h1>
		</Fragment>
	);
}

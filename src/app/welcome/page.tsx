import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function WelcomePage() {
	const session = await getServerAuthSession();

	if (session) {
		return redirect("/");
	}

	return (
		<>
			<h1>Welcome to Lease Calculator</h1>

			<div>
				<a href="/api/auth/signin">Sign In</a>
				<span> to get started!</span>
			</div>
		</>
	);
}

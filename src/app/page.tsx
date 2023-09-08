import { redirect } from "next/navigation";
import { getAllLeases } from "~/app/actions";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	const leases = await getAllLeases();

	return (
		<div>
			<a href="/api/auth/signout">Sign Out</a>
			<pre>{JSON.stringify(leases, null, 2)}</pre>
		</div>
	);
}

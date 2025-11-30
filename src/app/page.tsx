import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/welcome");
	}

	return (
		<div className="flex flex-col items-center py-8">
			<p>Select a lease or create one to get started!</p>
		</div>
	);
}

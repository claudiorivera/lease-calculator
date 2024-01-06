import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function HomePage() {
	const session = await auth();

	if (!session) {
		return redirect("/welcome");
	}

	return (
		<div className="flex flex-col items-center py-8">
			<p>Select a lease or create one to get started!</p>
		</div>
	);
}

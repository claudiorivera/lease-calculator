import { redirect } from "next/navigation";
import { SignInButton } from "~/components/SignInButton";
import { getServerAuthSession } from "~/server/auth";

export default async function WelcomePage() {
	const session = await getServerAuthSession();

	if (session) {
		return redirect("/");
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<h1>Welcome to Lease Calculator</h1>
			<SignInButton />
		</div>
	);
}

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignInButton } from "@/app/welcome/sign-in-button";
import { auth } from "@/lib/auth";

export default async function WelcomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

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

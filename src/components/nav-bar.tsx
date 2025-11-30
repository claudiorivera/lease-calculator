import { headers } from "next/headers";
import { DarkModeToggleButton } from "@/components/dark-mode-toggle-button";
import { LeaseSwitcher } from "@/components/lease-switcher";
import { auth } from "@/lib/auth";

export async function NavBar() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<nav className="py-4">
			<ul className="flex items-center justify-between">
				<li>{!!session && <LeaseSwitcher />}</li>
				<li>
					<DarkModeToggleButton />
				</li>
			</ul>
		</nav>
	);
}

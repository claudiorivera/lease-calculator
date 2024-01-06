import { DarkModeToggleButton } from "~/components/dark-mode-toggle-button";
import LeaseSwitcher from "~/components/lease-switcher";
import { auth } from "~/server/auth";

export async function NavBar() {
	const session = await auth();

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

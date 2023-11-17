import { DarkModeToggleButton } from "~/components/dark-mode-toggle-button";
import LeaseSwitcher from "~/components/lease-switcher";
import { getServerAuthSession } from "~/server/auth";

export async function NavBar() {
	const session = await getServerAuthSession();

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

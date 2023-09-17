import { DarkModeToggleButton } from "~/components/DarkModeToggleButton";
import LeaseSwitcher from "~/components/LeaseSwitcher";
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

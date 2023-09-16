import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { DarkModeToggleButton } from "~/components/DarkModeToggleButton";
import { SignInButton } from "~/components/SignInButton";
import { SignOutButton } from "~/components/SignOutButton";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getServerAuthSession } from "~/server/auth";

const links = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/leases/new",
		label: "Create New Lease",
	},
];

export async function NavBar() {
	const session = await getServerAuthSession();

	return (
		<nav className="py-4">
			<ul className="flex items-center justify-between">
				<li>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{session ? (
								<Fragment>
									{links.map(({ href, label }) => (
										<NavLink key={href} href={href}>
											{label}
										</NavLink>
									))}
									<DropdownMenuSeparator />
									<SignOutButton />
								</Fragment>
							) : (
								<SignInButton />
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</li>
				<li>
					<p className="font-semibold">Lease Calculator</p>
				</li>
				<li>
					<DarkModeToggleButton />
				</li>
			</ul>
		</nav>
	);
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<DropdownMenuItem className="cursor-pointer">
			<Link href={href}>{children}</Link>
		</DropdownMenuItem>
	);
}

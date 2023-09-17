"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

export function SignOutMenuItem() {
	return (
		<DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
			Sign Out
		</DropdownMenuItem>
	);
}

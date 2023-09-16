"use client";

import { signIn } from "next-auth/react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

export function SignInButton() {
	return (
		<DropdownMenuItem
			className="cursor-pointer"
			onClick={() => signIn("discord")}
		>
			Sign In with Discord
		</DropdownMenuItem>
	);
}

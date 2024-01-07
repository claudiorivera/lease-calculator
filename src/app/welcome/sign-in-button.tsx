"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export function SignInButton({ provider }: { provider: "discord" | "github" }) {
	return (
		<Button onClick={() => signIn(provider)}>Sign In with {provider}</Button>
	);
}

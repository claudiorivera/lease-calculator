"use client";

import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { LoadingButton } from "@/components/loading-button";
import { authClient } from "@/lib/auth-client";

type SignInMethod = "demo" | "github" | "discord";

export function SignIn() {
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const [activeMethod, setActiveMethod] = useState<SignInMethod>();

	const handleDemoUserSignIn = async () => {
		setActiveMethod("demo");
		await authClient.signIn.email({
			email: "demo@example.com",
			password: "password1234",
			callbackURL: pathname,
		});
	};

	const handleDiscordSignIn = async () => {
		setActiveMethod("discord");
		await authClient.signIn.social({
			provider: "discord",
			callbackURL: pathname,
		});
	};

	const handleGitHubSignIn = async () => {
		setActiveMethod("github");
		await authClient.signIn.social({
			provider: "github",
			callbackURL: pathname,
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<LoadingButton
				onClick={() => startTransition(handleDemoUserSignIn)}
				isLoading={isPending && activeMethod === "demo"}
				disabled={isPending}
			>
				Sign in as demo user
			</LoadingButton>
			<LoadingButton
				onClick={() => startTransition(handleGitHubSignIn)}
				isLoading={isPending && activeMethod === "github"}
				disabled={isPending}
			>
				Sign in with GitHub
			</LoadingButton>
			<LoadingButton
				onClick={() => startTransition(handleDiscordSignIn)}
				isLoading={isPending && activeMethod === "discord"}
				disabled={isPending}
			>
				Sign in with Discord
			</LoadingButton>
		</div>
	);
}

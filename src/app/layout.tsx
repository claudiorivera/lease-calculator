import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { NavBar } from "~/components/nav-bar";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: "Lease Calculator",
	description:
		"Log your odometer readings and the lease calculator will tell you how much you may owe at the end of your lease.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={cn("font-sans", inter.variable)}>
				<TRPCReactProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<main className="container mx-auto max-w-md">
							<NavBar />
							<div>{children}</div>
						</main>
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}

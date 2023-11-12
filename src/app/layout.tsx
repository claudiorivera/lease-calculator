import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { TrpcProvider } from "~/app/providers";
import { NavBar } from "~/components/NavBar";
import { ThemeProvider } from "~/components/ThemeProvider";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";

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
				<TrpcProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<main className="container mx-auto max-w-md">
							<NavBar />
							<div>{children}</div>
						</main>
					</ThemeProvider>
				</TrpcProvider>
			</body>
		</html>
	);
}

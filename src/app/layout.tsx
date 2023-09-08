import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import "~/styles/globals.css";
import { cn } from "~/utils/cn";

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
		<html lang="en">
			<body
				className={cn(
					"bg-background text-foreground font-sans",
					inter.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}

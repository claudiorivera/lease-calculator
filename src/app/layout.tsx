import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { TrpcProvider } from "~/app/providers";
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
		<html lang="en">
			<body
				className={cn(
					"bg-background text-foreground font-sans",
					inter.variable,
				)}
			>
				<TrpcProvider>
					<main className="container mx-auto max-w-md py-4">{children}</main>
				</TrpcProvider>
			</body>
		</html>
	);
}

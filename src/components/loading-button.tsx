import { Loader2Icon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function LoadingButton({
	children,
	isLoading = false,
	...props
}: {
	children: ReactNode;
	isLoading?: boolean;
} & ComponentProps<typeof Button>) {
	return (
		<Button disabled={isLoading} {...props}>
			{isLoading ? <Loader2Icon className="animate-spin" /> : children}
		</Button>
	);
}

"use client";

import { type ComponentPropsWithoutRef } from "react";
import { Input as _Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const Input = ({
	label,
	errorMessage,
	...inputProps
}: {
	label: string;
	errorMessage?: string;
} & ComponentPropsWithoutRef<typeof _Input>) => {
	return (
		<div className="flex items-center gap-2">
			<Label className="flex flex-1 flex-col gap-1">
				{label}
				<_Input {...inputProps} />
				{errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
			</Label>
		</div>
	);
};

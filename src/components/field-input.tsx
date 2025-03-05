"use client";

import type { ComponentProps, Ref } from "react";
import { Input as _Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function FieldInput({
	ref,
	label,
	errorMessage,
	...inputProps
}: {
	ref: Ref<HTMLInputElement>;
	label: string;
	errorMessage?: string;
} & ComponentProps<typeof _Input>) {
	return (
		<div className="flex items-center gap-2">
			<Label className="flex flex-1 flex-col gap-1">
				{label}
				<_Input ref={ref} {...inputProps} />
				{errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
			</Label>
		</div>
	);
}

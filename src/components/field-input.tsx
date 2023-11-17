"use client";

import { forwardRef, type ComponentProps } from "react";
import { Input as _Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const FieldInput = forwardRef<
	HTMLInputElement,
	ComponentProps<typeof _Input> & {
		label?: string;
		errorMessage?: string;
	}
>(function Input({ label, errorMessage, ...inputProps }, ref) {
	return (
		<div className="flex items-center gap-2">
			<Label className="flex flex-1 flex-col gap-1">
				{label}
				<_Input ref={ref} {...inputProps} />
				{errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
			</Label>
		</div>
	);
});

"use client";

import { forwardRef, type ComponentProps } from "react";

export const Input = forwardRef<
	HTMLInputElement,
	ComponentProps<"input"> & {
		label?: string;
		errorMessage?: string;
	}
>(function Input({ label, errorMessage, ...inputProps }, ref) {
	return (
		<div className="flex items-center gap-2">
			<label className="flex flex-1 flex-col gap-1 text-slate-500">
				{label}
				<input
					ref={ref}
					className="flex-1 rounded border border-slate-500 px-4 py-2 shadow"
					{...inputProps}
				/>
				{errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
			</label>
		</div>
	);
});

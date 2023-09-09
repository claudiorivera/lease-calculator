"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { createLeaseSchema, type CreateLeaseInput } from "~/schemas/lease";
import { api } from "~/trpc/client";

export function NewLeaseForm() {
	const router = useRouter();
	const { mutate: createNewLease, isLoading } = api.lease.create.useMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateLeaseInput>({
		resolver: zodResolver(createLeaseSchema),
	});

	const onSubmit = (data: CreateLeaseInput) => {
		createNewLease(data, {
			onSuccess: () => {
				router.push("/");
			},
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className="my-4 flex flex-col gap-4">
				<Input
					label="Name"
					errorMessage={errors.name?.message}
					placeholder="My Car Lease"
					{...register("name")}
				/>
				<Input
					type="date"
					label="Start Date"
					errorMessage={errors.startDate?.message}
					{...register("startDate", {
						valueAsDate: true,
					})}
				/>

				<Input
					type="number"
					label="Number of Months"
					placeholder="36"
					errorMessage={errors.numberOfMonths?.message}
					{...register("numberOfMonths", {
						valueAsNumber: true,
					})}
				/>

				<Input
					type="number"
					label="Allowed Miles"
					placeholder="36000"
					errorMessage={errors.allowedMiles?.message}
					{...register("allowedMiles", {
						valueAsNumber: true,
					})}
				/>
				<Input
					type="number"
					label="Excess Fee Per Mile"
					placeholder="25"
					errorMessage={errors.excessFeePerMileInCents?.message}
					{...register("excessFeePerMileInCents", {
						valueAsNumber: true,
					})}
				/>
			</section>

			<button
				className="rounded bg-blue-500 px-4 py-2 font-semibold text-white"
				type="submit"
				disabled={isLoading}
			>
				Submit
			</button>
		</form>
	);
}

const Input = forwardRef<
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

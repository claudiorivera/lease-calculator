"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type CreateLeaseInput, createLeaseSchema } from "@/schemas/lease";
import { api } from "@/trpc/react";

export function NewLeaseForm({ onFinished }: { onFinished: () => void }) {
	const router = useRouter();
	const utils = api.useUtils();
	const { mutate: createNewLease, isPending } = api.lease.create.useMutation({
		onSuccess: () => utils.lease.mine.invalidate(),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(createLeaseSchema),
	});

	const onSubmit = (data: CreateLeaseInput) => {
		createNewLease(data, {
			onSuccess: (data) => {
				onFinished();

				router.push(`/leases/${data.id}`);
			},
		});
	};

	return (
		<form
			className="my-4 flex flex-col gap-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Field>
				<FieldLabel htmlFor="name">Name</FieldLabel>
				<Input id="name" placeholder="My Car Lease" {...register("name")} />
				<FieldError>{errors.name?.message}</FieldError>
			</Field>

			<Field>
				<FieldLabel htmlFor="startDate">Start Date</FieldLabel>
				<Input
					id="startDate"
					type="date"
					{...register("startDate", {
						valueAsDate: true,
					})}
				/>
				<FieldError>{errors.startDate?.message}</FieldError>
			</Field>

			<Field>
				<FieldLabel htmlFor="numberOfMonths">Number of Months</FieldLabel>
				<Input
					id="numberOfMonths"
					type="number"
					placeholder="36"
					{...register("numberOfMonths", {
						valueAsNumber: true,
					})}
				/>
				<FieldError>{errors.numberOfMonths?.message}</FieldError>
			</Field>

			<Field>
				<FieldLabel htmlFor="initialMiles">Miles at Start of Lease</FieldLabel>
				<Input
					id="initialMiles"
					type="number"
					placeholder="0"
					{...register("initialMiles", {
						valueAsNumber: true,
					})}
				/>
				<FieldError>{errors.initialMiles?.message}</FieldError>
			</Field>

			<Field>
				<FieldLabel htmlFor="allowedMiles">Allowed Miles</FieldLabel>
				<Input
					id="allowedMiles"
					type="number"
					placeholder="36000"
					{...register("allowedMiles", {
						valueAsNumber: true,
					})}
				/>
				<FieldError>{errors.allowedMiles?.message}</FieldError>
			</Field>

			<Field>
				<FieldLabel htmlFor="excessFeePerMileInCents">
					Excess Fee Per Mile
				</FieldLabel>
				<Input
					id="excessFeePerMileInCents"
					type="number"
					placeholder="25"
					{...register("excessFeePerMileInCents", {
						valueAsNumber: true,
					})}
				/>
			</Field>

			<LoadingButton isLoading={isPending} className="w-full" type="submit">
				Submit
			</LoadingButton>
			<Button onClick={onFinished} variant="outline" className="w-full">
				Cancel
			</Button>
		</form>
	);
}

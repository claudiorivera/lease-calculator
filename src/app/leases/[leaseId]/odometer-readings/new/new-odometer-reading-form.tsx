"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	type CreateOdometerReadingInput,
	createOdometerReadingSchema,
} from "@/schemas/odometer-reading";
import type { LeaseByIdOutput } from "@/server/api/routers/lease";
import { api } from "@/trpc/react";

export function NewOdometerReadingForm({
	leaseId,
	latestOdometerReading,
}: {
	leaseId: LeaseByIdOutput["id"];
	latestOdometerReading: number;
}) {
	const router = useRouter();

	const { mutate: createNewOdometerReading, isPending } =
		api.odometerReading.create.useMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateOdometerReadingInput>({
		resolver: zodResolver(createOdometerReadingSchema),
		defaultValues: {
			leaseId,
			miles: latestOdometerReading,
		},
	});

	const onSubmit = (data: CreateOdometerReadingInput) => {
		createNewOdometerReading(data, {
			onSuccess: () => {
				router.push(`/leases/${leaseId}`);
			},
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className="my-4 flex flex-col gap-4">
				<Field>
					<FieldLabel htmlFor="miles">Odometer Reading</FieldLabel>
					<Input
						id="miles"
						type="number"
						autoFocus
						onFocus={(e) => e.target.select()}
						{...register("miles", {
							valueAsNumber: true,
						})}
					/>
					<FieldError>{errors.miles?.message}</FieldError>
				</Field>
			</section>

			<Button type="submit" disabled={isPending}>
				Submit
			</Button>
		</form>
	);
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@/components/loading-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	type UpdateOdometerReadingInput,
	updateOdometerReadingSchema,
} from "@/schemas/odometer-reading";
import type { OdometerReadingByIdOutput } from "@/server/api/routers/odometer-reading";
import { api } from "@/trpc/react";

export function UpdateOdometerReadingForm({
	odometerReading,
}: {
	odometerReading: OdometerReadingByIdOutput;
}) {
	const router = useRouter();

	const utils = api.useUtils();

	const { mutate: updateOdometerReading, isPending } =
		api.odometerReading.update.useMutation({
			onSuccess: async () => {
				await utils.odometerReading.byLeaseId.invalidate(
					odometerReading.leaseId,
				);
				router.push(`/leases/${odometerReading.leaseId}/odometer-readings`);
			},
		});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateOdometerReadingInput>({
		resolver: zodResolver(updateOdometerReadingSchema),
		defaultValues: {
			id: odometerReading.id,
			miles: odometerReading.miles,
		},
	});

	return (
		<form
			onSubmit={handleSubmit((data) => updateOdometerReading(data))}
			className="flex flex-col gap-2"
		>
			<Field>
				<FieldLabel htmlFor="miles">Odometer Reading</FieldLabel>
				<Input
					type="number"
					defaultValue={odometerReading.miles}
					{...register("miles", {
						valueAsNumber: true,
					})}
				/>
				<FieldError>{errors.miles?.message}</FieldError>
			</Field>

			<LoadingButton type="submit" isLoading={isPending} className="w-full">
				Submit
			</LoadingButton>
		</form>
	);
}

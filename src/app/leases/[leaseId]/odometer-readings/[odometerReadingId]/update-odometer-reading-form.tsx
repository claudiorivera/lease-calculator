"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FieldInput } from "~/components/field-input";
import { Button } from "~/components/ui/button";
import {
	type UpdateOdometerReadingInput,
	updateOdometerReadingSchema,
} from "~/schemas/odometer-reading";
import { type OdometerReadingByIdOutput } from "~/server/api/routers/odometer-reading";
import { api } from "~/trpc/client";

export default function UpdateOdometerReadingForm({
	odometerReading,
}: {
	odometerReading: OdometerReadingByIdOutput;
}) {
	const router = useRouter();
	const utils = api.useUtils();
	const { mutate: updateOdometerReading, isLoading } =
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
			<FieldInput
				type="number"
				label="Odometer Reading"
				errorMessage={errors.miles?.message}
				defaultValue={odometerReading.miles}
				{...register("miles", {
					valueAsNumber: true,
				})}
			/>

			<Button type="submit" disabled={isLoading} className="w-full">
				Submit
			</Button>
		</form>
	);
}

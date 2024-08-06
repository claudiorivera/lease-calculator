"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FieldInput } from "~/components/field-input";
import { Button } from "~/components/ui/button";
import {
	type CreateOdometerReadingInput,
	createOdometerReadingSchema,
} from "~/schemas/odometer-reading";
import type { LeaseByIdOutput } from "~/server/api/routers/lease";
import { api } from "~/trpc/client";

export default function NewOdometerReadingForm({
	leaseId,
	latestOdometerReading,
}: {
	leaseId: LeaseByIdOutput["id"];
	latestOdometerReading: number;
}) {
	const router = useRouter();
	const { mutate: createNewOdometerReading, isLoading } =
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
				<FieldInput
					type="number"
					label="Odometer Reading"
					errorMessage={errors.miles?.message}
					defaultValue={latestOdometerReading}
					autoFocus
					onFocus={(event) => event.target.select()}
					{...register("miles", {
						valueAsNumber: true,
					})}
				/>
			</section>

			<Button type="submit" disabled={isLoading}>
				Submit
			</Button>
		</form>
	);
}

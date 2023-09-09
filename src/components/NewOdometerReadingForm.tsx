"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "~/components/Input";
import {
	createOdometerReadingSchema,
	type CreateOdometerReadingInput,
} from "~/schemas/odometerReading";
import { type LeaseByIdOutput } from "~/server/api/routers/lease";
import { api } from "~/trpc/client";

export default function NewOdometerReadingForm({
	leaseId,
}: {
	leaseId: LeaseByIdOutput["id"];
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
			date: new Date(),
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
				<Input
					type="number"
					label="Odometer Reading"
					errorMessage={errors.miles?.message}
					{...register("miles", {
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

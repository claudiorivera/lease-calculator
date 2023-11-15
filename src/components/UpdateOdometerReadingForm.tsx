"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "~/components/Input";
import { Button } from "~/components/ui/button";
import {
	updateOdometerReadingSchema,
	type UpdateOdometerReadingInput,
} from "~/schemas/odometerReading";
import { type OdometerReadingByIdOutput } from "~/server/api/routers/odometerReading";
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
			onSuccess: () =>
				utils.odometerReading.byLeaseId.invalidate(odometerReading.leaseId),
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

	const onSubmit = (data: UpdateOdometerReadingInput) => {
		updateOdometerReading(data, {
			onSuccess: () => {
				router.push(`/leases/${odometerReading.leaseId}/odometer-readings`);
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
					defaultValue={odometerReading.miles}
					{...register("miles", {
						valueAsNumber: true,
					})}
				/>
			</section>

			<div className="flex flex-col gap-2">
				<Button asChild variant="secondary">
					<Link href={`/leases/${odometerReading.leaseId}/odometer-readings`}>
						Cancel
					</Link>
				</Button>
				<Button type="submit" disabled={isLoading}>
					Submit
				</Button>
			</div>
		</form>
	);
}

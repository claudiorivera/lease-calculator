"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	CheckIcon,
	ChevronsUpDownIcon,
	CirclePlusIcon,
	LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { type CreateLeaseInput, createLeaseSchema } from "@/schemas/lease";
import type { LeaseMineOutput } from "@/server/api/routers/lease";
import { api } from "@/trpc/react";

export function LeaseSwitcher() {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [showNewLeaseDialog, setShowNewLeaseDialog] = useState(false);
	const [activeLease, setActiveLease] = useState<
		LeaseMineOutput[number] | null
	>(null);
	const { data: leases = [] } = api.lease.mine.useQuery();

	return (
		<Dialog open={showNewLeaseDialog} onOpenChange={setShowNewLeaseDialog}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						aria-expanded={open}
						aria-label="Select a lease"
						className={cn("w-48")}
					>
						{activeLease ? activeLease.name : "Select a Lease"}
						<ChevronsUpDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-48 p-0">
					<Command>
						<CommandList>
							<CommandGroup heading="My Leases">
								{leases.map((lease) => (
									<CommandItem
										key={lease.id}
										onSelect={() => {
											setActiveLease(lease);
											router.push(`/leases/${lease.id}`);
											setOpen(false);
										}}
										className="text-sm"
									>
										{lease.name}
										<CheckIcon
											className={cn(
												"ml-auto size-4",
												activeLease?.id === lease.id
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() => {
											setOpen(false);
											setShowNewLeaseDialog(true);
										}}
									>
										<CirclePlusIcon className="mr-2 size-5" />
										Add a Lease
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() =>
											signOut({
												fetchOptions: {
													onSuccess: () => {
														setOpen(false);
														router.push("/");
													},
												},
											})
										}
									>
										<LogOutIcon className="mr-2 size-5" />
										Sign Out
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<DialogContent className="rounded-sm">
				<DialogHeader>
					<DialogTitle>Add a Lease</DialogTitle>
				</DialogHeader>

				<NewLeaseForm onFinished={() => setShowNewLeaseDialog(false)} />
			</DialogContent>
		</Dialog>
	);
}

function NewLeaseForm({ onFinished }: { onFinished: () => void }) {
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

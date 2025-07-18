"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	CaretSortIcon,
	CheckIcon,
	ExitIcon,
	PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldInput } from "~/components/field-input";
import { Button } from "~/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "~/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { type CreateLeaseInput, createLeaseSchema } from "~/schemas/lease";
import type { LeaseMineOutput } from "~/server/api/routers/lease";
import { api } from "~/trpc/react";

export default function LeaseSwitcher() {
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
						<CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
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
										<PlusCircledIcon className="mr-2 size-5" />
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
										onSelect={() => {
											void signOut();
										}}
									>
										<ExitIcon className="mr-2 size-5" />
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
			<FieldInput
				label="Name"
				errorMessage={errors.name?.message}
				placeholder="My Car Lease"
				{...register("name")}
			/>

			<FieldInput
				type="date"
				label="Start Date"
				errorMessage={errors.startDate?.message}
				{...register("startDate", {
					valueAsDate: true,
				})}
			/>

			<FieldInput
				type="number"
				label="Number of Months"
				placeholder="36"
				errorMessage={errors.numberOfMonths?.message}
				{...register("numberOfMonths", {
					valueAsNumber: true,
				})}
			/>

			<FieldInput
				type="number"
				label="Miles at Start of Lease"
				placeholder="0"
				errorMessage={errors.initialMiles?.message}
				{...register("initialMiles", {
					valueAsNumber: true,
				})}
			/>

			<FieldInput
				type="number"
				label="Allowed Miles"
				placeholder="36000"
				errorMessage={errors.allowedMiles?.message}
				{...register("allowedMiles", {
					valueAsNumber: true,
				})}
			/>

			<FieldInput
				type="number"
				label="Excess Fee Per Mile"
				placeholder="25"
				errorMessage={errors.excessFeePerMileInCents?.message}
				{...register("excessFeePerMileInCents", {
					valueAsNumber: true,
				})}
			/>

			<Button className="w-full" type="submit" disabled={isPending}>
				Submit
			</Button>
			<Button onClick={onFinished} variant="outline" className="w-full">
				Cancel
			</Button>
		</form>
	);
}

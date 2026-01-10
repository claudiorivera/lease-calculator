"use client";

import {
	CheckIcon,
	ChevronsUpDownIcon,
	CirclePlusIcon,
	LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NewLeaseForm } from "@/components/new-lease-form";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
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
								<CommandItem
									onSelect={() =>
										signOut({
											fetchOptions: {
												onSuccess: () => {
													setOpen(false);
													setActiveLease(null);
													router.push("/");
													router.refresh();
												},
											},
										})
									}
								>
									<LogOutIcon className="mr-2 size-5" />
									Sign Out
								</CommandItem>
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

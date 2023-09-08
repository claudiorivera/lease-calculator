import { type RouterOutputs } from "~/trpc/shared";

export function LeaseDetailsView({
	lease,
}: {
	lease: NonNullable<RouterOutputs["lease"]["byId"]>;
}) {
	return <pre>{JSON.stringify(lease, null, 2)}</pre>;
}

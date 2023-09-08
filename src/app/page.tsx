import { getAllLeases } from "~/app/actions";

export default async function HomePage() {
	const leases = await getAllLeases();

	return <pre>{JSON.stringify(leases, null, 2)}</pre>;
}

import { NewLeaseForm } from "~/app/leases/new/NewLeaseForm";

export default function NewLeasePage() {
	return (
		<main className="container mx-auto max-w-md py-4">
			<h1>New Lease</h1>

			<NewLeaseForm />
		</main>
	);
}

import { redirect } from "next/navigation";
import { NewLeaseForm } from "~/components/NewLeaseForm";
import { getServerAuthSession } from "~/server/auth";

export default async function NewLeasePage() {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	return <NewLeaseForm />;
}

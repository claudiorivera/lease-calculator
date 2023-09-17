import { redirect } from "next/navigation";
import { LeaseDetails } from "~/components/LeaseDetails";
import { getServerAuthSession } from "~/server/auth";

export default async function LeaseDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	return <LeaseDetails id={params.id} />;
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { LeaseDetails } from "~/components/LeaseDetails";
import { Button } from "~/components/ui/button";
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

	return (
		<Fragment>
			<Button asChild variant="ghost">
				<Link href="/">Back</Link>
			</Button>

			<section>
				<LeaseDetails id={params.id} />
			</section>
		</Fragment>
	);
}

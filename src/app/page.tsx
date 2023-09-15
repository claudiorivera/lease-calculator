import { redirect } from "next/navigation";
import { CurrentUserLeaseList } from "~/components/CurrentUserLeaseList";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
	const session = await getServerAuthSession();

	if (!session) {
		return redirect("/welcome");
	}

	return <CurrentUserLeaseList />;
}

import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "~/server/api/root";

export function LeaseDetailsLoadingError({
	error,
}: {
	error: TRPCClientErrorLike<AppRouter>;
}) {
	return (
		<div>
			<h1>{error.shape?.data.code}</h1>

			<pre>{error.message}</pre>
		</div>
	);
}

export function LeasePredictions({
	estimatedFeesAtEndOfLease,
	estimatedExcessMiles,
	excessFeePerMileInCents,
}: {
	estimatedFeesAtEndOfLease: number;
	estimatedExcessMiles: number;
	excessFeePerMileInCents: number;
}) {
	return (
		<section className="flex w-full flex-col items-center gap-4">
			<p className="text-xl font-semibold">Predictions</p>
			<div className="w-full rounded bg-neutral-200 p-8 text-center dark:bg-neutral-800">
				<p className="text-6xl font-black">
					${(estimatedFeesAtEndOfLease / 100).toFixed(2)}
				</p>
				<div className="h-4"></div>
				<p>
					total fees{" "}
					<span className="font-semibold">
						with {Math.abs(Math.round(estimatedExcessMiles))} miles{" "}
						{estimatedExcessMiles > 0 ? "over" : "under"}
					</span>{" "}
					your allowance at{" "}
					<span className="font-semibold">
						${(excessFeePerMileInCents / 100).toFixed(2)} per mile
					</span>
				</p>
			</div>
		</section>
	);
}

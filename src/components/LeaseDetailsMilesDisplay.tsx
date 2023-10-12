export function MilesDisplay({
	milesOverOrUnder,
	daysElapsedPercentage,
}: {
	milesOverOrUnder: number;
	daysElapsedPercentage: number;
}) {
	return (
		<section className="w-full rounded bg-neutral-200 p-8 text-center dark:bg-neutral-800">
			<p className="text-6xl font-black">{Math.abs(milesOverOrUnder)}</p>
			<div className="h-4"></div>
			<p>
				miles{" "}
				<span className="font-semibold">
					{milesOverOrUnder > 0 ? "over" : "under"}
				</span>{" "}
				your allowance
			</p>
			<p>
				with <span className="font-semibold">{daysElapsedPercentage}%</span> of
				lease elapsed
			</p>
		</section>
	);
}

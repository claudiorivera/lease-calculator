import { DisplayValueAndLabel } from "~/components/DisplayValueAndLabel";
import { Button } from "~/components/ui/button";

export function LeaseDetailsLoadingSkeleton() {
	const estimatedMilesToDate = 0;
	const daysElapsedPercentage = 0;
	const currentOdometerReading = 0;
	const allowedMilesToDate = 0;
	const leaseDaysRemaining = 0;

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col items-center">
				<h1 className="text-lg">Current Status</h1>
				<Button variant="ghost" disabled>
					Update Now
				</Button>
			</div>
			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center py-8">
					<p className="text-4xl font-black">
						{Math.abs(estimatedMilesToDate)}
					</p>
					<p>
						miles{" "}
						<span className="font-semibold">
							{estimatedMilesToDate > 0 ? "over" : "under"}
						</span>{" "}
						your allowance
					</p>
				</div>
				<p className="text-sm">
					<span className="font-semibold">{daysElapsedPercentage}%</span> of
					lease elapsed
				</p>
			</div>
			<div className="flex w-full justify-evenly py-8">
				<DisplayValueAndLabel
					label="Current Miles"
					value={currentOdometerReading}
				/>
				<div className="w-0.5 bg-neutral-100"></div>
				<DisplayValueAndLabel
					label="Allowed Miles"
					value={allowedMilesToDate}
				/>
				<div className="w-0.5 bg-neutral-100"></div>
				<DisplayValueAndLabel
					label="Days Remaining"
					value={leaseDaysRemaining}
				/>
			</div>
		</div>
	);
}

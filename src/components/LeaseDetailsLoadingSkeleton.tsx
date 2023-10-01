import { MilesDisplay } from "~/components/LeaseDetailsMilesDisplay";
import { LeaseStats } from "~/components/LeaseDetailsStats";
import { Button } from "~/components/ui/button";

export function LeaseDetailsLoadingSkeleton() {
	const estimatedMilesToDate = 0;
	const daysElapsedPercentage = 0;
	const currentOdometerReading = 0;
	const allowedMilesToDate = 0;
	const leaseDaysRemaining = 0;

	return (
		<div className="flex flex-col items-center gap-6">
			<section className="flex flex-col items-center">
				<p className="py-1 text-xl font-semibold">Current Status</p>
				<Button variant="link">Update Now</Button>
			</section>

			<MilesDisplay
				daysElapsedPercentage={daysElapsedPercentage}
				estimatedMilesToDate={estimatedMilesToDate}
			/>

			<LeaseStats
				allowedMilesToDate={allowedMilesToDate}
				currentOdometerReading={currentOdometerReading}
				leaseDaysRemaining={leaseDaysRemaining}
			/>
		</div>
	);
}

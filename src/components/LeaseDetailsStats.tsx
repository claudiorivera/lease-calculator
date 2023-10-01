import { DisplayValueAndLabel } from "~/components/DisplayValueAndLabel";

export function LeaseStats({
	currentOdometerReading,
	allowedMilesToDate,
	leaseDaysRemaining,
}: {
	currentOdometerReading: number;
	allowedMilesToDate: number;
	leaseDaysRemaining: number;
}) {
	return (
		<section className="flex w-full justify-evenly">
			<DisplayValueAndLabel
				label="Current Miles"
				value={currentOdometerReading}
			/>
			<div className="w-0.5 bg-neutral-100"></div>
			<DisplayValueAndLabel label="Allowed Miles" value={allowedMilesToDate} />
			<div className="w-0.5 bg-neutral-100"></div>
			<DisplayValueAndLabel label="Days Remaining" value={leaseDaysRemaining} />
		</section>
	);
}

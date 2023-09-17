export function DisplayValueAndLabel({
	value,
	label,
}: {
	value: number;
	label: string;
}) {
	return (
		<div className="flex flex-col items-center">
			<p className="text-xl">{value}</p>
			<p className="text-sm">{label}</p>
		</div>
	);
}

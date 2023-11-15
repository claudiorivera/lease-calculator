import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/server";

export default async function OdometerReadingsPage({
	params,
}: {
	params: { leaseId: string };
}) {
	const odometerReadings = await api.odometerReading.byLeaseId.query(
		params.leaseId,
	);

	return (
		<div>
			<h1 className="py-4 text-xl font-semibold">Odometer Readings</h1>

			<ul className="flex flex-col">
				{odometerReadings.map((odometerReading) => (
					<li key={odometerReading.id}>
						<Link
							href={`/leases/${params.leaseId}/odometer-readings/${odometerReading.id}`}
							className="flex justify-between py-2 hover:opacity-50"
						>
							<div>{odometerReading.createdAt.toLocaleDateString()}</div>
							<div className="flex items-center">
								{odometerReading.miles}
								<ChevronRight className="h-4" />
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

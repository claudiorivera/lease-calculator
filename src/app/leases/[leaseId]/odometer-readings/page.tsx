import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function OdometerReadingsPage(props: {
	params: Promise<{ leaseId: string }>;
}) {
	const params = await props.params;
	const odometerReadings = await api.odometerReading.byLeaseId(params.leaseId);

	return (
		<div>
			<h1 className="text-xl font-semibold">Odometer Readings</h1>

			<ul className="flex flex-col py-4">
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

			<Button asChild className="w-full">
				<Link href={`/leases/${params.leaseId}`}>Back to Lease</Link>
			</Button>
		</div>
	);
}

"use client";

import {
	Area,
	CartesianGrid,
	ComposedChart,
	Label,
	Line,
	XAxis,
	YAxis,
} from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { getLeaseChartData } from "@/lib/leases";
import type { LeaseByIdOutput } from "@/server/api/routers/lease";

export function LeaseChart({ lease }: { lease: LeaseByIdOutput }) {
	const data = getLeaseChartData({
		lease,
	});

	const chartConfig = {
		odometerReading: {
			label: "Miles",
		},
		expectedOdometerReading: {
			label: "Expected Miles",
		},
	} satisfies ChartConfig;

	return (
		<section>
			<ChartContainer
				config={chartConfig}
				className="aspect-square min-h-[375px] w-full"
			>
				<ComposedChart data={data} accessibilityLayer>
					<CartesianGrid stroke="gray" />
					<XAxis type="number" dataKey="monthsSinceLeaseStart" tickLine={false}>
						<Label position="insideBottom" offset={-2}>
							Months
						</Label>
					</XAxis>
					<YAxis
						type="number"
						dataKey="expectedOdometerReading"
						tickLine={false}
					>
						<Label angle={-90} position="insideLeft" offset={8}>
							Miles
						</Label>
					</YAxis>
					<Area
						dataKey="expectedOdometerReading"
						fill="gray"
						stroke="white"
						strokeDasharray="3"
					/>
					<Line dataKey="odometerReading" stroke="white" />
				</ComposedChart>
			</ChartContainer>
		</section>
	);
}

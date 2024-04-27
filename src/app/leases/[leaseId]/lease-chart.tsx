"use client";

import { AgChartsReact } from "ag-charts-react";
import { useTheme } from "next-themes";
import { getLeaseChartData } from "~/lib/leases";
import type { LeaseByIdOutput } from "~/server/api/routers/lease";

export function LeaseChart({
	lease,
}: {
	lease: LeaseByIdOutput;
}) {
	const data = getLeaseChartData({
		lease,
	});

	const { resolvedTheme } = useTheme();
	const isDarkMode = resolvedTheme === "dark";

	const DEFAULT_COLOR = "gray";
	const BG_NEUTRAL = isDarkMode ? "#262626" : "#e5e5e5";

	return (
		<section className="w-full aspect-square">
			<AgChartsReact
				options={{
					theme: {
						baseTheme: isDarkMode ? "ag-default-dark" : "ag-default",
						palette: {
							fills: isDarkMode
								? [DEFAULT_COLOR, "white"]
								: [DEFAULT_COLOR, "black"],
							strokes: [DEFAULT_COLOR],
						},
						overrides: {
							common: {
								background: {
									fill: BG_NEUTRAL,
								},
							},
						},
					},
					legend: {
						enabled: false,
					},
					axes: [
						{
							type: "number",
							position: "left",
							min: lease.initialMiles,
							max: lease.allowedMiles + lease.initialMiles,
							nice: false,
							tick: {
								interval: lease.allowedMiles / 6,
								color: BG_NEUTRAL,
							},
							label: {
								formatter: ({ index, value }) => (index === 0 ? "" : value),
							},
							gridLine: {
								style: [
									{
										stroke: DEFAULT_COLOR,
									},
								],
							},
						},
						{
							type: "number",
							position: "bottom",
							min: 0,
							max: lease.numberOfMonths,
							tick: {
								interval: lease.numberOfMonths / 6,
								color: BG_NEUTRAL,
							},
							label: {
								formatter: ({ index, value }) => (index === 0 ? "" : value),
							},
							gridLine: {
								style: [
									{
										stroke: DEFAULT_COLOR,
									},
								],
							},
						},
					],
					data,
					series: [
						{
							type: "area",
							xKey: "monthsSinceLeaseStart",
							yKey: "expectedOdometerReading",
							tooltip: {
								enabled: false,
							},
							fillOpacity: 0.25,
							lineDash: [3, 3],
							strokeWidth: 1,
						},
						{
							type: "line",
							xKey: "monthsSinceLeaseStart",
							yKey: "odometerReading",
							tooltip: {
								enabled: false,
							},
						},
					],
				}}
			/>
		</section>
	);
}

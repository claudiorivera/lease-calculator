"use client";

import { AgChartsReact } from "ag-charts-react";
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

	const milesMin = lease.initialMiles;
	const milesMax = lease.allowedMiles + lease.initialMiles;
	const milesInterval = (milesMax - milesMin) / 6;

	const monthsMin = 0;
	const monthsMax = lease.numberOfMonths;
	const monthsInterval = monthsMax / 6;

	return (
		<section className="w-full">
			<AgChartsReact
				options={{
					theme: {
						baseTheme: "ag-default-dark",
						palette: {
							fills: ["white"],
							strokes: ["white"],
						},
						overrides: {
							common: {
								background: {
									fill: "transparent",
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
							min: milesMin,
							max: milesMax,
							nice: false,
							tick: {
								interval: milesInterval,
								color: "white",
							},
							label: {
								formatter: ({ index, value }) =>
									index === 0 ? "" : `${value}`,
							},
							gridLine: {
								style: [
									{
										stroke: "gray",
									},
								],
							},
						},
						{
							type: "number",
							position: "bottom",
							min: monthsMin,
							max: monthsMax,
							tick: {
								interval: monthsInterval,
								color: "white",
							},
							label: {
								formatter: ({ index, value }) =>
									index === 0 ? "" : `${value}`,
							},
							gridLine: {
								style: [
									{
										stroke: "gray",
									},
								],
							},
						},
					],
					data,
					series: [
						{
							type: "line",
							xKey: "monthsSinceLeaseStart",
							yKey: "odometerReading",
							tooltip: {
								enabled: false,
							},
						},
						{
							type: "area",
							xKey: "monthsSinceLeaseStart",
							yKey: "expectedOdometerReading",
							fillOpacity: 0.05,
							lineDash: [3, 3],
							strokeWidth: 1,
						},
					],
				}}
			/>
		</section>
	);
}

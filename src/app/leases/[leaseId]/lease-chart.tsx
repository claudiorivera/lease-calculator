"use client";

import { AgChartsReact } from "ag-charts-react";

export function LeaseChart() {
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
							min: 0,
							max: 36000,
							nice: false,
							tick: {
								interval: 6000,
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
							min: 0,
							max: 36,
							tick: {
								interval: 6,
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
					data: [
						{
							monthsSinceLeaseStart: 0,
							odometerReading: 0,
							expectedOdometerReading: 0,
						},
						{
							monthsSinceLeaseStart: 18,
							odometerReading: 21000,
							expectedOdometerReading: 18000,
						},
						{
							monthsSinceLeaseStart: 25,
							odometerReading: 21000,
							expectedOdometerReading: 25000,
						},
						{
							monthsSinceLeaseStart: 36,
							expectedOdometerReading: 36000,
						},
					],
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

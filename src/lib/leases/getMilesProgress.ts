export function getMilesProgress(
	allowedMiles: number,
	latestOdometerReading: number,
) {
	if (latestOdometerReading <= 0) return 0;

	return latestOdometerReading / allowedMiles;
}

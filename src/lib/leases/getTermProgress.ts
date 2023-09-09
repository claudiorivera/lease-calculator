export function getTermProgress(startDate: Date, numberOfMonths: number) {
	const currentDate = new Date();
	const startYear = startDate.getFullYear();
	const startMonth = startDate.getMonth();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	const monthsElapsed =
		(currentYear - startYear) * 12 + (currentMonth - startMonth);

	return monthsElapsed / numberOfMonths;
}

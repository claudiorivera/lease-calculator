import dayjs from "dayjs";

export function getDaysSince(date: Date) {
	const now = dayjs();
	const then = dayjs(date);

	return now.diff(then, "day");
}

export function getLastDay({
	startDate,
	numberOfMonths,
}: {
	startDate: Date;
	numberOfMonths: number;
}) {
	return dayjs(startDate).add(numberOfMonths, "month").toDate();
}

export function getNumberOfDays({ start, end }: { start: Date; end: Date }) {
	return dayjs(end).diff(dayjs(start), "day");
}

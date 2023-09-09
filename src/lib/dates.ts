import dayjs from "dayjs";

export const getDaysUntil = (date: Date) => {
	const now = dayjs();
	const then = dayjs(date);

	return then.diff(now, "day");
};

export const getLastDay = ({
	startDate,
	numberOfMonths,
}: {
	startDate: Date;
	numberOfMonths: number;
}) => {
	return dayjs(startDate).add(numberOfMonths, "month").toDate();
};

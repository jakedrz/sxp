export const formatDateRange = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const startDateFormattedString = startDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });

    const endDateStringMonth = (startDate.getMonth() === endDate.getMonth()) ? undefined : "short";
    const endDateFormattedString = endDate.toLocaleDateString(undefined, {
        month: endDateStringMonth,
        day: "numeric",
    });
    return `${startDateFormattedString}–${endDateFormattedString}`;
}

export const getWeekDifference = (start, end) => {
    return (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24 * 7);
}
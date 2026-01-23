const parseDateWithoutTimezone = (input) => {
    // Accept Date objects through
    if (input instanceof Date) return input;

    if (!input) return new Date(input);

    // Match YYYY-MM-DD or YYYY/MM/DD (date-only)
    const isoDash = /^(\d{4})-(\d{2})-(\d{2})$/;
    const isoSlash = /^(\d{4})\/(\d{2})\/(\d{2})$/;

    let m = isoDash.exec(input) || isoSlash.exec(input);
    if (m) {
        const [, year, month, day] = m;
        // Construct in local timezone so the calendar date is preserved across timezones
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    // Fallback for full datetime strings (will use normal Date parsing)
    return new Date(input);
}

export const formatDateRange = (startDateString, endDateString) => {
    const startDate = parseDateWithoutTimezone(startDateString);
    const endDate = parseDateWithoutTimezone(endDateString);

    // Treat the provided endDateString as exclusive: the last included day is endDate - 1 day
    const displayEndDate = new Date(endDate);
    displayEndDate.setDate(displayEndDate.getDate() - 1);

    const startDateFormattedString = startDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });

    const endDateStringMonth = (startDate.getMonth() === displayEndDate.getMonth()) ? undefined : "short";
    const endDateFormattedString = displayEndDate.toLocaleDateString(undefined, {
        month: endDateStringMonth,
        day: "numeric",
    });
    return `${startDateFormattedString}–${endDateFormattedString}`;
}

export const getWeekDifference = (start, end) => {
    const s = parseDateWithoutTimezone(start);
    const e = parseDateWithoutTimezone(end);

    // Compute difference using UTC day boundaries to avoid DST shifts
    const utcStart = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());
    const utcEnd = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
    const days = (utcEnd - utcStart) / (1000 * 60 * 60 * 24);

    return days / 7;
}
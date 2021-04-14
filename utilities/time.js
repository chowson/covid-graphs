export function ToUtc(date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}

export function AddDays(date, days) {
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    return date;
}

export function GetDateSuffix(dayOfMonth) {
    if (dayOfMonth > 3 && dayOfMonth < 21) return 'th';
    switch (dayOfMonth % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}
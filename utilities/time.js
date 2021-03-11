export function ToUtc(date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}

export function AddDays(date, days) {
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    return date;
}
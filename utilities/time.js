export function ToUtc(date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}
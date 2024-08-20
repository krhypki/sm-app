export function formatDate(date: Date) {
  return date.toLocaleString('en-GB', { timeZone: 'UTC' });
}

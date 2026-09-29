export function formatDate({
  dateString,
  time,
  format = 'short',
}: {
  dateString: string;
  time?: boolean;
  format?: 'long' | 'short';
}) {
  return new Intl.DateTimeFormat(format === 'long' ? "en-US" : "en-US", {
    month: format === 'long' ? "long" : "short",
    day: "numeric",
    year: "numeric",
    ...(time && {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  }).format(new Date(dateString));
}

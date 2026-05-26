export function googleCalendarUrl(params: {
  title: string;
  start: Date;
  end: Date;
  details?: string;
  location?: string;
}): string {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: params.title,
    dates: `${fmt(params.start)}/${fmt(params.end)}`,
    details: params.details ?? "",
    location: params.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

/** Generate ISO slot starts for next `days` days, respecting interval minutes and working hours */
export function generateSlots(
  intervalMinutes: number,
  days = 7,
  opts?: { startHour?: number; endHour?: number; excludePast?: boolean }
): string[] {
  const startHour = opts?.startHour ?? 9;
  const endHour = opts?.endHour ?? 18;
  const excludePast = opts?.excludePast ?? true;
  const slots: string[] = [];
  const now = new Date();

  for (let d = 0; d < days; d++) {
    const day = new Date(now);
    day.setDate(day.getDate() + d);
    day.setHours(startHour, 0, 0, 0);

    const end = new Date(day);
    end.setHours(endHour, 0, 0, 0);

    for (let t = new Date(day); t < end; t = new Date(t.getTime() + intervalMinutes * 60000)) {
      if (excludePast && t.getTime() < now.getTime() + 30 * 60000) continue;
      slots.push(t.toISOString());
    }
  }
  return slots;
}

export function formatSlotLabel(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Calendar Link & iCalendar (.ics) Generator
 * Timezone: Asia/Kolkata (IST: UTC+05:30)
 */

export interface CalendarEventParams {
  title: string;
  description: string;
  location: string;
  // ISO string with offset or UTC string
  startIso: string;
  // Default duration in minutes for calendar platforms that mandate an end-time
  defaultDurationMinutes: number;
  filename: string;
}

/**
 * Format date to UTC string format required by iCalendar and Google Calendar:
 * YYYYMMDDTHHmmssZ
 */
export function formatUtcToCalendarString(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/**
 * Generates a Google Calendar Web Intent URL
 */
export function createGoogleCalendarUrl(params: CalendarEventParams): string {
  const startDate = new Date(params.startIso);
  const endDate = new Date(startDate.getTime() + params.defaultDurationMinutes * 60 * 1000);

  const datesParam = `${formatUtcToCalendarString(startDate)}/${formatUtcToCalendarString(endDate)}`;

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", params.title);
  url.searchParams.set("dates", datesParam);
  url.searchParams.set("details", params.description);
  url.searchParams.set("location", params.location);
  url.searchParams.set("ctz", "Asia/Kolkata");

  return url.toString();
}

/**
 * Generates an RFC 5545 compliant .ics file content
 */
export function createIcsContent(params: CalendarEventParams): string {
  const now = new Date();
  const startDate = new Date(params.startIso);
  const endDate = new Date(startDate.getTime() + params.defaultDurationMinutes * 60 * 1000);

  const uid = `${startDate.getTime()}-${Math.random().toString(36).substring(2, 9)}@shebakenneth.wedding`;

  // Escape special chars for ICS: newlines -> \n, commas -> \,
  const cleanSummary = params.title.replace(/,/g, "\\,");
  const cleanDescription = params.description
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
  const cleanLocation = params.location.replace(/,/g, "\\,");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kenneth and Sheba Wedding//Official Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatUtcToCalendarString(now)}`,
    `DTSTART:${formatUtcToCalendarString(startDate)}`,
    `DTEND:${formatUtcToCalendarString(endDate)}`,
    `SUMMARY:${cleanSummary}`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${cleanLocation}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Triggers a browser download of the .ics file
 */
export function downloadIcsFile(params: CalendarEventParams): void {
  const icsData = createIcsContent(params);
  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", params.filename.endsWith(".ics") ? params.filename : `${params.filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}

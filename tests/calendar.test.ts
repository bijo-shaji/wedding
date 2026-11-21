import { describe, it, expect } from "vitest";
import {
  createGoogleCalendarUrl,
  createIcsContent,
  formatUtcToCalendarString,
  CalendarEventParams,
} from "../src/lib/calendar";

describe("Calendar Integration Library", () => {
  const sampleParams: CalendarEventParams = {
    title: "The Holy Matrimony — Kenneth Francis & Sheba Shaji",
    description: "Wedding ceremony at St Mary’s Cathedral Punalur.",
    location: "St Mary’s Cathedral Punalur, Kerala",
    startIso: "2027-01-11T11:00:00+05:30",
    defaultDurationMinutes: 240,
    filename: "kenneth-sheba-wedding",
  };

  it("formats dates into UTC calendar format YYYYMMDDTHHmmssZ", () => {
    // 2027-01-11T11:00:00+05:30 is 2027-01-11T05:30:00.000Z in UTC
    const date = new Date("2027-01-11T11:00:00+05:30");
    const formatted = formatUtcToCalendarString(date);
    expect(formatted).toBe("20270111T053000Z");
  });

  it("generates a valid Google Calendar URL with correct parameters", () => {
    const urlString = createGoogleCalendarUrl(sampleParams);
    const url = new URL(urlString);

    expect(url.hostname).toBe("calendar.google.com");
    expect(url.searchParams.get("action")).toBe("TEMPLATE");
    expect(url.searchParams.get("text")).toBe(sampleParams.title);
    expect(url.searchParams.get("location")).toBe(sampleParams.location);
    expect(url.searchParams.get("ctz")).toBe("Asia/Kolkata");
    expect(url.searchParams.get("dates")).toContain("20270111T053000Z");
  });

  it("generates RFC 5545 compliant .ics file content", () => {
    const ics = createIcsContent(sampleParams);

    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("VERSION:2.0");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("DTSTART:20270111T053000Z");
    expect(ics).toContain("DTEND:20270111T093000Z"); // + 240 minutes = 4 hours
    expect(ics).toContain("SUMMARY:The Holy Matrimony — Kenneth Francis & Sheba Shaji");
    expect(ics).toContain("STATUS:CONFIRMED");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toContain("END:VCALENDAR");
  });
});

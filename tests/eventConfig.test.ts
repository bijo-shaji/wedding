import { describe, it, expect } from "vitest";
import { EVENT_CONFIG } from "../src/config/event";

describe("Official Event Details & Integrity", () => {
  it("has exact couple and parent names", () => {
    expect(EVENT_CONFIG.couple.bride.fullName).toBe("Sheba Shaji");
    expect(EVENT_CONFIG.couple.groom.fullName).toBe("Kenneth Francis");

    expect(EVENT_CONFIG.couple.bride.parents.father).toBe("Shaji Mathew");
    expect(EVENT_CONFIG.couple.bride.parents.mother).toBe("Bindhu Shaji");

    expect(EVENT_CONFIG.couple.groom.parents.father).toBe("Francis Jose");
    expect(EVENT_CONFIG.couple.groom.parents.mother).toBe("Ligy Varghese");
  });

  it("has exact Bible verse and reference", () => {
    expect(EVENT_CONFIG.bibleVerse.verse).toBe(
      "What therefore God has joined together, let no one separate."
    );
    expect(EVENT_CONFIG.bibleVerse.reference).toBe("Matthew 19:6");
  });

  it("verifies chronological order: Engagement precedes Holy Matrimony", () => {
    expect(EVENT_CONFIG.engagement.timestampMs).toBeLessThan(
      EVENT_CONFIG.matrimony.timestampMs
    );
    expect(EVENT_CONFIG.engagement.dateFormatted).toBe("January 2, 2027");
    expect(EVENT_CONFIG.matrimony.dateFormatted).toBe("January 11, 2027");
  });

  it("has exact venues and locations", () => {
    expect(EVENT_CONFIG.engagement.venueName).toBe(
      "Landmark Convention Center & Auditorium"
    );
    expect(EVENT_CONFIG.engagement.locationLine).toContain("Valakom");

    expect(EVENT_CONFIG.matrimony.churchName).toBe(
      "Saint Mary's Roman Catholic Cathedral"
    );
    expect(EVENT_CONFIG.matrimony.locationLine).toContain("Punalur");

    expect(EVENT_CONFIG.reception.venueName).toBe("K G Convention Centre");
    expect(EVENT_CONFIG.reception.locationLine).toContain("Punalur");
    expect(EVENT_CONFIG.reception.timeFormatted).toBe(
      "Reception to follow the wedding ceremony"
    );
  });

  it("has exact developer credit: Bijo Shaji", () => {
    expect(EVENT_CONFIG.organizer.creditDeveloper).toBe("Bijo Shaji");
  });

  it("configures background wedding melody properly", () => {
    expect(EVENT_CONFIG.features.enableBackgroundMusic).toBe(true);
    expect(EVENT_CONFIG.features.backgroundMusicUrl).toBe("/audio/wedding-melody.mp3");
  });
});

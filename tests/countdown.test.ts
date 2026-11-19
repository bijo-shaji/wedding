import { describe, it, expect } from "vitest";
import { calculateTimeRemaining } from "../src/hooks/useCountdown";

describe("Countdown Calculations", () => {
  it("calculates positive days, hours, minutes, and seconds for future dates", () => {
    // 2 days, 3 hours, 4 minutes, 5 seconds in the future
    const baseNow = 1700000000000;
    const offsetMs =
      (2 * 24 * 60 * 60 + 3 * 60 * 60 + 4 * 60 + 5) * 1000;
    const targetMs = baseNow + offsetMs;

    const remaining = calculateTimeRemaining(targetMs, baseNow);
    expect(remaining.isCompleted).toBe(false);
    expect(remaining.days).toBe(2);
    expect(remaining.hours).toBe(3);
    expect(remaining.minutes).toBe(4);
    expect(remaining.seconds).toBe(5);
  });

  it("clamps to 0 and flags isCompleted = true for past events without negative numbers", () => {
    const pastTimestamp = Date.now() - 50000;
    const remaining = calculateTimeRemaining(pastTimestamp);

    expect(remaining.isCompleted).toBe(true);
    expect(remaining.days).toBe(0);
    expect(remaining.hours).toBe(0);
    expect(remaining.minutes).toBe(0);
    expect(remaining.seconds).toBe(0);
    expect(remaining.totalRemainingMs).toBe(0);
  });
});

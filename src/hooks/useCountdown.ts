import { useState, useEffect } from "react";

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
  totalRemainingMs: number;
}

export function calculateTimeRemaining(targetTimestampMs: number): CountdownState {
  const now = Date.now();
  const diff = targetTimestampMs - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCompleted: true,
      totalRemainingMs: 0,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    isCompleted: false,
    totalRemainingMs: diff,
  };
}

/**
 * Isolated countdown hook that ticks every second and clamps to 0 when completed.
 */
export function useCountdown(targetTimestampMs: number): CountdownState {
  const [state, setState] = useState<CountdownState>(() =>
    calculateTimeRemaining(targetTimestampMs)
  );

  useEffect(() => {
    // If already passed, no need to start interval
    if (state.isCompleted) return;

    const intervalId = setInterval(() => {
      const updated = calculateTimeRemaining(targetTimestampMs);
      setState(updated);

      if (updated.isCompleted) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTimestampMs, state.isCompleted]);

  return state;
}

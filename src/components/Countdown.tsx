import React from "react";
import { useCountdown } from "../hooks/useCountdown";
import { Clock, CheckCircle2 } from "lucide-react";

interface CountdownProps {
  targetTimestampMs: number;
  eventName: string;
  completedText?: string;
  className?: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetTimestampMs,
  eventName,
  completedText = "Celebrated with Joy & Love",
  className = "",
}) => {
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(targetTimestampMs);

  if (isCompleted) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage-100/90 border border-sage-300 text-sage-700 text-xs sm:text-sm font-cinzel tracking-wider shadow-xs ${className}`}
      >
        <CheckCircle2 className="w-4 h-4 text-sage-600" />
        <span>{completedText}</span>
      </div>
    );
  }

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-1.5 text-xs font-cinzel text-gold-600 tracking-widest uppercase mb-3">
        <Clock className="w-3.5 h-3.5" />
        <span>Countdown to {eventName}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center w-16 sm:w-20 py-2 sm:py-3 px-1 rounded-xl bg-white/80 border border-gold-300/40 shadow-xs backdrop-blur-xs"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-burgundy-700 leading-tight">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="font-cinzel text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 mt-0.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { EVENT_CONFIG } from "../config/event";
import { Countdown } from "./Countdown";
import { GoldenCross, GoldDivider } from "./FloralDecorations";
import {
  createGoogleCalendarUrl,
  downloadIcsFile,
  type CalendarEventParams,
} from "../lib/calendar";
import {
  Calendar,
  Clock,
  Church,
  Navigation,
  CalendarPlus,
  Download,
  ExternalLink,
  Users,
} from "lucide-react";

export const Wedding: React.FC = () => {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  const weddingCalendarParams: CalendarEventParams = {
    title: `Holy Matrimony — Sheba Shaji & Kenneth Francis`,
    description: `Holy Matrimony service of Sheba Shaji & Kenneth Francis at ${EVENT_CONFIG.matrimony.churchName}, ${EVENT_CONFIG.matrimony.locationLine}. Time: ${EVENT_CONFIG.matrimony.timeFormatted}. Reception to follow at ${EVENT_CONFIG.reception.venueName}.`,
    location: EVENT_CONFIG.matrimony.fullAddress,
    startIso: EVENT_CONFIG.matrimony.isoDateTime,
    defaultDurationMinutes: 240,
    filename: "sheba-kenneth-holy-matrimony",
  };

  const googleCalUrl = createGoogleCalendarUrl(weddingCalendarParams);

  const handleDownloadIcs = () => {
    downloadIcsFile(weddingCalendarParams);
    setCalendarMenuOpen(false);
  };

  return (
    <section
      id="wedding"
      className="relative py-16 sm:py-24 px-4 max-w-5xl mx-auto scroll-mt-24"
    >
      {/* Holy Matrimony Container with Cathedral Altar & Sanctuary Backdrop Image */}
      <div
        className="relative rounded-3xl p-6 sm:p-12 md:p-14 shadow-2xl overflow-hidden border-2 border-gold-400/80"
        style={{
          backgroundImage: "url('/images/container-wedding.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Soft crystalline veil allowing the Cathedral arches, rose window & altar candles to be clearly visible */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <GoldenCross size={48} className="mb-2" />

          <span className="inline-block px-5 py-1.5 rounded-full text-xs font-cinzel font-bold tracking-[0.2em] text-burgundy-900 bg-white/95 border border-gold-300 uppercase mb-3 shadow-sm">
            Sacred Nuptial Service
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-950 leading-tight drop-shadow-xs">
            {EVENT_CONFIG.matrimony.title}
          </h2>

          <div className="my-3 flex flex-col items-center">
            <h3 className="font-script text-4xl sm:text-5xl md:text-6xl text-burgundy-900 drop-shadow-xs">
              {EVENT_CONFIG.couple.bride.fullName}
            </h3>
            <span className="font-serif italic text-2xl sm:text-3xl text-gold-600 my-0.5 font-bold">&amp;</span>
            <h3 className="font-script text-4xl sm:text-5xl md:text-6xl text-burgundy-900 drop-shadow-xs">
              {EVENT_CONFIG.couple.groom.fullName}
            </h3>
          </div>

          <GoldDivider className="my-3" />

          {/* PARENTS COLUMNS in Solid Contrast Frame */}
          <div className="w-full max-w-3xl bg-white/95 rounded-2xl border border-gold-300/80 p-6 sm:p-7 mb-8 shadow-md backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 text-gold-700 font-cinzel text-xs font-bold tracking-wider uppercase mb-5">
              <Users className="w-4 h-4" />
              <span>With the Blessings of Our Beloved Parents</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              {/* Bride's Parents */}
              <div className="sm:border-r sm:border-gold-300/50 sm:pr-4">
                <span className="font-cinzel text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">
                  Bride&apos;s Parents
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold text-burgundy-950">
                  {EVENT_CONFIG.couple.bride.parents.father}
                </p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-burgundy-950">
                  &amp; {EVENT_CONFIG.couple.bride.parents.mother}
                </p>
              </div>

              {/* Groom's Parents */}
              <div className="sm:pl-4">
                <span className="font-cinzel text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">
                  Groom&apos;s Parents
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold text-burgundy-950">
                  {EVENT_CONFIG.couple.groom.parents.father}
                </p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-burgundy-950">
                  &amp; {EVENT_CONFIG.couple.groom.parents.mother}
                </p>
              </div>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8">
            {/* Date Card */}
            <div className="flex flex-col items-center p-5 rounded-2xl bg-white/95 border border-gold-300/80 shadow-md hover:border-gold-500 hover:shadow-lg transition-all">
              <div className="w-11 h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-bold">
                {EVENT_CONFIG.matrimony.dayOfWeek}
              </span>
              <span className="font-serif text-lg sm:text-xl font-bold text-burgundy-950 mt-0.5">
                {EVENT_CONFIG.matrimony.dateFormatted}
              </span>
            </div>

            {/* Time Card */}
            <div className="flex flex-col items-center p-5 rounded-2xl bg-white/95 border border-gold-300/80 shadow-md hover:border-gold-500 hover:shadow-lg transition-all">
              <div className="w-11 h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-bold">
                Time
              </span>
              <span className="font-serif text-lg sm:text-xl font-bold text-burgundy-950 mt-0.5">
                {EVENT_CONFIG.matrimony.timeFormatted}
              </span>
            </div>

            {/* Church Card */}
            <div className="flex flex-col items-center p-5 rounded-2xl bg-white/95 border border-gold-300/80 shadow-md hover:border-gold-500 hover:shadow-lg transition-all">
              <div className="w-11 h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <Church className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-bold">
                Cathedral
              </span>
              <span className="font-serif text-sm font-bold text-burgundy-950 text-center leading-snug mt-0.5">
                {EVENT_CONFIG.matrimony.churchName}
              </span>
              <span className="font-sans text-[11px] text-slate-600 mt-0.5 font-semibold">
                Punalur, Kerala
              </span>
            </div>
          </div>

          {/* Timezone-aware Countdown to Wedding in contrast panel */}
          <div className="mb-8 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-gold-300/70 shadow-md">
            <Countdown
              targetTimestampMs={EVENT_CONFIG.matrimony.timestampMs}
              eventName="The Holy Matrimony"
              completedText="United in Holy Matrimony"
            />
          </div>

          {/* Action Buttons: Add to Calendar & Directions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-md">
            {/* Get Directions */}
            <a
              href={EVENT_CONFIG.matrimony.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-lg transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Add to Calendar Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCalendarMenuOpen((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-burgundy-800 border-2 border-gold-400 font-cinzel text-xs tracking-wider uppercase font-bold shadow-md transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <CalendarPlus className="w-4 h-4 text-gold-600" />
                <span>Add to Calendar</span>
              </button>

              {calendarMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-gold-300 p-2 z-20 text-left animate-in fade-in zoom-in-95">
                  <a
                    href={googleCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCalendarMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-sans font-medium text-slate-700 hover:bg-gold-50 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-burgundy-600" />
                    <span>Google Calendar</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleDownloadIcs}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-sans font-medium text-slate-700 hover:bg-gold-50 transition-colors"
                  >
                    <Download className="w-4 h-4 text-gold-600" />
                    <span>Apple / Outlook (.ics)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

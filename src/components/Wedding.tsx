import React, { useState } from "react";
import { EVENT_CONFIG } from "../config/event";
import { Countdown } from "./Countdown";
import { GoldenCross, GoldDivider } from "./FloralDecorations";
import { KeralaMinnuMotif } from "./TraditionMotifs";
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
      className="py-14 sm:py-20 px-4 max-w-4xl mx-auto scroll-mt-24"
    >
      <div className="gold-border-card rounded-3xl p-6 sm:p-10 md:p-12 shadow-wedding relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F5EBDC]">
        <div className="flex flex-col items-center text-center">
          {/* Traditional Kerala Christian Minnu (താലികെട്ട് / മിന്നുകെട്ട്) with 21 beads cross */}
          <div className="mb-3">
            <KeralaMinnuMotif size={115} />
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold tracking-widest text-burgundy-800 bg-burgundy-50 border border-burgundy-200 uppercase mb-2">
            Sacred Minnukettu &bull; മിന്നുകെട്ട്
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-800 leading-tight">
            {EVENT_CONFIG.matrimony.title}
          </h2>

          <div className="my-2 flex flex-col items-center">
            <h3 className="font-script text-3xl sm:text-4xl md:text-5xl text-burgundy-800 drop-shadow-xs">
              {EVENT_CONFIG.couple.bride.fullName}
            </h3>
            <span className="font-serif italic text-xl sm:text-2xl text-gold-600 my-0.5 font-bold">&amp;</span>
            <h3 className="font-script text-3xl sm:text-4xl md:text-5xl text-burgundy-800 drop-shadow-xs">
              {EVENT_CONFIG.couple.groom.fullName}
            </h3>
          </div>

          <GoldenCross size={34} className="my-1" />
          <GoldDivider className="my-3" />

          {/* PARENTS COLUMNS */}
          <div className="w-full max-w-2xl bg-white/80 rounded-2xl border border-gold-300/60 p-5 sm:p-6 mb-8 shadow-xs">
            <div className="flex items-center justify-center gap-2 text-gold-700 font-cinzel text-xs font-bold tracking-wider uppercase mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>With the Blessings of Our Beloved Parents</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              {/* Bride's Parents */}
              <div className="sm:border-r sm:border-gold-300/40 sm:pr-4">
                <span className="font-cinzel text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  Bride&apos;s Parents
                </span>
                <p className="font-serif text-xl font-bold text-burgundy-900">
                  {EVENT_CONFIG.couple.bride.parents.father}
                </p>
                <p className="font-serif text-xl font-bold text-burgundy-900">
                  &amp; {EVENT_CONFIG.couple.bride.parents.mother}
                </p>
              </div>

              {/* Groom's Parents */}
              <div className="sm:pl-4">
                <span className="font-cinzel text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  Groom&apos;s Parents
                </span>
                <p className="font-serif text-xl font-bold text-burgundy-900">
                  {EVENT_CONFIG.couple.groom.parents.father}
                </p>
                <p className="font-serif text-xl font-bold text-burgundy-900">
                  &amp; {EVENT_CONFIG.couple.groom.parents.mother}
                </p>
              </div>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
            {/* Date Card */}
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/80 border border-gold-300/60 shadow-xs hover:border-gold-400 transition-colors">
              <div className="w-11 h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-semibold">
                {EVENT_CONFIG.matrimony.dayOfWeek}
              </span>
              <span className="font-serif text-lg font-bold text-burgundy-900">
                {EVENT_CONFIG.matrimony.dateFormatted}
              </span>
            </div>

            {/* Time Card */}
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/80 border border-gold-300/60 shadow-xs hover:border-gold-400 transition-colors">
              <div className="w-11 h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Time
              </span>
              <span className="font-serif text-lg font-bold text-burgundy-900">
                {EVENT_CONFIG.matrimony.timeFormatted}
              </span>
            </div>

            {/* Church Card */}
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/80 border border-gold-300/60 shadow-xs hover:border-gold-400 transition-colors">
              <div className="w-11 h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <Church className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Church
              </span>
              <span className="font-serif text-sm font-bold text-burgundy-900 text-center leading-snug">
                {EVENT_CONFIG.matrimony.churchName}
              </span>
              <span className="font-sans text-[11px] text-slate-500 mt-0.5">
                Punalur, Kerala
              </span>
            </div>
          </div>

          {/* Timezone-aware Countdown to Wedding */}
          <div className="mb-8 w-full">
            <Countdown
              targetTimestampMs={EVENT_CONFIG.matrimony.timestampMs}
              eventName="The Holy Matrimony"
              completedText="United in Holy Matrimony"
            />
          </div>

          {/* Action Buttons: Add to Calendar & Directions */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            {/* Get Directions */}
            <a
              href={EVENT_CONFIG.matrimony.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-burgundy-400"
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/90 hover:bg-white text-burgundy-800 border border-gold-400/60 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <CalendarPlus className="w-4 h-4 text-gold-600" />
                <span>Add to Calendar</span>
              </button>

              {calendarMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-gold-300/60 p-2 z-20 text-left animate-in fade-in zoom-in-95">
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

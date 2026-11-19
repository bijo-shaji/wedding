import React, { useState } from "react";
import { EVENT_CONFIG } from "../config/event";
import { Countdown } from "./Countdown";
import { GoldDivider } from "./FloralDecorations";
import { RingExchangeMotif } from "./TraditionMotifs";
import {
  createGoogleCalendarUrl,
  downloadIcsFile,
  type CalendarEventParams,
} from "../lib/calendar";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  CalendarPlus,
  Download,
  ExternalLink,
} from "lucide-react";

export const Engagement: React.FC = () => {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  const engagementCalendarParams: CalendarEventParams = {
    title: `Engagement Ceremony — Sheba Shaji & Kenneth Francis`,
    description: `Engagement ceremony of Sheba Shaji & Kenneth Francis at ${EVENT_CONFIG.engagement.venueName}, ${EVENT_CONFIG.engagement.locationLine}. Time: ${EVENT_CONFIG.engagement.timeFormatted}.`,
    location: EVENT_CONFIG.engagement.fullAddress,
    startIso: EVENT_CONFIG.engagement.isoDateTime,
    defaultDurationMinutes: 180,
    filename: "sheba-kenneth-engagement",
  };

  const googleCalUrl = createGoogleCalendarUrl(engagementCalendarParams);

  const handleDownloadIcs = () => {
    downloadIcsFile(engagementCalendarParams);
    setCalendarMenuOpen(false);
  };

  return (
    <section
      id="engagement"
      className="py-14 sm:py-20 px-4 max-w-4xl mx-auto scroll-mt-24"
    >
      <div className="gold-border-card rounded-3xl p-6 sm:p-10 md:p-12 shadow-wedding relative overflow-hidden">
        <div className="flex flex-col items-center text-center">
          {/* Traditional Ring Exchange Motif with animated diamond glint */}
          <div className="mb-2">
            <RingExchangeMotif size={120} />
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold tracking-widest text-burgundy-800 bg-burgundy-50 border border-burgundy-200 uppercase mb-2">
            Sacred Promise &bull; മോതിരം മാറ്റൽ
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-800 leading-tight">
            {EVENT_CONFIG.engagement.title}
          </h2>

          <GoldDivider className="my-3" />

          <p className="font-serif italic text-base sm:text-lg text-[#4E4140] max-w-lg mb-8 font-medium">
            Join us as we exchange rings, pledge our hearts, and celebrate the union of our two families.
          </p>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
            {/* Date Card */}
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/80 border border-gold-300/60 shadow-xs hover:border-gold-400 transition-colors">
              <div className="w-11 h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-semibold">
                {EVENT_CONFIG.engagement.dayOfWeek}
              </span>
              <span className="font-serif text-lg font-bold text-burgundy-900">
                {EVENT_CONFIG.engagement.dateFormatted}
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
                {EVENT_CONFIG.engagement.timeFormatted}
              </span>
            </div>

            {/* Venue Card */}
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/80 border border-gold-300/60 shadow-xs hover:border-gold-400 transition-colors">
              <div className="w-11 h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Venue
              </span>
              <span className="font-serif text-sm font-bold text-burgundy-900 text-center leading-snug">
                {EVENT_CONFIG.engagement.venueName}
              </span>
              <span className="font-sans text-[11px] text-slate-500 mt-0.5">
                Valakom, Kerala
              </span>
            </div>
          </div>

          {/* Timezone-aware Countdown Component */}
          <div className="mb-8 w-full">
            <Countdown
              targetTimestampMs={EVENT_CONFIG.engagement.timestampMs}
              eventName="The Engagement"
              completedText="Engagement Ceremony Completed with Joy"
            />
          </div>

          {/* Action Buttons: Add to Calendar & Directions */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            {/* Get Directions */}
            <a
              href={EVENT_CONFIG.engagement.googleMapsUrl}
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

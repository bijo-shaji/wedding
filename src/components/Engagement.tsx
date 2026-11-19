import React, { useState } from "react";
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../config/event";
import { Countdown } from "./Countdown";
import { GoldDivider } from "./FloralDecorations";
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
      className="relative py-12 sm:py-20 px-3 sm:px-6 max-w-5xl mx-auto scroll-mt-20 sm:scroll-mt-28"
    >
      {/* Engagement Ceremony Stage Container with Visible Stage Backdrop Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-5 sm:p-10 md:p-12 shadow-2xl overflow-hidden border-2 border-gold-400/80"
        style={{
          backgroundImage: "url('/images/container-engagement.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Soft crystalline veil allowing the stage lighting to glow through */}
        <div className="absolute inset-0 bg-white/35 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Frosted Royal Header Plaque for pristine text legibility (matching width with details grid below) */}
          <div className="w-full max-w-3xl bg-white/85 backdrop-blur-md px-6 py-5 sm:px-10 sm:py-6 rounded-2xl border border-gold-300/70 shadow-sm mb-6 flex flex-col items-center">
            <span className="inline-block px-4 py-1 rounded-full text-[11px] sm:text-xs font-cinzel font-bold tracking-[0.2em] text-burgundy-900 bg-burgundy-50/80 border border-gold-300/60 uppercase mb-2">
              The Engagement Ceremony
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-950 leading-tight">
              {EVENT_CONFIG.engagement.title}
            </h2>

            <GoldDivider className="my-2.5" />

            <p className="font-serif italic text-sm sm:text-base text-burgundy-900 font-medium max-w-xl">
              Join us as we pledge our love, exchange sacred promises, and celebrate the union of our two families.
            </p>
          </div>

          {/* Key Details Grid with Solid Contrast Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-3xl mb-7">
            {/* Date Card */}
            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-300/80 shadow-md hover:border-gold-500 hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-bold">
                {EVENT_CONFIG.engagement.dayOfWeek}
              </span>
              <span className="font-serif text-lg sm:text-xl font-bold text-burgundy-950 mt-0.5">
                {EVENT_CONFIG.engagement.dateFormatted}
              </span>
            </div>

            {/* Time Card */}
            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-300/80 shadow-md hover:border-gold-500 hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-bold">
                Time
              </span>
              <span className="font-serif text-lg sm:text-xl font-bold text-burgundy-950 mt-0.5">
                {EVENT_CONFIG.engagement.timeFormatted}
              </span>
            </div>

            {/* Venue Card */}
            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-300/80 shadow-md hover:border-gold-500 hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-bold">
                Venue
              </span>
              <span className="font-serif text-sm font-bold text-burgundy-950 text-center leading-snug mt-0.5">
                {EVENT_CONFIG.engagement.venueName}
              </span>
              <span className="font-sans text-[11px] text-slate-600 mt-0.5 font-semibold">
                Valakom, Kerala
              </span>
            </div>
          </div>

          {/* Timezone-aware Countdown Component in contrast frame */}
          <div className="mb-7 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-gold-300/70 shadow-md w-full max-w-md">
            <Countdown
              targetTimestampMs={EVENT_CONFIG.engagement.timestampMs}
              eventName="The Engagement"
              completedText="Engagement Ceremony Completed with Joy"
            />
          </div>

          {/* Action Buttons: Add to Calendar & Directions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
            {/* Get Directions */}
            <a
              href={EVENT_CONFIG.engagement.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-lg transition-all active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-burgundy-400"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Add to Calendar Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setCalendarMenuOpen((prev) => !prev)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-burgundy-800 border-2 border-gold-400 font-cinzel text-xs tracking-wider uppercase font-bold shadow-md transition-all active:scale-95 hover:bg-gold-50/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
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
      </motion.div>
    </section>
  );
};

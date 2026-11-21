import React from "react";
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../config/event";
import { Countdown } from "./Countdown";
import { GoldenCross, GoldDivider } from "./FloralDecorations";
import {
  createGoogleCalendarUrl,
  type CalendarEventParams,
} from "../lib/calendar";
import {
  Calendar,
  Clock,
  Church,
  Navigation,
  CalendarPlus,
  ExternalLink,
  Users,
} from "lucide-react";

export const Wedding: React.FC = () => {
  const weddingCalendarParams: CalendarEventParams = {
    title: `Holy Matrimony — Kenneth Francis & Sheba Shaji`,
    description: `Holy Matrimony service of Kenneth Francis & Sheba Shaji at ${EVENT_CONFIG.matrimony.churchName}, ${EVENT_CONFIG.matrimony.locationLine}. Time: ${EVENT_CONFIG.matrimony.timeFormatted}. Reception to follow at ${EVENT_CONFIG.reception.venueName}.`,
    location: EVENT_CONFIG.matrimony.fullAddress,
    startIso: EVENT_CONFIG.matrimony.isoDateTime,
    defaultDurationMinutes: 240,
    filename: "kenneth-sheba-holy-matrimony",
  };

  const googleCalUrl = createGoogleCalendarUrl(weddingCalendarParams);

  return (
    <section
      id="wedding"
      className="relative py-12 sm:py-20 px-3 sm:px-6 max-w-5xl mx-auto scroll-mt-20 sm:scroll-mt-28"
    >
      {/* Holy Matrimony Container with Cathedral Altar & Sanctuary Backdrop Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-5 sm:p-10 md:p-12 shadow-2xl overflow-hidden border-2 border-gold-400/80"
        style={{
          backgroundImage: "url('/images/container-wedding.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Soft crystalline veil allowing Cathedral arches & altar candles to glow through */}
        <div className="absolute inset-0 bg-white/35 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Frosted Royal Header Plaque for cathedral ceremony (compact height, keeping full max-w-3xl width) */}
          <div className="w-full max-w-3xl bg-white/85 backdrop-blur-md px-5 py-3.5 sm:px-8 sm:py-4.5 rounded-2xl border border-gold-300/70 shadow-sm mb-4 sm:mb-5 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <GoldenCross size={26} />
              <span className="inline-block px-3.5 py-0.5 rounded-full text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.2em] text-burgundy-900 bg-burgundy-50/80 border border-gold-300/60 uppercase">
                Sacred Nuptial Service
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-burgundy-950 leading-tight mb-1">
              {EVENT_CONFIG.matrimony.title}
            </h2>

            <div className="my-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <h3 className="font-script text-2xl sm:text-4xl md:text-5xl text-burgundy-900 leading-none">
                {EVENT_CONFIG.couple.groom.fullName}
              </h3>
              <span className="font-serif italic text-xl sm:text-2xl text-gold-600 font-bold">&amp;</span>
              <h3 className="font-script text-2xl sm:text-4xl md:text-5xl text-burgundy-900 leading-none">
                {EVENT_CONFIG.couple.bride.fullName}
              </h3>
            </div>

            <GoldDivider className="my-1.5" />
          </div>

          {/* PARENTS COLUMNS in Solid Contrast Frame */}
          <div className="w-full max-w-3xl bg-white/95 rounded-2xl border border-gold-300/80 p-5 sm:p-7 mb-7 shadow-md backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 text-gold-700 font-cinzel text-xs font-bold tracking-wider uppercase mb-4">
              <Users className="w-4 h-4" />
              <span>With the Blessings of Our Beloved Parents</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-center">
              {/* Groom's Parents */}
              <div className="sm:border-r sm:border-gold-300/50 sm:pr-4 pb-3 sm:pb-0 border-b border-gold-200/50 sm:border-b-0">
                <span className="font-cinzel text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  Groom&apos;s Parents
                </span>
                <p className="font-serif text-lg sm:text-2xl font-bold text-burgundy-950">
                  {EVENT_CONFIG.couple.groom.parents.father}
                </p>
                <p className="font-serif text-lg sm:text-2xl font-bold text-burgundy-950">
                  &amp; {EVENT_CONFIG.couple.groom.parents.mother}
                </p>
              </div>

              {/* Bride's Parents */}
              <div className="sm:pl-4 pt-1 sm:pt-0">
                <span className="font-cinzel text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  Bride&apos;s Parents
                </span>
                <p className="font-serif text-lg sm:text-2xl font-bold text-burgundy-950">
                  {EVENT_CONFIG.couple.bride.parents.father}
                </p>
                <p className="font-serif text-lg sm:text-2xl font-bold text-burgundy-950">
                  &amp; {EVENT_CONFIG.couple.bride.parents.mother}
                </p>
              </div>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-3xl mb-7">
            {/* Date Card */}
            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-300/80 shadow-md hover:border-gold-500 hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
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
            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-300/80 shadow-md hover:border-gold-500 hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
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
            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-white/95 border border-gold-300/80 shadow-md hover:border-gold-500 hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-2">
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
          <div className="mb-7 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-gold-300/70 shadow-md w-full max-w-md">
            <Countdown
              targetTimestampMs={EVENT_CONFIG.matrimony.timestampMs}
              eventName="The Holy Matrimony"
              completedText="United in Holy Matrimony"
            />
          </div>

          {/* Action Buttons: Add to Calendar & Directions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
            {/* Get Directions */}
            <a
              href={EVENT_CONFIG.matrimony.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-lg transition-all active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-burgundy-400"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Add to Calendar */}
            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-burgundy-800 border-2 border-gold-400 font-cinzel text-xs tracking-wider uppercase font-bold shadow-md transition-all active:scale-95 hover:bg-gold-50/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <CalendarPlus className="w-4 h-4 text-gold-600" />
              <span>Add to Calendar</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

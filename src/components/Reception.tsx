import React from "react";
import { EVENT_CONFIG } from "../config/event";
import { GoldDivider } from "./FloralDecorations";
import { MapPin, Navigation, ExternalLink, Sparkles } from "lucide-react";

export const Reception: React.FC = () => {
  return (
    <section
      id="reception"
      className="relative py-16 sm:py-24 px-4 max-w-5xl mx-auto scroll-mt-24"
    >
      {/* Wedding Reception Container with Evening Banquet Fairy Lights & Glow Backdrop */}
      <div
        className="relative rounded-3xl p-6 sm:p-12 md:p-14 shadow-2xl overflow-hidden border-2 border-gold-400/80"
        style={{
          backgroundImage: "url('/images/container-reception.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Soft crystalline veil allowing fairy lights & festive ambiance to shine through */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-gold-600 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-cinzel text-xs uppercase tracking-[0.2em] font-bold text-burgundy-900">
              Celebration Feast &amp; Gathering
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-950 leading-tight drop-shadow-xs">
            {EVENT_CONFIG.reception.title}
          </h2>

          <GoldDivider className="my-3" />

          {/* Time Note — Strictly adhering to "Reception to follow the wedding ceremony" */}
          <div className="inline-block px-7 py-2.5 rounded-full bg-white/95 border-2 border-gold-400 text-burgundy-950 font-cinzel text-xs sm:text-sm font-bold tracking-wider mb-6 shadow-md">
            {EVENT_CONFIG.reception.timeFormatted}
          </div>

          <p className="font-serif italic text-base sm:text-lg text-burgundy-950 max-w-lg mb-8 font-semibold bg-white/70 px-4 py-1.5 rounded-full backdrop-blur-xs border border-gold-300/40">
            Please join us for dinner and fellowship as we celebrate the newlyweds immediately
            following the Holy Matrimony service.
          </p>

          {/* Venue Card in Contrast Panel */}
          <div className="w-full max-w-md bg-white/95 rounded-2xl border border-gold-300/80 p-6 sm:p-7 mb-8 shadow-md flex flex-col items-center hover:border-gold-500 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-full bg-burgundy-50 border border-burgundy-200 flex items-center justify-center text-burgundy-700 mb-3">
              <MapPin className="w-6 h-6" />
            </div>

            <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">
              Reception Venue
            </span>
            <h3 className="font-serif text-2xl font-bold text-burgundy-950 text-center mb-1">
              {EVENT_CONFIG.reception.venueName}
            </h3>
            <p className="font-sans text-xs text-slate-600 text-center max-w-xs font-semibold">
              {EVENT_CONFIG.reception.fullAddress}
            </p>
          </div>

          {/* Get Directions Button */}
          <a
            href={EVENT_CONFIG.reception.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-lg transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-burgundy-400"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions to Reception</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
};

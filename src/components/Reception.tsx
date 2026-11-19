import React from "react";
import { EVENT_CONFIG } from "../config/event";
import { GoldDivider } from "./FloralDecorations";
import { MapPin, Navigation, Sparkles, ExternalLink } from "lucide-react";

export const Reception: React.FC = () => {
  return (
    <section
      id="reception"
      className="py-12 sm:py-16 px-4 max-w-4xl mx-auto scroll-mt-24"
    >
      <div className="gold-border-card rounded-3xl p-6 sm:p-10 md:p-12 shadow-wedding relative overflow-hidden">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-gold-500 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-cinzel text-xs uppercase tracking-widest font-semibold text-gold-600">
              Celebration Dinner &amp; Gathering
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-800 leading-tight">
            {EVENT_CONFIG.reception.title}
          </h2>

          <GoldDivider className="my-3" />

          {/* Time Note — Strictly adhering to "Reception to follow the wedding ceremony" */}
          <div className="inline-block px-5 py-2 rounded-full bg-gold-50 border border-gold-300 text-gold-700 font-cinzel text-xs sm:text-sm font-semibold tracking-wider mb-6">
            {EVENT_CONFIG.reception.timeFormatted}
          </div>

          <p className="font-serif italic text-base sm:text-lg text-[#554948] max-w-lg mb-8">
            Please join us for dinner and fellowship as we celebrate the newlyweds immediately
            following the church ceremony.
          </p>

          {/* Venue Card */}
          <div className="w-full max-w-md bg-white/70 rounded-2xl border border-gold-300/40 p-6 mb-8 shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-burgundy-50 border border-burgundy-200 flex items-center justify-center text-burgundy-700 mb-3">
              <MapPin className="w-6 h-6" />
            </div>

            <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider mb-1">
              Venue
            </span>
            <h3 className="font-serif text-2xl font-bold text-burgundy-800 text-center mb-1">
              {EVENT_CONFIG.reception.venueName}
            </h3>
            <p className="font-sans text-xs text-slate-600 text-center max-w-xs">
              {EVENT_CONFIG.reception.fullAddress}
            </p>
          </div>

          {/* Get Directions Button */}
          <a
            href={EVENT_CONFIG.reception.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-burgundy-400"
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

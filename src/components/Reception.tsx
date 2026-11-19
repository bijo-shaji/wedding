import React from "react";
import { EVENT_CONFIG } from "../config/event";
import { GoldDivider } from "./FloralDecorations";
import { ReceptionToastMotif } from "./TraditionMotifs";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export const Reception: React.FC = () => {
  return (
    <section
      id="reception"
      className="py-14 sm:py-20 px-4 max-w-4xl mx-auto scroll-mt-24"
    >
      <div className="gold-border-card rounded-3xl p-6 sm:p-10 md:p-12 shadow-wedding relative overflow-hidden">
        <div className="flex flex-col items-center text-center">
          {/* Traditional Celebration Motif */}
          <div className="mb-2">
            <ReceptionToastMotif size={95} />
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold tracking-widest text-burgundy-800 bg-burgundy-50 border border-burgundy-200 uppercase mb-2">
            Joyous Fellowship &bull; സ്നേഹവിരുന്ന്
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-800 leading-tight">
            {EVENT_CONFIG.reception.title}
          </h2>

          <GoldDivider className="my-3" />

          {/* Time Note — Strictly adhering to "Reception to follow the wedding ceremony" */}
          <div className="inline-block px-6 py-2.5 rounded-full bg-gold-50 border border-gold-300 text-gold-800 font-cinzel text-xs sm:text-sm font-bold tracking-wider mb-6 shadow-2xs">
            {EVENT_CONFIG.reception.timeFormatted}
          </div>

          <p className="font-serif italic text-base sm:text-lg text-[#4E4140] max-w-lg mb-8 font-medium">
            Please join us for dinner and fellowship as we celebrate the newlyweds immediately
            following the church ceremony.
          </p>

          {/* Venue Card */}
          <div className="w-full max-w-md bg-white/80 rounded-2xl border border-gold-300/60 p-6 mb-8 shadow-xs flex flex-col items-center hover:border-gold-400 transition-colors">
            <div className="w-12 h-12 rounded-full bg-burgundy-50 border border-burgundy-200 flex items-center justify-center text-burgundy-700 mb-3">
              <MapPin className="w-6 h-6" />
            </div>

            <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
              Venue
            </span>
            <h3 className="font-serif text-2xl font-bold text-burgundy-900 text-center mb-1">
              {EVENT_CONFIG.reception.venueName}
            </h3>
            <p className="font-sans text-xs text-slate-600 text-center max-w-xs font-medium">
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

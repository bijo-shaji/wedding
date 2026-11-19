import React from "react";
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../config/event";
import { GoldDivider } from "./FloralDecorations";
import { MapPin, Navigation, ExternalLink, Sparkles } from "lucide-react";

export const Reception: React.FC = () => {
  return (
    <section
      id="reception"
      className="relative py-8 sm:py-12 px-3 sm:px-6 max-w-5xl mx-auto scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Wedding Reception Container with Evening Banquet Fairy Lights & Glow Backdrop */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-4 sm:p-7 md:p-8 shadow-2xl overflow-hidden border-2 border-gold-400/80"
        style={{
          backgroundImage: "url('/images/container-reception.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Soft crystalline veil allowing fairy lights & festive ambiance to shine through */}
        <div className="absolute inset-0 bg-white/35 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Unified Compact Royal Reception Card (keeping exact max-w-3xl width, reducing height) */}
          <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md px-6 py-5 sm:px-10 sm:py-6 rounded-2xl border border-gold-300/80 shadow-lg flex flex-col items-center">
            {/* Top Badge */}
            <div className="flex items-center gap-1.5 text-gold-600 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-burgundy-900">
                Celebration Feast &amp; Gathering
              </span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-950 leading-tight">
              {EVENT_CONFIG.reception.title}
            </h2>

            <GoldDivider className="my-2" />

            {/* Time Note — Strictly adhering to "Reception to follow the wedding ceremony" */}
            <div className="inline-block px-5 py-1.5 rounded-full bg-burgundy-50 border border-gold-300 text-burgundy-950 font-cinzel text-xs sm:text-sm font-bold tracking-wider mb-2.5 shadow-2xs">
              {EVENT_CONFIG.reception.timeFormatted}
            </div>

            <p className="font-serif italic text-sm sm:text-base text-burgundy-900 font-medium max-w-xl mb-5">
              Please join us for lunch and fellowship as we celebrate the newlyweds immediately following the Holy Matrimony service.
            </p>

            {/* Venue & Action Strip */}
            <div className="w-full pt-4 border-t border-gold-300/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-burgundy-50 border border-burgundy-200 flex items-center justify-center text-burgundy-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-burgundy-950 leading-snug">
                    {EVENT_CONFIG.reception.venueName}
                  </h3>
                  <p className="font-sans text-xs text-slate-600">
                    {EVENT_CONFIG.reception.locationLine}
                  </p>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={EVENT_CONFIG.reception.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-md transition-all active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-burgundy-400 shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

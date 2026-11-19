import React from "react";
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../config/event";
import { GoldDivider } from "./FloralDecorations";
import { MapPin, Navigation, ExternalLink, Sparkles } from "lucide-react";

export const Reception: React.FC = () => {
  return (
    <section
      id="reception"
      className="relative py-12 sm:py-20 px-3 sm:px-6 max-w-5xl mx-auto scroll-mt-20 sm:scroll-mt-28"
    >
      {/* Wedding Reception Container with Evening Banquet Fairy Lights & Glow Backdrop */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-5 sm:p-10 md:p-12 shadow-2xl overflow-hidden border-2 border-gold-400/80"
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
          {/* Frosted Royal Header Plaque */}
          <div className="bg-white/85 backdrop-blur-md px-6 py-4 sm:px-8 sm:py-5 rounded-2xl border border-gold-300/70 shadow-sm mb-6 max-w-xl flex flex-col items-center">
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

            <GoldDivider className="my-2.5" />

            {/* Time Note — Strictly adhering to "Reception to follow the wedding ceremony" */}
            <div className="inline-block px-5 py-2 rounded-full bg-burgundy-50 border border-gold-300 text-burgundy-950 font-cinzel text-xs sm:text-sm font-bold tracking-wider mb-2 shadow-2xs">
              {EVENT_CONFIG.reception.timeFormatted}
            </div>

            <p className="font-serif italic text-sm sm:text-base text-burgundy-900 font-medium">
              Please join us for dinner and fellowship as we celebrate the newlyweds immediately following the Holy Matrimony service.
            </p>
          </div>

          {/* Venue Card in Contrast Panel */}
          <div className="w-full max-w-md bg-white/95 rounded-2xl border border-gold-300/80 p-5 sm:p-7 mb-7 shadow-md flex flex-col items-center hover:border-gold-500 hover:shadow-xl transition-all duration-300">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-burgundy-50 border border-burgundy-200 flex items-center justify-center text-burgundy-700 mb-3">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <span className="font-cinzel text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">
              Reception Venue
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy-950 text-center mb-1">
              {EVENT_CONFIG.reception.venueName}
            </h3>
            <p className="font-sans text-xs text-slate-600 text-center max-w-xs font-semibold leading-relaxed">
              {EVENT_CONFIG.reception.fullAddress}
            </p>
          </div>

          {/* Get Directions Button */}
          <a
            href={EVENT_CONFIG.reception.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-lg transition-all active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-burgundy-400"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions to Reception</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

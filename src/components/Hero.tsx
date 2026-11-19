import React from "react";
import { motion } from "framer-motion";
import { GoldenCross, FloralCorner, GoldDivider } from "./FloralDecorations";
import { EVENT_CONFIG } from "../config/event";
import { ChevronDown, Calendar, MapPin } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToCelebrations = () => {
    const el = document.getElementById("our-celebration");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative min-h-[92vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden text-center">
      {/* Decorative Floral Corners for the Hero section */}
      <div className="absolute top-0 left-0">
        <FloralCorner position="top-left" size={200} className="opacity-80" />
      </div>
      <div className="absolute top-0 right-0">
        <FloralCorner position="top-right" size={200} className="opacity-80" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Golden Cross */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <GoldenCross size={52} />
        </motion.div>

        {/* Bible Verse Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 max-w-lg px-2"
        >
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-burgundy-800 leading-relaxed">
            &ldquo;{EVENT_CONFIG.bibleVerse.verse}&rdquo;
          </p>
          <p className="font-cinzel text-xs font-semibold text-gold-600 tracking-widest mt-1.5 uppercase">
            {EVENT_CONFIG.bibleVerse.reference}
          </p>
        </motion.div>

        <GoldDivider className="my-2" />

        {/* Family Invitation Pre-title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#59654C] uppercase font-semibold mb-3"
        >
          TOGETHER WITH OUR FAMILIES
        </motion.p>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="my-3 flex flex-col items-center"
        >
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-burgundy-700 leading-none">
            {EVENT_CONFIG.couple.bride.fullName}
          </h1>

          <div className="my-2 flex items-center gap-3">
            <span className="h-[1px] w-12 bg-gold-400 opacity-60" />
            <span className="font-serif italic text-3xl sm:text-4xl text-gold-500">
              &amp;
            </span>
            <span className="h-[1px] w-12 bg-gold-400 opacity-60" />
          </div>

          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-burgundy-700 leading-none">
            {EVENT_CONFIG.couple.groom.fullName}
          </h1>
        </motion.div>

        {/* Optional Couple Photo if configured */}
        {EVENT_CONFIG.features.showCouplePhoto && EVENT_CONFIG.features.couplePhotoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="my-6 relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 gold-border-card shadow-lg overflow-hidden"
          >
            <img
              src={EVENT_CONFIG.features.couplePhotoUrl}
              alt="Sheba and Kenneth"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Invitation Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-4 mb-8 flex flex-col items-center"
        >
          <p className="font-cinzel text-sm sm:text-base tracking-[0.2em] text-[#2B2625] font-semibold uppercase mb-1">
            A CELEBRATION OF LOVE
          </p>
          <p className="font-serif text-sm sm:text-base text-[#5C5251] italic">
            Joyfully invite you to witness our Engagement &amp; Holy Matrimony
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs font-cinzel font-semibold text-burgundy-800 tracking-wider">
            <span className="inline-flex items-center gap-1.5 bg-burgundy-50 px-3.5 py-1.5 rounded-full border border-burgundy-200">
              <Calendar className="w-3.5 h-3.5 text-burgundy-600" />
              January 2 &amp; 11, 2027
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gold-50 px-3.5 py-1.5 rounded-full border border-gold-300">
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              Kollam, Kerala, India
            </span>
          </div>
        </motion.div>

        {/* Explore Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <button
            onClick={scrollToCelebrations}
            type="button"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-burgundy-700 via-burgundy-800 to-burgundy-900 text-ivory-100 font-cinzel text-xs tracking-widest uppercase font-semibold shadow-md hover:shadow-xl hover:from-burgundy-600 hover:to-burgundy-800 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <span>Explore Celebrations</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* Downward Scroll Cue */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-gold-600 opacity-70"
        >
          <span className="font-cinzel text-[10px] tracking-widest uppercase mb-1">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </header>
  );
};

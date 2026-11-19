import React from "react";
import { motion } from "framer-motion";
import { GoldenCross, FloralCorner, GoldDivider } from "./FloralDecorations";
import { EVENT_CONFIG } from "../config/event";
import { ChevronDown, Calendar, MapPin, Heart } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToCelebrations = () => {
    const el = document.getElementById("our-celebration");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative min-h-[96vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden text-center select-none">
      {/* Decorative Floral Corners for the Hero section */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <FloralCorner position="top-left" size={240} className="opacity-90" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none">
        <FloralCorner position="top-right" size={240} className="opacity-90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Golden Cross */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-3"
        >
          <GoldenCross size={56} />
        </motion.div>

        {/* Bible Verse Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mb-4 max-w-xl px-2"
        >
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-burgundy-900 leading-relaxed font-semibold">
            &ldquo;{EVENT_CONFIG.bibleVerse.verse}&rdquo;
          </p>
          <p className="font-cinzel text-xs font-bold text-gold-600 tracking-widest mt-1 uppercase">
            {EVENT_CONFIG.bibleVerse.reference}
          </p>
        </motion.div>

        <GoldDivider className="my-2" />

        {/* Family Invitation Pre-title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="font-cinzel text-xs sm:text-sm tracking-[0.28em] text-[#59654C] uppercase font-bold mb-4"
        >
          TOGETHER WITH OUR FAMILIES
        </motion.p>

        {/* Couple Names in Royal Calligraphy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mb-6 flex flex-col items-center"
        >
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-burgundy-800 leading-none drop-shadow-xs">
            {EVENT_CONFIG.couple.bride.fullName}
          </h1>

          <div className="my-2 flex items-center gap-3">
            <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent to-gold-400 opacity-80" />
            <span className="font-serif italic text-3xl sm:text-4xl text-gold-600 font-bold">
              &amp;
            </span>
            <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent to-gold-400 opacity-80" />
          </div>

          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-burgundy-800 leading-none drop-shadow-xs">
            {EVENT_CONFIG.couple.groom.fullName}
          </h1>
        </motion.div>

        {/* Romantic Couple Portrait Centerpiece with Golden Arch Frame */}
        {EVENT_CONFIG.features.showCouplePhoto && EVENT_CONFIG.features.couplePhotoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-4 flex items-center justify-center"
          >
            {/* Ambient Golden Halo Glow */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-gold-400/25 via-amber-200/35 to-burgundy-500/20 blur-2xl pointer-events-none" />

            {/* Outer Golden Arch Ring */}
            <div className="relative p-2.5 sm:p-3 rounded-t-full rounded-b-[140px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#EED9B2] border-2 border-gold-400/80 shadow-2xl">
              {/* Inner Arch Frame */}
              <div className="relative w-64 h-84 sm:w-76 sm:h-100 md:w-84 md:h-110 rounded-t-full rounded-b-[125px] overflow-hidden border border-gold-300 shadow-inner">
                <img
                  src={EVENT_CONFIG.features.couplePhotoUrl}
                  alt="Sheba Shaji & Kenneth Francis - A Celebration of Love"
                  className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Subtle Inner Glow Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Decorative Heart Crest on the frame */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-burgundy-700 to-burgundy-900 border-2 border-gold-300 flex items-center justify-center text-gold-300 shadow-md">
                <Heart className="w-4 h-4 fill-gold-400 text-gold-400" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Invitation Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 mb-8 flex flex-col items-center"
        >
          <p className="font-cinzel text-sm sm:text-base tracking-[0.25em] text-[#221A1A] font-bold uppercase mb-1">
            A CELEBRATION OF LOVE
          </p>
          <p className="font-serif text-sm sm:text-base text-[#524442] italic font-medium">
            Joyfully invite you to witness our Engagement &amp; Holy Matrimony
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-5 text-xs font-cinzel font-bold text-burgundy-900 tracking-wider">
            <span className="inline-flex items-center gap-1.5 bg-burgundy-50/95 px-4 py-2 rounded-full border border-burgundy-200 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-burgundy-700" />
              January 2 &amp; 11, 2027
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gold-50/95 px-4 py-2 rounded-full border border-gold-300 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-gold-700" />
              Kollam, Kerala, India
            </span>
          </div>
        </motion.div>

        {/* Explore Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
        >
          <button
            onClick={scrollToCelebrations}
            type="button"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-burgundy-700 via-burgundy-800 to-burgundy-900 text-ivory-100 font-cinzel text-xs tracking-widest uppercase font-semibold shadow-lg hover:shadow-2xl hover:from-burgundy-600 hover:to-burgundy-800 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <span>Explore Celebrations</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-gold-300" />
          </button>
        </motion.div>
      </div>

      {/* Downward Scroll Cue */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-gold-600 opacity-80"
        >
          <span className="font-cinzel text-[10px] tracking-widest uppercase mb-1 font-semibold">
            Scroll Down
          </span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </header>
  );
};

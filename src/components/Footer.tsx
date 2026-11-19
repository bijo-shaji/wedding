import React from "react";
import { EVENT_CONFIG } from "../config/event";
import { GoldenCross, FloralCorner, GoldDivider } from "./FloralDecorations";
import { Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative pt-16 pb-12 px-4 overflow-hidden text-center bg-gradient-to-t from-[#F4E9D5]/40 to-transparent">
      {/* Decorative Bottom Floral Corners */}
      <div className="absolute bottom-0 left-0">
        <FloralCorner position="bottom-left" size={150} className="opacity-60" />
      </div>
      <div className="absolute bottom-0 right-0">
        <FloralCorner position="bottom-right" size={150} className="opacity-60" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Golden Cross */}
        <GoldenCross size={36} className="mb-4" />

        {/* Section I — Final Blessing */}
        <div className="mb-8">
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-burgundy-800 leading-relaxed max-w-lg mx-auto">
            &ldquo;Your presence, prayers, and blessings will make our celebration even more
            special.&rdquo;
          </p>

          <GoldDivider className="my-4" />

          <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#59654C] font-semibold mb-1">
            With Love,
          </p>
          <p className="font-script text-3xl sm:text-4xl text-burgundy-700">
            {EVENT_CONFIG.couple.bride.firstName} &amp; {EVENT_CONFIG.couple.groom.firstName}
          </p>
        </div>

        {/* Heart separator */}
        <div className="my-4 flex items-center justify-center text-gold-500">
          <Heart className="w-4 h-4 fill-gold-400 text-gold-500" />
        </div>

        {/* Section J — Official Copyright & Developer Credit */}
        <div className="pt-6 border-t border-gold-400/30 w-full max-w-md flex flex-col items-center text-center">
          <p className="font-cinzel text-[11px] sm:text-xs text-[#5C5251] tracking-wider uppercase mb-1.5 font-medium">
            &copy; 2027 Sheba &amp; Kenneth. All Rights Reserved.
          </p>
          <p className="font-sans text-[11px] sm:text-xs text-[#6B5E5B] tracking-wide flex items-center justify-center gap-1">
            <span>Designed &amp; Developed with</span>
            <span className="text-burgundy-700 text-xs" aria-label="love">
              ♥
            </span>
            <span>by</span>
            <span className="font-semibold text-burgundy-900">
              {EVENT_CONFIG.organizer.creditDeveloper}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

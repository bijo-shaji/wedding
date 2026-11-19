import React, { useState } from "react";
import { EVENT_CONFIG } from "../config/event";
import { GoldenCross, FloralCorner, GoldDivider } from "./FloralDecorations";
import { Heart, MessageCircle, Copy, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleWhatsAppShare = () => {
    const url = typeof window !== "undefined" ? window.location.origin : "https://shebakenneth.wedding";
    const text = `Sheba & Kenneth — A Celebration of Love\nTogether with our families, we joyfully invite you to celebrate our Engagement & Wedding in January 2027.\n\nExplore our wedding invitation:\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.origin : "https://shebakenneth.wedding";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <footer className="relative pt-16 pb-12 px-4 overflow-hidden text-center bg-gradient-to-t from-[#F4E8D3]/50 to-transparent">
      {/* Decorative Bottom Floral Corners */}
      <div className="absolute bottom-0 left-0">
        <FloralCorner position="bottom-left" size={160} className="opacity-70" />
      </div>
      <div className="absolute bottom-0 right-0">
        <FloralCorner position="bottom-right" size={160} className="opacity-70" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Golden Cross */}
        <GoldenCross size={40} className="mb-4" />

        {/* Section I — Final Blessing */}
        <div className="mb-8">
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-burgundy-900 leading-relaxed max-w-lg mx-auto font-medium">
            &ldquo;Your presence, prayers, and blessings will make our celebration even more
            special.&rdquo;
          </p>

          <GoldDivider className="my-4" />

          <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#59654C] font-bold mb-1">
            With Love,
          </p>
          <p className="font-script text-3xl sm:text-4xl md:text-5xl text-burgundy-800 drop-shadow-xs">
            {EVENT_CONFIG.couple.bride.firstName} &amp; {EVENT_CONFIG.couple.groom.firstName}
          </p>
        </div>

        {/* Subtle, elegant share row */}
        <div className="my-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-emerald-700 border border-emerald-300 text-xs font-cinzel font-semibold tracking-wider shadow-2xs hover:scale-105 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>Share via WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-gold-300 text-xs font-cinzel font-semibold tracking-wider shadow-2xs hover:scale-105 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-sage-600" />
                <span className="text-sage-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gold-600" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Heart separator */}
        <div className="my-3 flex items-center justify-center text-gold-500">
          <Heart className="w-4 h-4 fill-gold-400 text-gold-500" />
        </div>

        {/* Section J — Official Copyright & Developer Credit */}
        <div className="pt-6 border-t border-gold-400/35 w-full max-w-md flex flex-col items-center text-center">
          <p className="font-cinzel text-[11px] sm:text-xs text-[#524442] tracking-wider uppercase mb-1.5 font-bold">
            &copy; 2027 Sheba &amp; Kenneth. All Rights Reserved.
          </p>
          <p className="font-sans text-[11px] sm:text-xs text-[#5E514F] tracking-wide flex items-center justify-center gap-1">
            <span>Designed &amp; Developed with</span>
            <span className="text-burgundy-700 text-xs" aria-label="love">
              ♥
            </span>
            <span>by</span>
            <span className="font-bold text-burgundy-950">
              {EVENT_CONFIG.organizer.creditDeveloper}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

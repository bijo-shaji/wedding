import React, { useState } from "react";
import { MapPin, Navigation, Copy, Check, ExternalLink } from "lucide-react";

interface VenueCardProps {
  category: string;
  venueName: string;
  locationLine: string;
  fullAddress: string;
  googleMapsUrl: string;
  date?: string;
  time?: string;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  category,
  venueName,
  locationLine,
  fullAddress,
  googleMapsUrl,
  date,
  time,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${venueName}, ${fullAddress}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative gold-border-card rounded-2xl p-4.5 sm:p-5 shadow-wedding flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div>
        {/* Top Tag & Location Icon */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-cinzel font-bold tracking-wider text-burgundy-800 bg-burgundy-50 border border-burgundy-200">
            {category}
          </span>
          <div className="w-7 h-7 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-600">
            <MapPin className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Venue Name */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-burgundy-950 leading-snug mb-1.5">
          {venueName}
        </h3>

        {/* Date / Time if passed */}
        {(date || time) && (
          <p className="font-cinzel text-[11px] sm:text-xs text-gold-700 tracking-wide mb-1 font-bold">
            {date} {time ? `• ${time}` : ""}
          </p>
        )}

        <p className="font-sans text-[11px] text-slate-500 mb-1.5 italic">
          {locationLine}
        </p>

        {/* Address */}
        <p className="font-sans text-xs text-[#4E4442] leading-relaxed mb-4">
          {fullAddress}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-gold-400/25">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-xs transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-burgundy-500"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Get Directions</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>

        <button
          onClick={handleCopyAddress}
          type="button"
          aria-label="Copy venue address"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 border border-gold-300/60 text-xs font-sans font-medium transition-all active:scale-95 shadow-2xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-sage-600" />
              <span className="text-sage-700 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

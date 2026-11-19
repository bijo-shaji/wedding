import React from "react";

/**
 * Elegant Golden Christian Cross with ornate detail
 */
export const GoldenCross: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 48,
}) => {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 60 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crossGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9F2E3" />
          <stop offset="35%" stopColor="#D7AB63" />
          <stop offset="70%" stopColor="#C59546" />
          <stop offset="100%" stopColor="#9C6B25" />
        </linearGradient>
      </defs>

      {/* Vertical beam */}
      <path
        d="M30 4 L30 80"
        stroke="url(#crossGoldGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Horizontal beam */}
      <path
        d="M12 28 L48 28"
        stroke="url(#crossGoldGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Decorative filigree tips */}
      <circle cx="30" cy="4" r="2.5" fill="url(#crossGoldGrad)" />
      <circle cx="30" cy="80" r="2.5" fill="url(#crossGoldGrad)" />
      <circle cx="12" cy="28" r="2.5" fill="url(#crossGoldGrad)" />
      <circle cx="48" cy="28" r="2.5" fill="url(#crossGoldGrad)" />

      {/* Center ray halo / diamond ornament */}
      <circle cx="30" cy="28" r="5.5" stroke="url(#crossGoldGrad)" strokeWidth="1.2" fill="none" opacity="0.8" />
      <circle cx="30" cy="28" r="2.2" fill="url(#crossGoldGrad)" />
      
      {/* Subtle rays */}
      <path d="M22 20 L26 24 M38 20 L34 24 M22 36 L26 32 M38 36 L34 32" stroke="url(#crossGoldGrad)" strokeWidth="1" opacity="0.6" />
    </svg>
  );
};

/**
 * Ornamental Gold Divider with delicate center diamond
 */
export const GoldDivider: React.FC<{ className?: string; subtitle?: string }> = ({
  className = "",
  subtitle,
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`} aria-hidden="true">
      <div className="h-[1px] w-16 sm:w-28 md:w-36 bg-gradient-to-r from-transparent via-gold-400 to-gold-500 opacity-60" />
      <div className="flex items-center gap-1.5 text-gold-500">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 opacity-70" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transform rotate-45 text-gold-500">
          <rect x="7" y="7" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="#FAF4E9" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 opacity-70" />
      </div>
      <div className="h-[1px] w-16 sm:w-28 md:w-36 bg-gradient-to-l from-transparent via-gold-400 to-gold-500 opacity-60" />
      {subtitle && (
        <span className="sr-only">{subtitle}</span>
      )}
    </div>
  );
};

/**
 * Burgundy & Blush Floral Corner Motif (High elegance botanical vector)
 */
export const FloralCorner: React.FC<{
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
}> = ({ position = "top-left", className = "", size = 160 }) => {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "none";
    }
  };

  return (
    <div
      className={`pointer-events-none select-none transition-opacity duration-1000 ${className}`}
      style={{ transform: getTransform() }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px]"
      >
        <defs>
          <linearGradient id="roseBurgundy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A71D36" />
            <stop offset="60%" stopColor="#7C1024" />
            <stop offset="100%" stopColor="#5E0B1B" />
          </linearGradient>
          <linearGradient id="petalBlush" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9EDED" />
            <stop offset="70%" stopColor="#EAC0BD" />
            <stop offset="100%" stopColor="#DC9D99" />
          </linearGradient>
          <linearGradient id="leafSage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8E9E82" />
            <stop offset="100%" stopColor="#59654C" />
          </linearGradient>
          <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7EEDC" />
            <stop offset="50%" stopColor="#D7AB63" />
            <stop offset="100%" stopColor="#A6772E" />
          </linearGradient>
        </defs>

        {/* Delicate Golden Vines */}
        <path
          d="M10 10 C 60 20, 100 50, 130 110 C 145 140, 150 180, 150 190"
          stroke="url(#goldFiligree)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M10 10 C 20 60, 50 100, 110 130 C 140 145, 180 150, 190 150"
          stroke="url(#goldFiligree)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Sage Green Leaves */}
        <path
          d="M70 42 C 85 30, 105 38, 98 56 C 90 70, 75 58, 70 42 Z"
          fill="url(#leafSage)"
          opacity="0.85"
        />
        <path
          d="M42 70 C 30 85, 38 105, 56 98 C 70 90, 58 75, 42 70 Z"
          fill="url(#leafSage)"
          opacity="0.85"
        />
        <path
          d="M110 90 C 128 85, 142 98, 135 112 C 122 124, 112 108, 110 90 Z"
          fill="url(#leafSage)"
          opacity="0.8"
        />
        <path
          d="M90 110 C 85 128, 98 142, 112 135 C 124 122, 108 112, 90 110 Z"
          fill="url(#leafSage)"
          opacity="0.8"
        />

        {/* Blush Pink Blossom Petals */}
        <circle cx="58" cy="58" r="28" fill="url(#petalBlush)" opacity="0.9" />
        <circle cx="76" cy="46" r="18" fill="url(#petalBlush)" opacity="0.85" />
        <circle cx="46" cy="76" r="18" fill="url(#petalBlush)" opacity="0.85" />
        
        {/* Burgundy Rose Core */}
        <circle cx="56" cy="56" r="19" fill="url(#roseBurgundy)" />
        <path
          d="M48 52 C 52 46, 62 46, 66 52 C 68 56, 65 62, 58 64 C 52 64, 46 58, 48 52 Z"
          fill="#5E0B1B"
          opacity="0.7"
        />
        <circle cx="56" cy="56" r="6" fill="#4D0A16" />

        {/* Gold Berries / Stamen dots */}
        <circle cx="36" cy="38" r="2.8" fill="url(#goldFiligree)" />
        <circle cx="38" cy="36" r="2" fill="url(#goldFiligree)" />
        <circle cx="95" cy="45" r="2.5" fill="url(#goldFiligree)" />
        <circle cx="45" cy="95" r="2.5" fill="url(#goldFiligree)" />
        <circle cx="125" cy="115" r="2.2" fill="url(#goldFiligree)" />
        <circle cx="115" cy="125" r="2.2" fill="url(#goldFiligree)" />
      </svg>
    </div>
  );
};

/**
 * Gentle floating rose petals canvas / particle layer
 * Hardware accelerated, pointer-events-none, respects reduced motion
 */
export const FloatingPetals: React.FC<{ active?: boolean }> = ({ active = true }) => {
  if (!active) return null;

  // We generate a deterministic set of gentle floating petals using CSS animations
  // to avoid battery drain, layout shifts, or canvas overhead on mobile devices.
  const petals = [
    { id: 1, left: "8%", delay: "0s", duration: "11s", size: 14, rotate: "25deg", opacity: 0.5 },
    { id: 2, left: "24%", delay: "3s", duration: "14s", size: 18, rotate: "-35deg", opacity: 0.6 },
    { id: 3, left: "42%", delay: "1.5s", duration: "12s", size: 12, rotate: "45deg", opacity: 0.45 },
    { id: 4, left: "68%", delay: "4s", duration: "13s", size: 16, rotate: "-15deg", opacity: 0.55 },
    { id: 5, left: "86%", delay: "2s", duration: "15s", size: 20, rotate: "60deg", opacity: 0.5 },
    { id: 6, left: "94%", delay: "5.5s", duration: "12s", size: 13, rotate: "-40deg", opacity: 0.4 },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute top-[-40px] block transition-transform will-change-transform animate-float-slow"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            style={{ transform: `rotate(${petal.rotate})` }}
          >
            <path
              d="M12 2 C 20 6, 24 16, 20 26 C 16 32, 8 32, 4 26 C 0 16, 4 6, 12 2 Z"
              fill="url(#roseBurgundy)"
              opacity="0.8"
            />
            <path
              d="M12 2 C 16 7, 19 14, 16 22 C 14 26, 9 26, 6 22 C 3 14, 7 7, 12 2 Z"
              fill="#EAC0BD"
              opacity="0.35"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};

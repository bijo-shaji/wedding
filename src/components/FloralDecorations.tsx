import React from "react";

/**
 * Regal Golden Christian Cross with ornate Kerala Cathedral detailing
 */
export const GoldenCross: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 54,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Divine Back Glow */}
      <div className="absolute w-12 h-16 bg-gold-400/25 rounded-full blur-md pointer-events-none" />

      <svg
        width={size}
        height={size * 1.4}
        viewBox="0 0 60 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-md"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="regalGoldCross" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D9" />
            <stop offset="30%" stopColor="#E5B458" />
            <stop offset="65%" stopColor="#C59546" />
            <stop offset="100%" stopColor="#875816" />
          </linearGradient>
          <filter id="crossGlint" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#875816" floodOpacity="0.35" />
          </filter>
        </defs>

        <g filter="url(#crossGlint)">
          {/* Vertical Main Beam with floriated ends */}
          <path
            d="M30 4 L30 80"
            stroke="url(#regalGoldCross)"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          {/* Horizontal Beam */}
          <path
            d="M10 28 L50 28"
            stroke="url(#regalGoldCross)"
            strokeWidth="3.6"
            strokeLinecap="round"
          />

          {/* Ornate End Finials (Trefoil style) */}
          <circle cx="30" cy="4" r="3" fill="url(#regalGoldCross)" />
          <circle cx="30" cy="80" r="3" fill="url(#regalGoldCross)" />
          <circle cx="10" cy="28" r="3" fill="url(#regalGoldCross)" />
          <circle cx="50" cy="28" r="3" fill="url(#regalGoldCross)" />

          {/* Central Halo Nimbus with radiant sunburst */}
          <circle cx="30" cy="28" r="7" stroke="url(#regalGoldCross)" strokeWidth="1.2" fill="none" opacity="0.9" />
          <circle cx="30" cy="28" r="3" fill="url(#regalGoldCross)" />

          {/* Diamond light gleam */}
          <path
            d="M21 19 L25 23 M39 19 L35 23 M21 37 L25 33 M39 37 L35 33"
            stroke="url(#regalGoldCross)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * Ornamental Gold Divider with intricate center flourish
 */
export const GoldDivider: React.FC<{ className?: string; subtitle?: string }> = ({
  className = "",
  subtitle,
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-5 ${className}`} aria-hidden="true">
      <div className="h-[1.5px] w-20 sm:w-32 md:w-44 bg-gradient-to-r from-transparent via-gold-400 to-gold-600 opacity-75" />
      <div className="flex items-center gap-1.5 text-gold-600">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 opacity-80" />
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="transform rotate-45 text-gold-600 drop-shadow-xs">
          <rect x="6" y="6" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill="#FAF4E9" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 opacity-80" />
      </div>
      <div className="h-[1.5px] w-20 sm:w-32 md:w-44 bg-gradient-to-l from-transparent via-gold-400 to-gold-600 opacity-75" />
      {subtitle && <span className="sr-only">{subtitle}</span>}
    </div>
  );
};

/**
 * Burgundy & Blush Floral Corner Motif (Super-rich botanical watercolor vectors)
 */
export const FloralCorner: React.FC<{
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
}> = ({ position = "top-left", className = "", size = 180 }) => {
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
      className={`pointer-events-none select-none transition-opacity duration-700 ${className}`}
      style={{ transform: getTransform() }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[150px] sm:max-w-[200px] md:max-w-[240px] drop-shadow-sm"
      >
        <defs>
          <linearGradient id="richRoseBurgundy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B82240" />
            <stop offset="50%" stopColor="#7C1024" />
            <stop offset="100%" stopColor="#4A0512" />
          </linearGradient>

          <linearGradient id="richPetalBlush" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0EE" />
            <stop offset="60%" stopColor="#EAC0BD" />
            <stop offset="100%" stopColor="#D58696" />
          </linearGradient>

          <linearGradient id="richLeafSage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A4B497" />
            <stop offset="50%" stopColor="#59654C" />
            <stop offset="100%" stopColor="#3B4432" />
          </linearGradient>

          <linearGradient id="richGoldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D9" />
            <stop offset="50%" stopColor="#D7AB63" />
            <stop offset="100%" stopColor="#9C6B25" />
          </linearGradient>
        </defs>

        {/* Elegant Gold Tendrils */}
        <path
          d="M8 8 C 70 20, 110 60, 145 125 C 160 160, 168 200, 168 210"
          stroke="url(#richGoldFiligree)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M8 8 C 20 70, 60 110, 125 145 C 160 160, 200 168, 210 168"
          stroke="url(#richGoldFiligree)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Sage Leaves */}
        <path
          d="M78 44 C 95 32, 118 42, 110 62 C 100 78, 82 64, 78 44 Z"
          fill="url(#richLeafSage)"
          opacity="0.9"
        />
        <path
          d="M44 78 C 32 95, 42 118, 62 110 C 78 100, 64 82, 44 78 Z"
          fill="url(#richLeafSage)"
          opacity="0.9"
        />
        <path
          d="M125 98 C 145 92, 160 108, 152 124 C 138 138, 126 120, 125 98 Z"
          fill="url(#richLeafSage)"
          opacity="0.85"
        />
        <path
          d="M98 125 C 92 145, 108 160, 124 152 C 138 138, 120 126, 98 125 Z"
          fill="url(#richLeafSage)"
          opacity="0.85"
        />

        {/* Outer Blush Blossom Petals */}
        <circle cx="64" cy="64" r="32" fill="url(#richPetalBlush)" opacity="0.95" />
        <circle cx="86" cy="50" r="22" fill="url(#richPetalBlush)" opacity="0.9" />
        <circle cx="50" cy="86" r="22" fill="url(#richPetalBlush)" opacity="0.9" />

        {/* Deep Royal Burgundy Core */}
        <circle cx="62" cy="62" r="22" fill="url(#richRoseBurgundy)" />
        <path
          d="M52 56 C 58 50, 70 50, 74 56 C 76 62, 72 70, 64 72 C 56 72, 50 64, 52 56 Z"
          fill="#4A0512"
          opacity="0.75"
        />
        <circle cx="62" cy="62" r="8" fill="#36020C" />

        {/* Shimmering Golden Stamen & Berries */}
        <circle cx="40" cy="42" r="3.2" fill="url(#richGoldFiligree)" />
        <circle cx="43" cy="38" r="2.2" fill="url(#richGoldFiligree)" />
        <circle cx="106" cy="48" r="3" fill="url(#richGoldFiligree)" />
        <circle cx="48" cy="106" r="3" fill="url(#richGoldFiligree)" />
        <circle cx="140" cy="128" r="2.5" fill="url(#richGoldFiligree)" />
        <circle cx="128" cy="140" r="2.5" fill="url(#richGoldFiligree)" />
      </svg>
    </div>
  );
};

/**
 * Ultra-Smooth Hardware-Accelerated Floating Rose Petals
 * Zero JavaScript thread overhead, purely runs on GPU transforms.
 */
export const FloatingPetals: React.FC<{ active?: boolean }> = ({ active = true }) => {
  if (!active) return null;

  const petals = [
    { id: 1, left: "7%", delay: "0s", duration: "10s", size: 16, rotate: "25deg", opacity: 0.65 },
    { id: 2, left: "22%", delay: "2.5s", duration: "13s", size: 20, rotate: "-35deg", opacity: 0.7 },
    { id: 3, left: "38%", delay: "1.2s", duration: "11s", size: 14, rotate: "45deg", opacity: 0.55 },
    { id: 4, left: "55%", delay: "4s", duration: "12.5s", size: 18, rotate: "-20deg", opacity: 0.65 },
    { id: 5, left: "74%", delay: "1.8s", duration: "14s", size: 22, rotate: "55deg", opacity: 0.6 },
    { id: 6, left: "89%", delay: "5s", duration: "11.5s", size: 15, rotate: "-45deg", opacity: 0.5 },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute top-[-40px] block will-change-transform animate-float-slow"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.35}
            viewBox="0 0 24 32"
            fill="none"
            style={{ transform: `rotate(${petal.rotate})` }}
            className="drop-shadow-xs"
          >
            <path
              d="M12 2 C 20 6, 24 16, 20 26 C 16 32, 8 32, 4 26 C 0 16, 4 6, 12 2 Z"
              fill="url(#richRoseBurgundy)"
              opacity="0.85"
            />
            <path
              d="M12 2 C 16 7, 19 14, 16 22 C 14 26, 9 26, 6 22 C 3 14, 7 7, 12 2 Z"
              fill="#EAC0BD"
              opacity="0.4"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};

/**
 * Ambient Golden Bokeh & Sparkles
 */
export const GoldenSparkleAura: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute top-2/3 right-1/6 w-80 h-80 bg-burgundy-500/10 rounded-full blur-3xl" />
    </div>
  );
};

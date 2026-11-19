import React from "react";
import { motion } from "framer-motion";

/**
 * Sacred Kerala Christian Minnu (താലികെട്ട് / മിന്നുകെട്ട്)
 * The sacred leaf-shaped gold pendant featuring the cross made of 21 gold beads,
 * suspended on the ceremonial Manthrakodi threads with a divine golden aura.
 */
export const KeralaMinnuMotif: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 110,
}) => {
  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      aria-label="Sacred Kerala Christian Minnu - Minnukettu Tradition"
    >
      {/* Divine Golden Halo / Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-gold-300/30 via-gold-400/40 to-amber-200/20 blur-xl pointer-events-none"
      />

      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 120 156"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg overflow-visible"
      >
        <defs>
          {/* Pure Gold Radiant Gradient */}
          <linearGradient id="minnuGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D4" />
            <stop offset="25%" stopColor="#ECC480" />
            <stop offset="50%" stopColor="#D7AB63" />
            <stop offset="75%" stopColor="#BF8936" />
            <stop offset="100%" stopColor="#875816" />
          </linearGradient>

          {/* Manthrakodi Silk Threads Gradient (Traditional Golden-Red silk) */}
          <linearGradient id="threadSilk" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A71D36" />
            <stop offset="40%" stopColor="#D7AB63" />
            <stop offset="100%" stopColor="#7C1024" />
          </linearGradient>

          <filter id="goldGlint" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D7AB63" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* 21 Manthrakodi Threads (Seven Strands of Three) flowing from above */}
        <g stroke="url(#threadSilk)" strokeWidth="1" opacity="0.85">
          <path d="M60 0 C 58 15, 54 28, 56 42" />
          <path d="M60 0 C 60 15, 58 28, 59 42" />
          <path d="M60 0 C 62 15, 62 28, 61 42" />
          <path d="M60 0 C 64 15, 66 28, 64 42" />
          <path d="M60 0 C 56 15, 52 28, 54 42" />
        </g>

        {/* Sacred Knot connecting the threads to the Minnu ring */}
        <circle cx="60" cy="42" r="3.5" fill="url(#minnuGold)" stroke="#875816" strokeWidth="0.8" />
        <circle cx="60" cy="47" r="4.5" fill="none" stroke="url(#minnuGold)" strokeWidth="2" />

        {/* The Kerala Minnu Pendant: Traditional Ela (Leaf/Heart) Shape */}
        <g filter="url(#goldGlint)" transform="translate(0, 10)">
          <path
            d="M60 46 C 40 46, 32 66, 32 82 C 32 104, 48 122, 60 136 C 72 122, 88 104, 88 82 C 88 66, 80 46, 60 46 Z"
            fill="url(#minnuGold)"
            stroke="#9C6B25"
            strokeWidth="1.5"
          />

          {/* Inner embossed bevel line of the leaf */}
          <path
            d="M60 52 C 45 52, 38 68, 38 82 C 38 100, 50 115, 60 126 C 70 115, 82 100, 82 82 C 82 68, 75 52, 60 52 Z"
            fill="none"
            stroke="#FFF2D4"
            strokeWidth="0.8"
            opacity="0.75"
          />

          {/* Sacred Cross of 21 Golden Beads (Cross on the Minnu) */}
          {/* Vertical Arm: 13 beads */}
          <g fill="#FFF5DB" stroke="#875816" strokeWidth="0.4">
            <circle cx="60" cy="64" r="1.8" />
            <circle cx="60" cy="69" r="1.8" />
            <circle cx="60" cy="74" r="1.8" />
            <circle cx="60" cy="79" r="2.2" /> {/* Center intersection */}
            <circle cx="60" cy="85" r="1.8" />
            <circle cx="60" cy="90" r="1.8" />
            <circle cx="60" cy="95" r="1.8" />
            <circle cx="60" cy="100" r="1.8" />
            <circle cx="60" cy="105" r="1.8" />
            <circle cx="60" cy="110" r="1.8" />

            {/* Horizontal Arm: 8 beads (4 left, 4 right) */}
            <circle cx="46" cy="79" r="1.8" />
            <circle cx="50" cy="79" r="1.8" />
            <circle cx="55" cy="79" r="1.8" />
            <circle cx="65" cy="79" r="1.8" />
            <circle cx="70" cy="79" r="1.8" />
            <circle cx="74" cy="79" r="1.8" />
          </g>

          {/* Shimmering Center Light Reflection */}
          <circle cx="60" cy="79" r="3.2" fill="none" stroke="#FFF9EB" strokeWidth="1" opacity="0.9" />
          <circle cx="60" cy="79" r="1.2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Animated Intertwined Wedding Rings (മോതിരം മാറ്റൽ / Ring Exchange)
 * Beautiful golden bands with diamond sparkle glints.
 */
export const RingExchangeMotif: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 110,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      aria-label="Ring Exchange Ceremony - Engagement Tradition"
    >
      {/* Ambient Ring Glow */}
      <motion.div
        animate={{
          scale: [0.95, 1.1, 0.95],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-28 h-24 rounded-full bg-gradient-to-r from-gold-300/30 via-amber-300/30 to-gold-400/20 blur-xl pointer-events-none"
      />

      <svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 140 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg overflow-visible"
      >
        <defs>
          <linearGradient id="ringGold1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D9" />
            <stop offset="30%" stopColor="#ECC480" />
            <stop offset="60%" stopColor="#D7AB63" />
            <stop offset="100%" stopColor="#8A5B18" />
          </linearGradient>

          <linearGradient id="ringGold2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D9" />
            <stop offset="35%" stopColor="#ECC480" />
            <stop offset="70%" stopColor="#D7AB63" />
            <stop offset="100%" stopColor="#9C6B25" />
          </linearGradient>

          <radialGradient id="diamondSparkle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2F4FF" />
            <stop offset="100%" stopColor="#A3D4FF" />
          </radialGradient>
        </defs>

        {/* Groom's Band (Left Ring) */}
        <g transform="translate(10, 5)">
          <ellipse
            cx="45"
            cy="52"
            rx="32"
            ry="24"
            fill="none"
            stroke="url(#ringGold1)"
            strokeWidth="7"
          />
          <ellipse
            cx="45"
            cy="52"
            rx="32"
            ry="24"
            fill="none"
            stroke="#FFF5E0"
            strokeWidth="1.2"
            opacity="0.8"
          />
        </g>

        {/* Bride's Ring with Solitaire Gem (Right Ring, intertwined) */}
        <g transform="translate(25, 5)">
          <ellipse
            cx="70"
            cy="52"
            rx="32"
            ry="24"
            fill="none"
            stroke="url(#ringGold2)"
            strokeWidth="6"
          />
          <ellipse
            cx="70"
            cy="52"
            rx="32"
            ry="24"
            fill="none"
            stroke="#FFF5E0"
            strokeWidth="1"
            opacity="0.8"
          />

          {/* Solitaire Diamond Setting Mount */}
          <path
            d="M66 26 L74 26 L72 32 L68 32 Z"
            fill="url(#ringGold2)"
            stroke="#8A5B18"
            strokeWidth="0.8"
          />

          {/* Brilliant Solitaire Gem */}
          <polygon
            points="70,14 77,22 75,27 65,27 63,22"
            fill="url(#diamondSparkle)"
            stroke="#8EC5FC"
            strokeWidth="0.8"
          />

          {/* Diamond Facets */}
          <polygon points="70,14 77,22 70,27 63,22" fill="#FFFFFF" opacity="0.6" />

          {/* Twinkling Star Glint */}
          <motion.g
            animate={{
              rotate: [0, 45, 90],
              scale: [0.8, 1.25, 0.8],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            transform="translate(70, 16)"
          >
            <path
              d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
              fill="#FFFFFF"
            />
          </motion.g>
        </g>
      </svg>
    </div>
  );
};

/**
 * Toast & Celebration Goblets (for Wedding Reception)
 */
export const ReceptionToastMotif: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 90,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      aria-label="Wedding Reception Celebration & Feast"
    >
      <motion.div
        animate={{
          scale: [0.95, 1.1, 0.95],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-24 h-24 rounded-full bg-gold-400/20 blur-xl pointer-events-none"
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md overflow-visible"
      >
        <defs>
          <linearGradient id="gobletGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D4" />
            <stop offset="40%" stopColor="#ECC480" />
            <stop offset="80%" stopColor="#D7AB63" />
            <stop offset="100%" stopColor="#875816" />
          </linearGradient>
        </defs>

        {/* Left Flute Glass (Tilted) */}
        <g transform="rotate(-14 42 60)">
          <path
            d="M36 25 Q 40 46 42 56 L 42 78 L 34 82 L 50 82 L 44 78 L 44 56 Q 48 46 48 25 Z"
            fill="url(#gobletGold)"
            stroke="#9C6B25"
            strokeWidth="1"
          />
          <ellipse cx="42" cy="25" rx="6" ry="2.5" fill="#FFF8E7" opacity="0.8" />
        </g>

        {/* Right Flute Glass (Tilted opposite) */}
        <g transform="rotate(14 58 60)">
          <path
            d="M52 25 Q 52 46 56 56 L 56 78 L 50 82 L 66 82 L 58 78 L 58 56 Q 60 46 64 25 Z"
            fill="url(#gobletGold)"
            stroke="#9C6B25"
            strokeWidth="1"
          />
          <ellipse cx="58" cy="25" rx="6" ry="2.5" fill="#FFF8E7" opacity="0.8" />
        </g>

        {/* Cheers Sparkles */}
        <motion.circle
          cx="50"
          cy="26"
          r="3"
          fill="#FFF9E8"
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <circle cx="46" cy="18" r="1.5" fill="#D7AB63" />
        <circle cx="54" cy="16" r="1.8" fill="#D7AB63" />
        <circle cx="50" cy="11" r="1.2" fill="#ECC480" />
      </svg>
    </div>
  );
};

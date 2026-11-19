import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoldenCross, FloralCorner } from "./FloralDecorations";
import { EVENT_CONFIG } from "../config/event";
import { ChevronDown, Sparkles } from "lucide-react";

interface InvitationIntroProps {
  onComplete: () => void;
  prefersReducedMotion: boolean;
}

export const InvitationIntro: React.FC<InvitationIntroProps> = ({
  onComplete,
  prefersReducedMotion,
}) => {
  // Stages:
  // 1: Arrival (Closed envelope with wax seal)
  // 2: Opening (Flap opens, card slides up)
  // 3: Names Reveal (Names & verse calligraphy)
  // 4: Welcome & Explore
  const [stage, setStage] = useState<number>(1);
  const [isOpening, setIsOpening] = useState<boolean>(false);

  // If user prefers reduced motion, complete immediately without animations
  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [prefersReducedMotion, onComplete]);

  // Timed progression through stages once opening is triggered
  useEffect(() => {
    if (!isOpening) return;

    // Stage 1 -> 2 immediately on trigger
    setStage(2);

    const timerStage3 = setTimeout(() => {
      setStage(3);
    }, 1100);

    const timerStage4 = setTimeout(() => {
      setStage(4);
    }, 2400);

    return () => {
      clearTimeout(timerStage3);
      clearTimeout(timerStage4);
    };
  }, [isOpening]);

  const handleOpenEnvelope = () => {
    if (stage === 1) {
      setIsOpening(true);
    }
  };

  const handleSkip = () => {
    try {
      sessionStorage.setItem("wedding_intro_seen", "true");
    } catch {
      // Ignore storage errors in restricted iframe
    }
    onComplete();
  };

  const handleFinishAndExplore = () => {
    try {
      sessionStorage.setItem("wedding_intro_seen", "true");
    } catch {
      // Ignore
    }
    onComplete();
  };

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-intro-modal"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-ivory-100 overflow-hidden px-4 select-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(215, 171, 99, 0.12) 0%, rgba(124, 16, 36, 0.04) 50%, #FAF4E9 100%)",
        }}
      >
        {/* Subtle background corner florals */}
        <div className="absolute top-0 left-0">
          <FloralCorner position="top-left" size={180} className="opacity-70" />
        </div>
        <div className="absolute top-0 right-0">
          <FloralCorner position="top-right" size={180} className="opacity-70" />
        </div>
        <div className="absolute bottom-0 left-0">
          <FloralCorner position="bottom-left" size={180} className="opacity-70" />
        </div>
        <div className="absolute bottom-0 right-0">
          <FloralCorner position="bottom-right" size={180} className="opacity-70" />
        </div>

        {/* Skip button in header */}
        <button
          onClick={handleSkip}
          type="button"
          aria-label="Skip invitation intro"
          className="absolute top-6 right-6 z-30 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-cinzel font-semibold text-burgundy-700 bg-white/70 hover:bg-white border border-gold-400/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          Skip Intro &rarr;
        </button>

        {/* Cinematic Main Container */}
        <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[520px]">
          {/* STAGE 1 & 2: The Envelope Experience */}
          {stage < 3 && (
            <motion.div
              className="relative w-[320px] sm:w-[380px] h-[240px] sm:h-[260px] perspective-1000 flex items-center justify-center cursor-pointer"
              onClick={handleOpenEnvelope}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Outer Envelope Glow */}
              <div className="absolute -inset-4 bg-gold-400/15 rounded-2xl blur-xl pointer-events-none animate-pulse-subtle" />

              {/* Envelope Body (Back pocket) */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F2E4CF] to-[#E3CEAF] rounded-xl shadow-envelope border border-gold-400/50 overflow-hidden">
                {/* Triangular internal lining in subtle burgundy */}
                <div className="absolute inset-0 bg-[#640D1D] opacity-15 clip-path-triangle" />
              </div>

              {/* The Invitation Card (Slides Up during Stage 2) */}
              <motion.div
                className="absolute inset-x-3 bottom-2 h-[220px] sm:h-[240px] bg-[#FDFAF5] rounded-lg border border-gold-400/60 shadow-md p-4 flex flex-col items-center justify-center text-center z-10"
                animate={
                  stage === 2
                    ? { y: -110, scale: 1.05, opacity: 1 }
                    : { y: 0, scale: 0.98, opacity: 0.9 }
                }
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-full h-full border border-gold-400/30 rounded p-3 flex flex-col items-center justify-center">
                  <GoldenCross size={26} className="mb-2" />
                  <p className="font-cinzel text-[10px] tracking-widest text-gold-600 uppercase mb-1">
                    Wedding Invitation
                  </p>
                  <h3 className="font-script text-3xl sm:text-4xl text-burgundy-700 leading-none">
                    Sheba &amp; Kenneth
                  </h3>
                  <p className="font-cinzel text-[10px] tracking-widest text-sage-600 mt-2 uppercase">
                    January 2027 • Kerala
                  </p>
                </div>
              </motion.div>

              {/* Envelope Flap (Top fold that hinges open) */}
              <motion.div
                className="absolute top-0 inset-x-0 h-[130px] origin-top z-20"
                animate={
                  stage === 2
                    ? { rotateX: 180, zIndex: 5 }
                    : { rotateX: 0, zIndex: 20 }
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Triangle Flap Shape */}
                <svg
                  viewBox="0 0 380 130"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-md"
                >
                  <path
                    d="M0 0 L190 130 L380 0 Z"
                    fill="#EAD5B8"
                    stroke="#D7AB63"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M10 5 L190 120 L370 5"
                    stroke="#D7AB63"
                    strokeWidth="0.8"
                    strokeDasharray="4,3"
                    opacity="0.5"
                  />
                </svg>
              </motion.div>

              {/* Front Pocket (Left and Right Triangles) */}
              <div className="absolute inset-0 pointer-events-none z-15">
                <svg
                  viewBox="0 0 380 260"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M0 260 L190 125 L380 260 Z"
                    fill="#DFC499"
                    stroke="#D7AB63"
                    strokeWidth="1"
                    opacity="0.9"
                  />
                  <path
                    d="M0 0 L0 260 L190 125 Z"
                    fill="#E5D0A7"
                    opacity="0.75"
                  />
                  <path
                    d="M380 0 L380 260 L190 125 Z"
                    fill="#DBC195"
                    opacity="0.75"
                  />
                </svg>
              </div>

              {/* Burgundy Wax Seal (Stage 1 center) */}
              <AnimatePresence>
                {stage === 1 && (
                  <motion.div
                    key="wax-seal"
                    exit={{ scale: 0, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-[85px] sm:top-[95px] z-30 flex items-center justify-center cursor-pointer"
                  >
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-burgundy-600 via-burgundy-700 to-burgundy-900 shadow-xl border-2 border-gold-400/80 flex items-center justify-center group hover:scale-105 transition-transform">
                      {/* Wax Rim Texture */}
                      <div className="absolute inset-1 rounded-full border border-gold-300/40" />
                      {/* Seal Monogram */}
                      <span className="font-cinzel text-xs font-bold text-gold-200 tracking-wider">
                        S &amp; K
                      </span>
                      {/* Pulse hint */}
                      <span className="absolute -bottom-7 whitespace-nowrap text-[11px] font-cinzel font-semibold tracking-wider text-burgundy-800 bg-white/80 px-2.5 py-0.5 rounded-full border border-gold-400/30 shadow-xs">
                        Tap to Open
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STAGE 3 & 4: Seamless transition to Hero Presentation */}
          {stage >= 3 && (
            <motion.div
              key="hero-reveal-card"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md gold-border-card rounded-2xl shadow-wedding p-6 sm:p-8 flex flex-col items-center text-center relative z-20"
            >
              {/* Subtle top shimmer banner */}
              <div className="flex items-center gap-2 text-gold-600 text-xs font-cinzel tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Wedding &amp; Engagement Invitation</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              {/* Golden Cross */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <GoldenCross size={42} className="mb-4" />
              </motion.div>

              {/* Bible Verse */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-6 px-4"
              >
                <p className="font-serif italic text-base sm:text-lg text-burgundy-800 leading-relaxed">
                  &ldquo;{EVENT_CONFIG.bibleVerse.verse}&rdquo;
                </p>
                <p className="font-cinzel text-xs font-semibold text-gold-600 tracking-widest mt-1">
                  {EVENT_CONFIG.bibleVerse.reference}
                </p>
              </motion.div>

              {/* Couple Calligraphic Names Reveal */}
              <div className="my-2 flex flex-col items-center">
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="font-script text-4xl sm:text-5xl text-burgundy-700 leading-tight"
                >
                  {EVENT_CONFIG.couple.bride.fullName}
                </motion.h1>

                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="font-serif italic text-2xl text-gold-600 my-1"
                >
                  &amp;
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="font-script text-4xl sm:text-5xl text-burgundy-700 leading-tight"
                >
                  {EVENT_CONFIG.couple.groom.fullName}
                </motion.h1>
              </div>

              {/* STAGE 4: Family message & Explore CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
                className="mt-6 flex flex-col items-center"
              >
                <p className="font-serif text-sm sm:text-base text-[#4A3E3D] max-w-xs leading-relaxed mb-6">
                  Together with our families, we joyfully invite you to celebrate our
                  engagement and wedding.
                </p>

                <button
                  onClick={handleFinishAndExplore}
                  type="button"
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-burgundy-700 via-burgundy-800 to-burgundy-900 text-ivory-100 font-cinzel text-xs tracking-widest uppercase font-semibold shadow-lg hover:shadow-xl hover:from-burgundy-600 hover:to-burgundy-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <span>Explore Our Celebration</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Helper caption for stage 1 */}
          {stage === 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.5 }}
              className="mt-6 font-cinzel text-xs tracking-widest text-[#6E5D53] uppercase text-center"
            >
              A Personal Invitation from Sheba &amp; Kenneth
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

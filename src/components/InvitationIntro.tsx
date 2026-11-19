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
  const [stage, setStage] = useState<number>(1);
  const [isOpening, setIsOpening] = useState<boolean>(false);

  // If user prefers reduced motion, skip immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [prefersReducedMotion, onComplete]);

  // Silky timed progression once opened
  useEffect(() => {
    if (!isOpening) return;

    setStage(2);

    const timer3 = setTimeout(() => {
      setStage(3);
    }, 900);

    const timer4 = setTimeout(() => {
      setStage(4);
    }, 2200);

    return () => {
      clearTimeout(timer3);
      clearTimeout(timer4);
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
      // Ignore in restricted environments
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
        exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF4E9] overflow-hidden px-4 select-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(215, 171, 99, 0.22) 0%, rgba(124, 16, 36, 0.08) 50%, #FAF4E9 100%)",
        }}
      >
        {/* Ambient Golden Rays Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-r from-gold-300/20 to-amber-200/20 blur-3xl" />
        </div>

        {/* Corner Florals */}
        <div className="absolute top-0 left-0">
          <FloralCorner position="top-left" size={190} className="opacity-80" />
        </div>
        <div className="absolute top-0 right-0">
          <FloralCorner position="top-right" size={190} className="opacity-80" />
        </div>
        <div className="absolute bottom-0 left-0">
          <FloralCorner position="bottom-left" size={190} className="opacity-80" />
        </div>
        <div className="absolute bottom-0 right-0">
          <FloralCorner position="bottom-right" size={190} className="opacity-80" />
        </div>

        {/* Skip button in header */}
        <button
          onClick={handleSkip}
          type="button"
          aria-label="Skip invitation intro"
          className="absolute top-6 right-6 z-30 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-cinzel font-semibold text-burgundy-800 bg-white/85 hover:bg-white border border-gold-400/50 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-500 hover:scale-105 active:scale-95"
        >
          Skip Intro &rarr;
        </button>

        {/* Main Envelope & Card Stage */}
        <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[540px]">
          {/* STAGE 1 & 2: Royal Envelope */}
          {stage < 3 && (
            <motion.div
              className="relative w-[320px] sm:w-[390px] h-[250px] sm:h-[270px] perspective-1000 flex items-center justify-center cursor-pointer will-change-transform"
              onClick={handleOpenEnvelope}
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Outer Envelope Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-gold-400/25 via-amber-300/30 to-gold-500/25 rounded-3xl blur-2xl pointer-events-none animate-pulse-subtle" />

              {/* Envelope Body (Back pocket with gold borders) */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F7EEDC] via-[#EED9B2] to-[#DFC499] rounded-2xl shadow-envelope border-2 border-gold-400/70 overflow-hidden">
                <div className="absolute inset-0 bg-[#7C1024] opacity-15" />
              </div>

              {/* The Invitation Card (Smoothly slides up during Stage 2) */}
              <motion.div
                className="absolute inset-x-3 bottom-2 h-[230px] sm:h-[250px] bg-gradient-to-b from-[#FFFDF9] to-[#FAF4E9] rounded-xl border border-gold-400/80 shadow-lg p-4 flex flex-col items-center justify-center text-center z-10 will-change-transform"
                animate={
                  stage === 2
                    ? { y: -125, scale: 1.05, opacity: 1 }
                    : { y: 0, scale: 0.98, opacity: 0.9 }
                }
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-full h-full border border-gold-400/40 rounded-lg p-3 flex flex-col items-center justify-center bg-white/60 backdrop-blur-xs">
                  {EVENT_CONFIG.features.couplePhotoUrl ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400 shadow-xs mb-1.5">
                      <img
                        src={EVENT_CONFIG.features.couplePhotoUrl}
                        alt="Sheba & Kenneth"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ) : (
                    <GoldenCross size={28} className="mb-2" />
                  )}
                  <p className="font-cinzel text-[10px] tracking-widest text-gold-700 uppercase font-semibold mb-0.5">
                    Wedding &amp; Engagement
                  </p>
                  <h3 className="font-script text-2xl sm:text-3xl text-burgundy-800 leading-none">
                    Sheba &amp; Kenneth
                  </h3>
                  <p className="font-cinzel text-[9px] tracking-widest text-sage-600 mt-1 uppercase font-semibold">
                    January 2027 • Kerala, India
                  </p>
                </div>
              </motion.div>

              {/* Envelope Flap (Hinges open in 3D) */}
              <motion.div
                className="absolute top-0 inset-x-0 h-[140px] origin-top z-20 will-change-transform"
                animate={
                  stage === 2
                    ? { rotateX: 180, zIndex: 5 }
                    : { rotateX: 0, zIndex: 20 }
                }
                transition={{ duration: 0.75, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <svg
                  viewBox="0 0 390 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-md"
                >
                  <path
                    d="M0 0 L195 140 L390 0 Z"
                    fill="#EED9B2"
                    stroke="#D7AB63"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 6 L195 128 L378 6"
                    stroke="#C59546"
                    strokeWidth="1"
                    strokeDasharray="5,4"
                    opacity="0.6"
                  />
                </svg>
              </motion.div>

              {/* Envelope Front Pocket Triangular Folds */}
              <div className="absolute inset-0 pointer-events-none z-15">
                <svg
                  viewBox="0 0 390 270"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M0 270 L195 130 L390 270 Z"
                    fill="#E2C99F"
                    stroke="#D7AB63"
                    strokeWidth="1.2"
                    opacity="0.95"
                  />
                  <path
                    d="M0 0 L0 270 L195 130 Z"
                    fill="#EAD5B8"
                    opacity="0.8"
                  />
                  <path
                    d="M390 0 L390 270 L195 130 Z"
                    fill="#E0C69C"
                    opacity="0.8"
                  />
                </svg>
              </div>

              {/* Royal Burgundy Wax Seal */}
              <AnimatePresence>
                {stage === 1 && (
                  <motion.div
                    key="wax-seal"
                    exit={{ scale: 0, opacity: 0, rotate: 60 }}
                    transition={{ duration: 0.35 }}
                    className="absolute top-[90px] sm:top-[100px] z-30 flex items-center justify-center cursor-pointer group"
                  >
                    {/* Pulsing ring aura */}
                    <div className="absolute w-20 h-20 rounded-full bg-gold-400/40 animate-ping opacity-35" />

                    <div className="relative w-18 h-18 rounded-full bg-gradient-to-br from-burgundy-500 via-burgundy-700 to-burgundy-900 shadow-2xl border-2 border-gold-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {/* Wax Rim Texture */}
                      <div className="absolute inset-1 rounded-full border border-gold-300/50" />
                      {/* Seal Monogram */}
                      <span className="font-cinzel text-sm font-bold text-gold-200 tracking-wider">
                        S &amp; K
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
              initial={{ scale: 0.9, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md gold-border-card rounded-3xl p-7 sm:p-9 flex flex-col items-center text-center relative z-20"
            >
              {/* Shimmer banner */}
              <div className="flex items-center gap-2 text-gold-600 text-xs font-cinzel tracking-widest uppercase mb-3 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Holy Matrimony &amp; Engagement</span>
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              </div>

              {/* Golden Cross */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                <GoldenCross size={44} className="mb-4" />
              </motion.div>

              {/* Bible Verse */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6 px-3"
              >
                <p className="font-serif italic text-base sm:text-lg text-burgundy-900 leading-relaxed font-medium">
                  &ldquo;{EVENT_CONFIG.bibleVerse.verse}&rdquo;
                </p>
                <p className="font-cinzel text-xs font-semibold text-gold-600 tracking-widest mt-1.5">
                  {EVENT_CONFIG.bibleVerse.reference}
                </p>
              </motion.div>

              {/* Couple Names Calligraphy Reveal */}
              <div className="my-2 flex flex-col items-center">
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="font-script text-3xl sm:text-4xl text-burgundy-800 leading-tight drop-shadow-xs"
                >
                  {EVENT_CONFIG.couple.bride.fullName}
                </motion.h1>

                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="font-serif italic text-xl text-gold-600 my-0.5 font-bold"
                >
                  &amp;
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                  className="font-script text-3xl sm:text-4xl text-burgundy-800 leading-tight drop-shadow-xs"
                >
                  {EVENT_CONFIG.couple.groom.fullName}
                </motion.h1>
              </div>

              {/* Couple Portrait in the Reveal Card */}
              {EVENT_CONFIG.features.couplePhotoUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="my-3 relative w-28 h-36 sm:w-32 sm:h-40 rounded-t-full rounded-b-[50px] overflow-hidden border-2 border-gold-400 shadow-md"
                >
                  <img
                    src={EVENT_CONFIG.features.couplePhotoUrl}
                    alt="Sheba & Kenneth"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              )}

              {/* Family Message & Explore CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="mt-6 flex flex-col items-center"
              >
                <p className="font-serif text-sm sm:text-base text-[#4A3E3D] max-w-xs leading-relaxed mb-6 font-medium">
                  Together with our families, we joyfully invite you to celebrate our
                  engagement and wedding.
                </p>

                <button
                  onClick={handleFinishAndExplore}
                  type="button"
                  className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-burgundy-700 via-burgundy-800 to-burgundy-900 text-ivory-100 font-cinzel text-xs tracking-widest uppercase font-semibold shadow-xl hover:shadow-2xl hover:from-burgundy-600 hover:to-burgundy-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <span>Explore Our Celebration</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-gold-300" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Helper caption for stage 1 */}
          {stage === 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              transition={{ delay: 0.4 }}
              className="mt-6 font-cinzel text-xs tracking-widest text-[#5E4B43] uppercase text-center font-semibold"
            >
              A Personal Invitation from Sheba &amp; Kenneth
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

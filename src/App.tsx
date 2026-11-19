import React, { useState, useEffect } from "react";
import { EVENT_CONFIG } from "./config/event";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { InvitationIntro } from "./components/InvitationIntro";
import { Navbar } from "./components/Navbar";
import { FloatingPetals, GoldenSparkleAura } from "./components/FloralDecorations";
import { Hero } from "./components/Hero";
import { CelebrationIntro } from "./components/CelebrationIntro";
import { Engagement } from "./components/Engagement";
import { Wedding } from "./components/Wedding";
import { Reception } from "./components/Reception";
import { VenuesSection } from "./components/VenuesSection";
import { GuestInquiry } from "./components/GuestInquiry";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const {
    isPlaying: isPlayingMusic,
    toggleMusic: handleToggleMusic,
    playMusic: handlePlayMusic,
  } = useBackgroundMusic();

  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }
    return true;
  });

  // Always reset scroll to the beginning after page reload / refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleIntroComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen bg-transparent text-[#2A2121] overflow-x-hidden selection:bg-blush-200 selection:text-burgundy-900">
      {/* Cinematic Invitation Intro Modal (Envelope Opening without 'Tap to open' text badge) */}
      {showIntro && (
        <InvitationIntro
          onComplete={handleIntroComplete}
          prefersReducedMotion={prefersReducedMotion}
          onUserGesture={handlePlayMusic}
        />
      )}

      {/* Ambient Bokeh Atmosphere */}
      <GoldenSparkleAura />

      {/* Persistent Navigation Bar with WhatsApp Share, Replay Intro & Background Melody */}
      <Navbar
        onReplayIntro={handleReplayIntro}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
      />

      {/* Subtle Floating Rose Petals Layer */}
      <FloatingPetals active={EVENT_CONFIG.features.enableRosePetals && !prefersReducedMotion} />

      {/* Main Single Page Content */}
      <main className="relative z-10">
        {/* Section A: Hero with Pinterest Couple Artwork */}
        <Hero />

        {/* Section B: Our Love, Our Celebration */}
        <CelebrationIntro />

        {/* Section C: The Engagement (Saturday, Jan 2, 2027) with Luxury Banquet Hall Backdrop */}
        <Engagement />

        {/* Section D: The Holy Matrimony (Monday, Jan 11, 2027) with Cathedral Backdrop & Parents */}
        <Wedding />

        {/* Section E: Wedding Reception (Monday, Jan 11, 2027) with Evening Ballroom Backdrop */}
        <Reception />

        {/* Section F: Venues & Directions */}
        <VenuesSection />

        {/* Section G: Guest Assistance / Enquiry Form (Hidden when showGuestInquiry is false) */}
        {EVENT_CONFIG.features.showGuestInquiry && <GuestInquiry />}
      </main>

      {/* Section I & J: Final Blessing & Copyright Footer */}
      <Footer />
    </div>
  );
};

export default App;

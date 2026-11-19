import React, { useState } from "react";
import { EVENT_CONFIG } from "./config/event";
import { useReducedMotion } from "./hooks/useReducedMotion";
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

  // Determine if intro has been seen previously in this session
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }
    try {
      const seen = sessionStorage.getItem("wedding_intro_seen");
      return seen !== "true";
    } catch {
      return true;
    }
  });

  const [showPetals, setShowPetals] = useState<boolean>(
    EVENT_CONFIG.features.enableRosePetals && !prefersReducedMotion
  );

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const handleTogglePetals = () => {
    setShowPetals((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF4E9] text-[#2A2121] overflow-x-hidden selection:bg-blush-200 selection:text-burgundy-900">
      {/* Ambient Bokeh Atmosphere */}
      <GoldenSparkleAura />

      {/* Cinematic Invitation Intro Modal */}
      {showIntro && (
        <InvitationIntro
          onComplete={handleIntroComplete}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}

      {/* Persistent Navigation Bar with WhatsApp Share & Intro Replay */}
      <Navbar
        onReplayIntro={handleReplayIntro}
        showPetals={showPetals}
        onTogglePetals={handleTogglePetals}
      />

      {/* Subtle Floating Rose Petals Layer */}
      <FloatingPetals active={showPetals && !prefersReducedMotion} />

      {/* Main Single Page Content */}
      <main className="relative z-10">
        {/* Section A: Hero */}
        <Hero />

        {/* Section B: Our Love, Our Celebration */}
        <CelebrationIntro />

        {/* Section C: The Engagement (Saturday, Jan 2, 2027) with Ring Exchange Motif */}
        <Engagement />

        {/* Section D: The Holy Matrimony (Monday, Jan 11, 2027) with Kerala Minnu Motif */}
        <Wedding />

        {/* Section E: Wedding Reception (Monday, Jan 11, 2027) with Celebration Toast Motif */}
        <Reception />

        {/* Section F: Venues & Directions */}
        <VenuesSection />

        {/* Section G: Guest Assistance / Enquiry Form */}
        <GuestInquiry />
      </main>

      {/* Section I & J: Final Blessing, Subtle Share Link & Copyright Footer */}
      <Footer />
    </div>
  );
};

export default App;

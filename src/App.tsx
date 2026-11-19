import React, { useState } from "react";
import { EVENT_CONFIG } from "./config/event";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { InvitationIntro } from "./components/InvitationIntro";
import { Navbar } from "./components/Navbar";
import { FloatingPetals } from "./components/FloralDecorations";
import { Hero } from "./components/Hero";
import { CelebrationIntro } from "./components/CelebrationIntro";
import { Engagement } from "./components/Engagement";
import { Wedding } from "./components/Wedding";
import { Reception } from "./components/Reception";
import { VenuesSection } from "./components/VenuesSection";
import { GuestInquiry } from "./components/GuestInquiry";
import { ShareInvitation } from "./components/ShareInvitation";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Determine if intro has been seen previously in this session
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    // Skip if user prefers reduced motion
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
    <div className="relative min-h-screen bg-ivory-100 text-[#2B2625] overflow-x-hidden selection:bg-blush-200 selection:text-burgundy-900">
      {/* Cinematic Invitation Intro Modal */}
      {showIntro && (
        <InvitationIntro
          onComplete={handleIntroComplete}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}

      {/* Persistent Navigation Bar */}
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

        {/* Section C: The Engagement (Saturday, Jan 2, 2027) */}
        <Engagement />

        {/* Section D: The Holy Matrimony (Monday, Jan 11, 2027) */}
        <Wedding />

        {/* Section E: Wedding Reception (Monday, Jan 11, 2027) */}
        <Reception />

        {/* Section F: Venues & Directions */}
        <VenuesSection />

        {/* Section G: Guest Assistance / Enquiry Form */}
        <GuestInquiry />

        {/* Section H: Share Invitation */}
        <ShareInvitation />
      </main>

      {/* Section I & J: Final Blessing & Copyright Footer */}
      <Footer />
    </div>
  );
};

export default App;

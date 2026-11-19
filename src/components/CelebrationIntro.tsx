import React from "react";
import { GoldDivider } from "./FloralDecorations";
import { Heart } from "lucide-react";

export const CelebrationIntro: React.FC = () => {
  return (
    <section
      id="our-celebration"
      className="py-14 sm:py-20 px-4 text-center max-w-3xl mx-auto scroll-mt-20"
    >
      <div className="flex items-center justify-center mb-3 text-gold-500">
        <Heart className="w-5 h-5 fill-gold-400 text-gold-500 drop-shadow-xs" />
      </div>

      <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-[0.25em] text-burgundy-700 uppercase mb-3">
        Our Love, Our Celebration
      </p>

      <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#2B2625] leading-relaxed max-w-xl mx-auto">
        &ldquo;Two hearts, two families, one beautiful beginning.&rdquo;
      </h2>

      <GoldDivider className="my-5" />

      <p className="font-sans text-xs sm:text-sm text-[#5C5251] max-w-lg mx-auto leading-relaxed">
        With immense joy and gratitude to God, we invite you to join us as we pledge our love,
        exchange sacred vows, and celebrate the union of our lives and families.
      </p>
    </section>
  );
};

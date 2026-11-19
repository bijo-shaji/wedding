import React, { useState } from "react";
import { GoldDivider } from "./FloralDecorations";
import { Share2, MessageCircle, Copy, Check, Sparkles } from "lucide-react";

export const ShareInvitation: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "https://shebakenneth.wedding";
  };

  const shareTitle = "Sheba & Kenneth — A Celebration of Love";
  const shareText = `Together with our families, we joyfully invite you to celebrate our Engagement (Jan 2, 2027) and Holy Matrimony (Jan 11, 2027).\n\nExplore our wedding invitation:`;

  const handleWhatsAppShare = () => {
    const url = getShareUrl();
    const fullMessage = `${shareTitle}\n\n${shareText}\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    const url = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `${shareTitle}\n${shareText}`,
          url: url,
        });
      } catch {
        // User cancelled or aborted
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="share"
      className="py-12 sm:py-16 px-4 max-w-3xl mx-auto text-center scroll-mt-20"
    >
      <div className="gold-border-card rounded-3xl p-6 sm:p-10 shadow-wedding">
        <div className="flex items-center justify-center gap-1.5 text-gold-600 font-cinzel text-xs font-semibold tracking-widest uppercase mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Pass On the Joy</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-800 leading-tight">
          Share Our Invitation
        </h2>

        <GoldDivider className="my-3" />

        <p className="font-sans text-xs sm:text-sm text-[#5C5251] max-w-md mx-auto mb-8">
          Help us share the joy of our upcoming wedding celebrations with family, friends, and loved
          ones.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* WhatsApp Direct Share */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BE5C] text-white font-cinzel text-xs tracking-wider uppercase font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Share via WhatsApp</span>
          </button>

          {/* Native Web Share API if supported */}
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Link</span>
            </button>
          )}

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-burgundy-800 border border-gold-400/60 font-cinzel text-xs tracking-wider uppercase font-semibold shadow-xs transition-all transform hover:-translate-y-0.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-sage-600" />
                <span className="text-sage-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gold-600" />
                <span>Copy Invitation Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

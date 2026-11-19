import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, Film, MessageCircle } from "lucide-react";

interface NavbarProps {
  onReplayIntro: () => void;
  showPetals: boolean;
  onTogglePetals: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReplayIntro,
  showPetals,
  onTogglePetals,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Celebrations", href: "#our-celebration" },
    { label: "Engagement", href: "#engagement" },
    { label: "Wedding", href: "#wedding" },
    { label: "Venues", href: "#venues" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsAppShare = () => {
    const url = typeof window !== "undefined" ? window.location.origin : "https://shebakenneth.wedding";
    const text = `Sheba & Kenneth — A Celebration of Love\nTogether with our families, we joyfully invite you to celebrate our Engagement (Jan 2, 2027) & Holy Matrimony (Jan 11, 2027).\n\nExplore our invitation:\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "nav-glass shadow-sm py-2.5" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo / Monogram */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group"
          aria-label="Back to top"
        >
          <span className="font-script text-2xl sm:text-3xl text-burgundy-800 font-bold group-hover:text-burgundy-950 transition-colors">
            Sheba &amp; Kenneth
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="font-cinzel text-xs uppercase tracking-widest text-slate-800 hover:text-burgundy-800 transition-colors font-semibold"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Controls (WhatsApp Share, Replay Intro & Petal Toggle) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Subtle WhatsApp Share Button */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            aria-label="Share invitation on WhatsApp"
            title="Share invitation on WhatsApp"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20BE5C] text-white text-xs font-cinzel font-bold tracking-wider shadow-xs transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="text-[11px] uppercase">WhatsApp</span>
          </button>

          {/* Replay Intro button */}
          <button
            type="button"
            onClick={onReplayIntro}
            aria-label="Replay cinematic intro"
            title="Replay cinematic intro"
            className="p-2 rounded-full text-gold-700 hover:text-burgundy-800 hover:bg-gold-100/70 transition-colors border border-transparent hover:border-gold-300/50 text-xs font-cinzel flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px] tracking-wider uppercase font-semibold">
              Replay Intro
            </span>
          </button>

          {/* Toggle Rose Petals */}
          <button
            type="button"
            onClick={onTogglePetals}
            aria-label="Toggle floating petals"
            title="Toggle floating petals"
            className={`p-2 rounded-full transition-colors border ${
              showPetals
                ? "bg-blush-100/90 text-burgundy-800 border-blush-300"
                : "text-slate-400 border-transparent hover:text-slate-600"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            aria-label="Share on WhatsApp"
            className="p-1.5 bg-[#25D366] text-white rounded-full shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
          </button>

          <button
            type="button"
            onClick={onReplayIntro}
            aria-label="Replay intro"
            title="Replay intro"
            className="p-1.5 text-gold-700 hover:text-burgundy-800 rounded-lg"
          >
            <Film className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="p-2 text-burgundy-900 rounded-lg hover:bg-gold-100/60 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden nav-glass border-b border-gold-300/40 px-4 py-4 animate-in fade-in slide-in-from-top-3">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="text-left py-2 px-3 rounded-lg font-cinzel text-xs uppercase tracking-widest text-slate-800 hover:bg-gold-100/60 hover:text-burgundy-800 transition-colors font-semibold"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-gold-300/30 flex items-center justify-between px-3">
              <span className="font-cinzel text-xs text-slate-700 uppercase tracking-wider font-semibold">
                Floating Rose Petals
              </span>
              <button
                type="button"
                onClick={onTogglePetals}
                className={`px-3 py-1 rounded-full text-xs font-cinzel font-bold uppercase tracking-wider transition-colors ${
                  showPetals
                    ? "bg-burgundy-700 text-ivory-100"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {showPetals ? "On" : "Off"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

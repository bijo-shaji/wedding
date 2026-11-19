import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, Film } from "lucide-react";

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
          <span className="font-script text-2xl sm:text-3xl text-burgundy-700 font-bold group-hover:text-burgundy-900 transition-colors">
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
              className="font-cinzel text-xs uppercase tracking-widest text-slate-700 hover:text-burgundy-700 transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Controls (Replay Intro & Petal Toggle) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Replay Intro button */}
          <button
            type="button"
            onClick={onReplayIntro}
            aria-label="Replay cinematic intro"
            title="Replay cinematic intro"
            className="p-2 rounded-full text-gold-700 hover:text-burgundy-700 hover:bg-gold-100/60 transition-colors border border-transparent hover:border-gold-300/40 text-xs font-cinzel flex items-center gap-1.5"
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
                ? "bg-blush-100/80 text-burgundy-700 border-blush-300"
                : "text-slate-400 border-transparent hover:text-slate-600"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onReplayIntro}
            aria-label="Replay intro"
            title="Replay intro"
            className="p-1.5 text-gold-700 hover:text-burgundy-700 rounded-lg"
          >
            <Film className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="p-2 text-burgundy-800 rounded-lg hover:bg-gold-100/60 transition-colors"
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
                className="text-left py-2 px-3 rounded-lg font-cinzel text-xs uppercase tracking-widest text-slate-800 hover:bg-gold-100/50 hover:text-burgundy-700 transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-gold-300/30 flex items-center justify-between px-3">
              <span className="font-cinzel text-xs text-slate-600 uppercase tracking-wider">
                Floating Rose Petals
              </span>
              <button
                type="button"
                onClick={onTogglePetals}
                className={`px-3 py-1 rounded-full text-xs font-cinzel font-semibold uppercase tracking-wider transition-colors ${
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

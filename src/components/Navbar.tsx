import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, Film, MessageCircle } from "lucide-react";
import { EVENT_CONFIG } from "../config/event";

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
  const [activeSection, setActiveSection] = useState<string>("our-celebration");

  const navItems = [
    { label: "Celebrations", href: "#our-celebration", id: "our-celebration" },
    { label: "Engagement", href: "#engagement", id: "engagement" },
    { label: "Wedding", href: "#wedding", id: "wedding" },
    { label: "Venues", href: "#venues", id: "venues" },
    ...(EVENT_CONFIG.features.showGuestInquiry
      ? [{ label: "Contact", href: "#contact", id: "contact" }]
      : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = navItems.map((item) => item.id);
      const scrollPos = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const navbar = document.querySelector("nav");
      const navHeight = navbar ? navbar.offsetHeight : 64;

      // Find the primary visual target: inner card (.rounded-3xl) or heading (.text-center) or the element
      const targetElement =
        (element.querySelector(".rounded-3xl") as HTMLElement) ||
        (element.querySelector(".text-center") as HTMLElement) ||
        element;

      const elementRect = targetElement.getBoundingClientRect();
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      // Clean, elegant spacing below navbar (14px on mobile, 20px on desktop)
      const topGap = window.innerWidth < 768 ? 14 : 20;
      const targetY = elementRect.top + currentScroll - navHeight - topGap;

      window.scrollTo({
        top: Math.max(0, Math.round(targetY)),
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const handleWhatsAppShare = () => {
    const url = typeof window !== "undefined" ? window.location.origin : "https://shebakenneth.wedding";
    const text = `Sheba & Kenneth — A Celebration of Love\nTogether with our families, we joyfully invite you to celebrate our Engagement (Jan 2, 2027) & Holy Matrimony (Jan 11, 2027).\n\nExplore our wedding invitation:\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "nav-glass shadow-sm py-2.5" : "bg-transparent py-3.5 sm:py-4"
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
          className="flex items-center gap-2 group active:scale-95 transition-transform"
          aria-label="Back to top"
        >
          <span className="font-script text-2xl sm:text-3xl text-burgundy-800 font-bold group-hover:text-burgundy-950 transition-colors">
            Sheba &amp; Kenneth
          </span>
        </a>

        {/* Desktop Navigation Links with Active Indicator */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className={`relative py-1 font-cinzel text-xs uppercase tracking-widest font-bold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "text-burgundy-900"
                    : "text-slate-700 hover:text-burgundy-800"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 via-burgundy-700 to-gold-400 rounded-full animate-in fade-in duration-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls (WhatsApp Share, Replay Intro & Petal Toggle) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Subtle WhatsApp Share Button */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            aria-label="Share invitation on WhatsApp"
            title="Share invitation on WhatsApp"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20BE5C] text-white text-xs font-cinzel font-bold tracking-wider shadow-xs transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="text-[11px] uppercase">WhatsApp</span>
          </button>

          {/* Replay Intro button */}
          <button
            type="button"
            onClick={onReplayIntro}
            aria-label="Replay invitation envelope opening"
            title="Replay invitation envelope opening"
            className="p-2 rounded-full text-gold-700 hover:text-burgundy-800 hover:bg-gold-100/70 transition-colors border border-transparent hover:border-gold-300/50 text-xs font-cinzel flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px] tracking-wider uppercase font-bold">
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
            className="p-2 bg-[#25D366] text-white rounded-full shadow-xs active:scale-90 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
          </button>

          <button
            type="button"
            onClick={onReplayIntro}
            aria-label="Replay intro"
            title="Replay intro"
            className="p-2 text-gold-700 hover:text-burgundy-800 rounded-full active:scale-90 transition-transform hover:bg-gold-100/60"
          >
            <Film className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="p-2 text-burgundy-900 rounded-full hover:bg-gold-100/60 active:scale-90 transition-transform"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden nav-glass border-b border-gold-300/40 px-4 py-3.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className={`text-left py-2.5 px-3.5 rounded-xl font-cinzel text-xs uppercase tracking-widest transition-all active:scale-98 ${
                    isActive
                      ? "bg-gold-100/90 text-burgundy-950 font-bold border-l-3 border-gold-500 shadow-2xs"
                      : "text-slate-800 hover:bg-gold-50/60 hover:text-burgundy-800 font-semibold"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-2.5 mt-1 border-t border-gold-300/30 flex items-center justify-between px-3">
              <span className="font-cinzel text-[11px] text-slate-700 uppercase tracking-wider font-semibold">
                Floating Rose Petals
              </span>
              <button
                type="button"
                onClick={onTogglePetals}
                className={`px-3 py-1 rounded-full text-[11px] font-cinzel font-bold uppercase tracking-wider transition-all active:scale-95 ${
                  showPetals
                    ? "bg-burgundy-700 text-ivory-100 shadow-xs"
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

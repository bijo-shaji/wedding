import React, { useState, useEffect, useRef } from "react";
import { EVENT_CONFIG } from "../config/event";
import { GoldDivider } from "./FloralDecorations";
import { guestInquirySchema } from "../lib/validation";
import {
  HelpCircle,
  Send,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export const GuestInquiry: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState<"engagement" | "wedding" | "reception" | "other">(
    "engagement"
  );
  const [message, setMessage] = useState("");
  const [companyHoneypot, setCompanyHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

  // Initialize Turnstile widget if sitekey is present
  useEffect(() => {
    if (!turnstileSiteKey || !turnstileContainerRef.current) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const initTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        try {
          turnstileWidgetId.current = window.turnstile.render(
            turnstileContainerRef.current,
            {
              sitekey: turnstileSiteKey,
              callback: (token: string) => setTurnstileToken(token),
              "expired-callback": () => setTurnstileToken(""),
              "error-callback": () => setTurnstileToken(""),
              theme: "light",
            }
          );
        } catch {
          // Ignore render conflicts
        }
      } else {
        timeoutId = setTimeout(initTurnstile, 400);
      }
    };

    initTurnstile();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [turnstileSiteKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    // Client-side Zod validation
    const validationResult = guestInquirySchema.safeParse({
      name,
      phone: phone || undefined,
      email: email || undefined,
      enquiryType,
      message,
      company: companyHoneypot,
      turnstileToken: turnstileToken || undefined,
    });

    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as string;
        formattedErrors[fieldName] = issue.message;
      }
      setFieldErrors(formattedErrors);

      if (formattedErrors.contactRequirement) {
        setErrorMessage(formattedErrors.contactRequirement);
      } else {
        setErrorMessage("Please correct the highlighted fields before submitting.");
      }
      return;
    }

    // Bot honeypot caught
    if (companyHoneypot) {
      setSuccessMessage("Thank you! Your message has been received.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationResult.data),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your inquiry. Please try again shortly.");
      }

      setSuccessMessage(
        "Thank you! Your enquiry has been safely received. The organizing team will get back to you promptly."
      );
      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setTurnstileToken("");
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-14 sm:py-20 px-4 max-w-3xl mx-auto scroll-mt-20"
    >
      <div className="gold-border-card rounded-3xl p-6 sm:p-10 shadow-wedding relative">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1.5 text-gold-600 font-cinzel text-xs font-semibold tracking-widest uppercase mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Guest Assistance</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-800 leading-tight">
            Need Help Finding Us?
          </h2>

          <GoldDivider className="my-3" />

          <p className="font-sans text-xs sm:text-sm text-[#5C5251] max-w-lg mx-auto">
            Need directions or have a question about the celebration? We would love to help.
          </p>

          {/* Optional Direct Call Button if configured */}
          {EVENT_CONFIG.organizer.supportPhoneNumber && (
            <div className="mt-4">
              <a
                href={`tel:${EVENT_CONFIG.organizer.supportPhoneNumber}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-cinzel font-semibold tracking-wider hover:bg-gold-200 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>Call Organizer Helpline: {EVENT_CONFIG.organizer.supportPhoneNumber}</span>
              </a>
            </div>
          )}
        </div>

        {/* Success Alert */}
        {successMessage ? (
          <div className="p-6 rounded-2xl bg-sage-50 border border-sage-300 text-center animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-sage-100 border border-sage-300 text-sage-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-sage-800 mb-2">
              Message Received
            </h3>
            <p className="font-sans text-xs sm:text-sm text-sage-700 leading-relaxed max-w-md mx-auto">
              {successMessage}
            </p>
            <button
              onClick={() => setSuccessMessage(null)}
              type="button"
              className="mt-5 px-5 py-2 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-cinzel text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* General Error Banner */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-burgundy-50 border border-burgundy-200 flex items-start gap-2.5 text-burgundy-800 text-xs font-sans leading-relaxed"
              >
                <AlertCircle className="w-4 h-4 text-burgundy-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name Field (Required) */}
            <div>
              <label
                htmlFor="guest-name"
                className="block font-cinzel text-xs font-semibold text-burgundy-900 uppercase tracking-wider mb-1.5"
              >
                Your Name <span className="text-burgundy-600">*</span>
              </label>
              <input
                id="guest-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                required
                className={`w-full px-4 py-3 rounded-xl bg-white/90 border ${
                  fieldErrors.name ? "border-red-400 ring-1 ring-red-300" : "border-gold-300/60"
                } text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-slate-400 transition-all`}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-600 font-sans">{fieldErrors.name}</p>
              )}
            </div>

            {/* Contact Method Notice */}
            <div className="p-3 rounded-xl bg-gold-50/70 border border-gold-200 text-xs font-sans text-slate-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
              <span>
                Please provide <strong>either a phone number or an email address</strong> so we can
                reply to you.
              </span>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label
                  htmlFor="guest-phone"
                  className="block font-cinzel text-xs font-semibold text-burgundy-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  <span>Phone Number</span>
                </label>
                <input
                  id="guest-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 rounded-xl bg-white/90 border ${
                    fieldErrors.phone ? "border-red-400 ring-1 ring-red-300" : "border-gold-300/60"
                  } text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-slate-400 transition-all`}
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{fieldErrors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="guest-email"
                  className="block font-cinzel text-xs font-semibold text-burgundy-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-gold-600" />
                  <span>Email Address</span>
                </label>
                <input
                  id="guest-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-white/90 border ${
                    fieldErrors.email ? "border-red-400 ring-1 ring-red-300" : "border-gold-300/60"
                  } text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-slate-400 transition-all`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{fieldErrors.email}</p>
                )}
              </div>
            </div>

            {/* Enquiry Category */}
            <div>
              <label
                htmlFor="enquiry-type"
                className="block font-cinzel text-xs font-semibold text-burgundy-900 uppercase tracking-wider mb-1.5"
              >
                Enquiry Category
              </label>
              <select
                id="enquiry-type"
                value={enquiryType}
                onChange={(e) =>
                  setEnquiryType(
                    e.target.value as "engagement" | "wedding" | "reception" | "other"
                  )
                }
                className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gold-300/60 text-sm font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <option value="engagement">The Engagement (Valakom)</option>
                <option value="wedding">The Holy Matrimony (St Mary’s Cathedral Punalur)</option>
                <option value="reception">Wedding Reception (K G Convention Centre)</option>
                <option value="other">General Directions / Other Questions</option>
              </select>
            </div>

            {/* Message Field (Required) */}
            <div>
              <label
                htmlFor="guest-message"
                className="block font-cinzel text-xs font-semibold text-burgundy-900 uppercase tracking-wider mb-1.5"
              >
                Your Message <span className="text-burgundy-600">*</span>
              </label>
              <textarea
                id="guest-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about route details, timings, parking, or leave a warm blessing for Kenneth and Sheba..."
                required
                className={`w-full px-4 py-3 rounded-xl bg-white/90 border ${
                  fieldErrors.message
                    ? "border-red-400 ring-1 ring-red-300"
                    : "border-gold-300/60"
                } text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-slate-400 transition-all`}
              />
              {fieldErrors.message && (
                <p className="mt-1 text-xs text-red-600 font-sans">{fieldErrors.message}</p>
              )}
            </div>

            {/* Honeypot field (hidden offscreen from real users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company-field">Company</label>
              <input
                id="company-field"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={companyHoneypot}
                onChange={(e) => setCompanyHoneypot(e.target.value)}
              />
            </div>

            {/* Cloudflare Turnstile explicit container */}
            {turnstileSiteKey && (
              <div className="flex justify-center my-3">
                <div ref={turnstileContainerRef} id="turnstile-container" />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-burgundy-700 via-burgundy-800 to-burgundy-900 text-ivory-100 font-cinzel text-xs tracking-widest uppercase font-semibold shadow-md hover:shadow-xl hover:from-burgundy-600 hover:to-burgundy-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold-300" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-gold-300" />
                  <span>Send Enquiry to Organizers</span>
                </>
              )}
            </button>

            {/* Privacy Notice */}
            <p className="text-[11px] text-center text-[#7A6E6A] font-sans flex items-center justify-center gap-1.5 pt-2">
              <Lock className="w-3 h-3 text-gold-600 shrink-0" />
              <span>
                Privacy Notice: Your information is strictly used to reply to your inquiry regarding
                the wedding events.
              </span>
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

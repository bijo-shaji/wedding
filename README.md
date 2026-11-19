# Sheba & Kenneth — A Celebration of Love

> A luxurious, animated digital wedding and engagement invitation website built for a Kerala Christian family celebration.

![Official Preview](public/og-image.svg)

**Developer Credit:** Designed & Developed with ♥ by **Bijo Shaji**  
**Official Couple:** Sheba Shaji & Kenneth Francis  
**Bible Verse:** *"What therefore God has joined together, let no one separate."* — Matthew 19:6

---

## 💍 Official Event Schedule

The website presents the celebrations in chronological order:

1. **The Engagement**
   - **Date & Time:** Saturday, January 2, 2027 at 11:30 AM IST
   - **Venue:** Landmark Convention Center & Auditorium
   - **Location:** MC Road, Valakom, Kollam, Kerala 691532, India
   - **Features:** Timezone-aware countdown, Add to Calendar (.ics & Google Calendar), Verified Google Maps navigation

2. **The Holy Matrimony**
   - **Date & Time:** Monday, January 11, 2027 at 11:00 AM IST
   - **Church:** Saint Mary's Roman Catholic Cathedral
   - **Location:** Cathedral Road, Punalur, Kollam, Kerala 691305, India
   - **Parents' Blessings:**
     - *Bride's Parents:* Shaji Mathew & Bindhu Shaji
     - *Groom's Parents:* Francis Jose & Ligy Varghese
   - **Features:** Wedding countdown, Add to Calendar, Verified Google Maps navigation

3. **Wedding Reception**
   - **Date:** Monday, January 11, 2027
   - **Time:** Reception to follow the wedding ceremony
   - **Venue:** K G Convention Centre
   - **Location:** Bharanikavu - Kollam - Shengottai Road, Punalur, Kollam, Kerala 691305, India
   - **Features:** Verified Google Maps directions

---

## 🎨 Visual Identity & Design System

- **Ivory Cream:** `#FAF4E9` (Background & parchment feel)
- **Deep Burgundy:** `#7C1024` (Calligraphy, titles & primary branding)
- **Antique Gold:** `#D7AB63` (Cross, filigree accents, ornamental borders)
- **Blush Pink:** `#EAC0BD` (Gentle floral blossoms & accents)
- **Sage Green:** `#59654C` (Leaves & subtle natural details)
- **Typography:**
  - *Alex Brush & Great Vibes:* Couple calligraphy
  - *Cinzel & Cormorant Garamond:* Regal classic serif headings
  - *Plus Jakarta Sans:* Clean, accessible modern body copy

---

## ✨ Cinematic Landing Experience

- **Stage 1 — Invitation Arrival:** Closed parchment envelope with 3D perspective, wax seal monogram (`S & K`), golden ambient glow, and corner florals.
- **Stage 2 — Envelope Reveal:** Wax seal dissolves, top flap rotates open in 3D, and the gold-bordered invitation card smoothly rises.
- **Stage 3 — Names Reveal:** Smooth transition into the hero presentation; golden Christian cross gleams, Matthew 19:6 fades in, and calligraphy reveals Sheba Shaji & Kenneth Francis.
- **Stage 4 — Welcome:** Family invitation message appears with *"Explore Our Celebration"* button.
- **Accessibility & Controls:**
  - Concise 2–4s opening sequence.
  - Visible **"Skip Intro"** button available at all times.
  - Immediate bypass when `prefers-reduced-motion` is detected.
  - Session persistence (`sessionStorage`) prevents repeated intrusive playbacks on page navigation.
  - **"Replay Intro"** button in navigation allows guests to re-watch the animation on demand.
  - Toggle for gentle floating rose petals.

---

## 🛡️ Secure Guest Enquiry Architecture

- **Serverless Endpoint:** `POST /api/inquiry`
- **Validation:** Server-side schema verification with Zod.
- **Spam & Abuse Protection:**
  - Hidden honeypot field catches automated bots.
  - Cloudflare Turnstile token validation via `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
  - Upstash Redis distributed atomic sliding-window rate limiting (5 requests per 10 minutes per IP).
  - Allowed-Origin CSRF protection.
- **Delivery:** Direct transactional delivery to organizer inbox via Resend.
- **Privacy:** Strict client-side sanitization prevents CRLF and HTML injection; zero persistent personal databases.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 10+

### 2. Clone & Install
```bash
git clone <repository-url>
cd Wedding
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(In local development, the app runs smoothly even with empty keys; Turnstile and email dispatch enter simulation mode).*

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Run Automated Tests
```bash
npm test
```

### 6. Run Production Build & Typecheck
```bash
npm run build
npm run lint
```

---

## 📁 Project Architecture

```
Wedding/
├── api/
│   ├── inquiry.ts             # Vercel serverless function (Turnstile, RateLimit, Resend)
│   └── types.ts               # Serverless HTTP request/response typing
├── public/
│   ├── favicon.svg            # Burgundy & gold Christian cross favicon
│   └── og-image.svg           # High-resolution 1200x630 Open Graph sharing preview
├── src/
│   ├── components/
│   │   ├── CelebrationIntro.tsx   # "Two hearts, two families..."
│   │   ├── Countdown.tsx          # Dual timezone-aware countdown
│   │   ├── Engagement.tsx        # Jan 2, 2027 event section
│   │   ├── FloralDecorations.tsx  # Pure SVG florals, Golden Cross, floating petals
│   │   ├── Footer.tsx             # Final blessing & Bijo Shaji developer credit
│   │   ├── GuestInquiry.tsx       # Turnstile-protected guest contact form
│   │   ├── Hero.tsx               # Calligraphy couple names, verse, cross
│   │   ├── InvitationIntro.tsx    # 4-stage cinematic envelope reveal
│   │   ├── Navbar.tsx             # Sticky glassmorphism nav with controls
│   │   ├── Reception.tsx          # Reception event section
│   │   ├── ShareInvitation.tsx    # WhatsApp & Web Share API integration
│   │   ├── VenueCard.tsx          # Reusable venue directions card
│   │   └── Wedding.tsx            # Jan 11, 2027 Holy Matrimony & parents
│   ├── config/
│   │   └── event.ts               # Single source of truth for official event details
│   ├── hooks/
│   │   ├── useCountdown.ts        # Timezone-aware countdown calculation
│   │   └── useReducedMotion.ts    # Accessibility motion detector
│   ├── lib/
│   │   ├── calendar.ts            # Google Calendar URL & RFC 5545 .ics generator
│   │   ├── maps.ts                # Verified Google Maps coordinates & links
│   │   └── validation.ts          # Zod schema and sanitization helpers
│   ├── styles/
│   │   └── globals.css            # Tailwind directives, custom parchment & gold foil
│   ├── App.tsx                    # Root layout orchestrator
│   └── main.tsx                   # React 19 application entry point
├── tests/
│   ├── calendar.test.ts           # Calendar URL & .ics format tests
│   ├── countdown.test.ts          # Timezone countdown math tests
│   ├── eventConfig.test.ts        # Official schedule & parents verification tests
│   └── validation.test.ts         # Zod schema & XSS sanitization tests
├── .env.example
├── DEPLOYMENT.md                  # Comprehensive production deployment guide
├── SECURITY.md                    # Threat model & security disclosures
├── tailwind.config.js
└── vercel.json                    # Strict CSP, HSTS, and HTTP security headers
```

---

## 📜 Copyright & Developer Credit

- **Copyright:** &copy; 2027 Sheba & Kenneth. All Rights Reserved.
- **Creator Credit:** Designed & Developed with ♥ by **Bijo Shaji**

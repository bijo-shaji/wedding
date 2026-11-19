# Production Deployment Guide — Sheba & Kenneth

This document provides a step-by-step checklist to deploy the **Sheba & Kenneth Wedding Invitation Website** to production on **Vercel** with full HTTPS, custom domain, Resend transactional emails, Cloudflare Turnstile spam protection, and Upstash Redis distributed rate limiting.

---

## 1. Local Setup & Verification

Before deploying, ensure all automated tests, linting, and production builds pass locally:

```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite
npm test

# 3. Verify TypeScript types across frontend and serverless API
npm run lint

# 4. Verify optimized production bundle
npm run build
```

Expected output:
- `17 passed (17)` in Vitest
- Zero TypeScript compiler errors
- Optimized code-split production bundles in `/dist`

---

## 2. GitHub Repository Initialization

Initialize the repository and push to GitHub:

```bash
# Initialize git if not already done
git init

# Stage all files
git add .

# Create initial commit
git commit -m "feat: complete Sheba & Kenneth luxury wedding invitation website"

# Rename default branch to main
git branch -M main

# Add your remote GitHub repository
git remote add origin https://github.com/<your-username>/sheba-kenneth-wedding.git

# Push to GitHub
git push -u origin main
```

---

## 3. Vercel Project Setup

1. Sign in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Import the `sheba-kenneth-wedding` repository.
4. Select framework preset: **Vite**.
5. Set Root Directory: `./`.
6. Leave the Build Command as `npm run build` and Output Directory as `dist`.

---

## 4. Production Environment Variables Configuration

In Vercel project settings (**Settings** > **Environment Variables**), add the following keys:

| Variable Name | Environment | Description | Example / Recommended Source |
|---|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | Production, Preview | Public Turnstile Site Key | From Cloudflare Turnstile Dashboard |
| `TURNSTILE_SECRET_KEY` | Production, Preview | Secret Turnstile verification key | Cloudflare Turnstile Dashboard |
| `RESEND_API_KEY` | Production, Preview | Resend API key for email delivery | `re_123456789...` from [Resend.com](https://resend.com) |
| `RESEND_FROM_EMAIL` | Production, Preview | Verified sender domain address | `Sheba & Kenneth <invitation@yourdomain.com>` |
| `ORGANIZER_INBOX_EMAIL` | Production, Preview | Private inbox receiving guest inquiries | `private-organizer@gmail.com` |
| `UPSTASH_REDIS_REST_URL` | Production, Preview | REST endpoint for distributed rate limiter | `https://xxxx.upstash.io` from [Upstash.com](https://upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN`| Production, Preview | REST access token for Upstash | Bearer token from Upstash |
| `ALLOWED_ORIGIN` | Production | Origin URL for CSRF protection | `https://yourdomain.com` |

---

## 5. Third-Party Service Configuration

### A. Cloudflare Turnstile (Spam Protection)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) > **Turnstile**.
2. Click **Add Widget**.
3. Name: `Sheba & Kenneth Wedding`.
4. Domain: Add your production domain (e.g., `shebakenneth.wedding`) and `localhost` (for testing).
5. Widget Mode: **Managed** (or Non-interactive).
6. Copy the **Site Key** to `VITE_TURNSTILE_SITE_KEY`.
7. Copy the **Secret Key** to `TURNSTILE_SECRET_KEY`.

### B. Resend (Email Delivery)
1. Go to [Resend Dashboard](https://resend.com) > **Domains**.
2. Click **Add Domain** (e.g. `shebakenneth.wedding`).
3. Add the provided DNS records (MX, TXT/SPF, and DKIM) to your DNS registrar.
4. Once verified, generate an API key in **API Keys** and set `RESEND_API_KEY`.
5. Set `RESEND_FROM_EMAIL` to your verified address (e.g. `Sheba & Kenneth <invitations@shebakenneth.wedding>`).
6. Set `ORGANIZER_INBOX_EMAIL` to the private email address of the organizer family.

### C. Upstash Redis (Distributed Rate Limiting)
1. Go to [Upstash Console](https://console.upstash.com).
2. Click **Create Database**.
3. Name: `wedding-ratelimit`.
4. Region: Choose `ap-south-1` (Mumbai) or region closest to India for minimal latency.
5. In the database details, scroll to **REST API** section.
6. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` into Vercel environment variables.

---

## 6. Custom Domain & HTTPS Setup

1. In Vercel, go to **Settings** > **Domains**.
2. Enter your custom domain (e.g., `shebakenneth.wedding` or `www.shebakenneth.wedding`).
3. Configure the DNS CNAME/A records at your domain registrar as instructed by Vercel:
   - For apex domain: `A` record pointing to `76.76.21.21`
   - For `www` subdomain: `CNAME` record pointing to `cname.vercel-dns.com`
4. Vercel automatically provisions a free, auto-renewing Let's Encrypt SSL/TLS certificate.
5. Verify `https://` is active and redirects from HTTP to HTTPS automatically.

---

## 7. Venue Links Verification

The venue navigation links in `src/config/event.ts` have been verified for accuracy:

1. **Engagement Venue:**
   - Landmark Convention Center & Auditorium, MC Road, Valakom, Kollam, Kerala 691532
   - URL: `https://www.google.com/maps/dir/?api=1&destination=Landmark+Convention+Center+and+Auditorium,+Valakom,+Kollam,+Kerala`

2. **Church (Holy Matrimony):**
   - Saint Mary's Roman Catholic Cathedral, Punalur, Kollam, Kerala 691305
   - URL: `https://www.google.com/maps/dir/?api=1&destination=St+Marys+Roman+Catholic+Cathedral+Punalur+Kollam+Kerala`

3. **Reception Venue:**
   - K G Convention Centre, Bharanikavu - Kollam - Shengottai Road, Punalur, Kollam, Kerala 691305
   - URL: `https://www.google.com/maps/dir/?api=1&destination=KG+Convention+Centre+Punalur+Kollam+Kerala`

---

## 8. WhatsApp & Social Preview Testing

When sending the invitation link over WhatsApp, iMessage, or Telegram:

1. Paste your production URL into WhatsApp.
2. Confirm the preview shows:
   - **Title:** `Sheba & Kenneth — A Celebration of Love`
   - **Description:** `Together with our families, we joyfully invite you to celebrate our engagement and wedding. January 2027 • Kerala, India.`
   - **Preview Thumbnail:** The original floral gold Open Graph image (`og-image.svg`).
3. Test using the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to clear cached metadata if domain was previously tested.

---

## 9. Live Smoke Testing Checklist

After deployment to production, perform the following verification:

- [ ] Open the live site on mobile (iPhone Safari / Android Chrome) and desktop.
- [ ] Observe the 4-stage envelope opening animation.
- [ ] Test the **Skip Intro** button.
- [ ] Test the **Replay Intro** button in the top navigation.
- [ ] Verify both Engagement and Wedding countdowns are ticking accurately without negative values.
- [ ] Tap **Get Directions** on all 3 venue cards and verify each opens Google Maps to the correct location.
- [ ] Tap **Add to Calendar** and test both Google Calendar and `.ics` file downloads.
- [ ] Submit a test enquiry via the guest form:
  - Submit with valid name and phone number.
  - Check that the organizer inbox receives the email with all details formatted cleanly.
  - Verify Turnstile challenge executes.
  - Verify rapid duplicate submissions are rate-limited.
- [ ] Tap **Share via WhatsApp** and confirm pre-filled message text.
- [ ] Verify developer credit: `Designed & Developed with ♥ by Bijo Shaji` is clearly visible in the footer.

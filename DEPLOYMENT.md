# Production Deployment Guide — Sheba & Kenneth

This guide explains how to deploy the **Sheba & Kenneth Wedding Invitation Website** to production on **Netlify** with free automatic SSL/HTTPS, custom domain support, and lightning-fast worldwide CDN caching.

---

## 1. Local Setup & Verification

Before deploying, ensure all automated tests, linting, and production builds pass locally:

```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite
npm test

# 3. Verify TypeScript types across all files
npm run lint

# 4. Verify optimized production bundle
npm run build
```

Expected output:
- `18 passed (18)` in Vitest
- Zero TypeScript compiler errors
- Optimized code-split production bundles in `/dist`

---

## 2. Push Code to GitHub

Open your terminal in `D:\Wedding` and execute:

```bash
# 1. Rename default branch to main
git branch -M main

# 2. Add your GitHub remote repository
# (Replace <your-username> and <your-repo> with your actual GitHub details)
git remote add origin https://github.com/<your-username>/<your-repo>.git

# 3. Push to GitHub
git push -u origin main
```

---

## 3. Deploy to Netlify via GitHub (Recommended)

1. Sign in to [Netlify Dashboard](https://app.netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Select **GitHub** and authorize Netlify.
4. Select your `sheba-kenneth-wedding` repository.
5. The build settings are automatically pre-configured by `netlify.toml`:
   - **Base directory:** `/`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy wedding** (Deploy Site).
7. Your website will be built and live across Netlify's global Edge network within 30 seconds!

---

## 4. Alternative: Instant Netlify Drop (Without Git)

If you wish to deploy instantly without setting up GitHub:

1. Run `npm run build` locally in your terminal.
2. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
3. Drag and drop the `D:\Wedding\dist` folder directly onto the page.
4. Your website is live immediately with a free HTTPS URL.

---

## 5. Custom Domain & Free SSL Setup

1. In Netlify, go to **Site settings** > **Domain management**.
2. Click **Add a domain** (e.g. `shebakenneth.com` or `shebakenneth.wedding`).
3. Follow the DNS instructions to point your domain:
   - **Apex domain:** Point `A` record to Netlify's load balancer IP (`75.2.60.5`).
   - **www subdomain:** Point `CNAME` record to your Netlify site URL (e.g., `sheba-kenneth.netlify.app`).
4. Netlify automatically generates and renews a free Let's Encrypt SSL/TLS certificate with automatic HTTP to HTTPS redirects.

---

## 6. Official Features Checklist

- [x] Zero-lag instant background melody preloaded in HTML.
- [x] Super ON / OFF music button in header and intro screen.
- [x] Responsive layout on iPhone, Android, and Desktop screens.
- [x] Navbar links align to screen top without clipping.
- [x] Verified Google Maps navigation links for Valakom and Punalur venues.
- [x] Official developer credit in footer: *"Designed & Developed with ♥ by Bijo Shaji"*.

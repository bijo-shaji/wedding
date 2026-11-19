# Security Policy & Threat Model — Sheba & Kenneth

This document outlines the security architecture, threat model, and defense-in-depth controls implemented for the **Sheba & Kenneth Wedding Invitation Website**.

---

## 1. Threat Model for the Public Guest Assistance Endpoint

### Objective
Provide wedding guests with an easy way to ask questions and request route assistance without exposing private organizer email addresses or credentials, while preventing spam, abuse, resource exhaustion, and injection attacks.

### Identified Threat Vectors & Mitigations

| Threat | Attack Vector | Implemented Defense |
|---|---|---|
| **Spam & Automated Bot Submissions** | Automated bots crawling web forms to submit promotional links or spam. | • **Cloudflare Turnstile:** Non-interactive / managed challenge verified server-side.<br/>• **Honeypot Field:** Hidden `company` field silently flags and nullifies bot submissions. |
| **Email Open Relay / Spoofing** | Attacker tampering with request payload to send arbitrary emails to third parties. | • **Hardcoded Recipient:** The destination email is strictly bound to `ORGANIZER_INBOX_EMAIL` on the server. The user cannot choose the recipient.<br/>• **Verified Sender:** Emails originate strictly from a DNS-authenticated domain (`RESEND_FROM_EMAIL`). |
| **Email Header & CRLF Injection** | Inserting `\r\nBcc:` or `\r\nCc:` into name or message fields to hijack the mailer. | • **Sanitization:** `sanitizeText` strips all `\r` and `\n` characters from single-line fields before processing. |
| **Stored or Reflected XSS** | Submitting malicious `<script>` tags in name or message fields. | • **React JSX Auto-Escaping:** User inputs are rendered as text nodes, never using `dangerouslySetInnerHTML`.<br/>• **HTML Entity Escaping:** Server-side escaping (`escapeHtml`) encodes `<`, `>`, `&`, `"`, `'` before constructing email templates. |
| **Denial of Service & API Flooding** | Attacker spamming thousands of requests to exhaust Resend email quota. | • **Upstash Redis Distributed Rate Limiting:** Sliding-window rate limiter restricted to 5 requests per 10 minutes per IP.<br/>• **Payload Size Limit:** Requests larger than 16 KB are rejected with HTTP 413. |
| **Cross-Site Request Forgery (CSRF)** | Third-party website triggering POST requests from a victim's browser. | • **Origin & Referer Check:** The server validates that incoming requests match `ALLOWED_ORIGIN`. |
| **Credential / API Key Leakage** | Leaking Resend or Redis API tokens to the client bundle. | • **Strict Boundary:** All private secrets are stored in server-side environment variables and never prefixed with `VITE_`.<br/>• **Zero Secrets in Git:** Sensitive files are excluded via `.gitignore`. |

---

## 2. Content Security Policy & Security Headers

Configured in `vercel.json` and applied to all HTTP responses:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com https://www.google.com; object-src 'none'; base-uri 'self';
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

- **HSTS:** Enforces HTTPS for 2 years with preloading.
- **CSP:** Scoped strictly to Google Fonts, Cloudflare Turnstile, and Google Maps.
- **Cache-Control:** `/api/*` endpoints enforce `no-store, max-age=0` to prevent proxy caching of personal guest inquiries.

---

## 3. Privacy & Data Handling

- **No Public Database:** Personal guest queries are transmitted immediately via transactional email to the family organizer and are not stored in any public SQL/NoSQL database.
- **No Sensitive Logs:** Application logs exclude email addresses, phone numbers, and full message bodies.
- **Privacy Notice:** Displayed on the guest enquiry form notifying guests that their details are strictly used to reply to their wedding queries.

---

## 4. Residual Risks & Ongoing Monitoring

While comprehensive defenses are deployed, no system is 100% immune:

1. **IP Rotation:** Attackers using distributed botnets across thousands of residential IPs could partially bypass IP-based rate limiting; Cloudflare Turnstile serves as the primary barrier against this.
2. **Third-Party Availability:** If Cloudflare Turnstile, Resend, or Upstash experiences downtime, the system is designed to fail gracefully with user-friendly error messages rather than crashing or leaking stack traces.
3. **Dependency Audits:** Run `npm audit` periodically to keep dependencies updated against known CVEs.

---

## 5. Vulnerability Reporting

If you identify a security vulnerability in this project, please report it privately to the developer **Bijo Shaji** before public disclosure.

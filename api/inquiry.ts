import type { VercelRequest, VercelResponse } from "./types";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { guestInquirySchema } from "../src/lib/validation";

// Maximum allowable request body size (approx 16 KB)
const MAX_PAYLOAD_BYTES = 16384;

/**
 * Cloudflare Turnstile token server-side verification
 */
async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // If not configured in local environment, allow pass-through with warning
    console.warn("[Turnstile] TURNSTILE_SECRET_KEY is not set. Skipping verification in dev mode.");
    return true;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = (await response.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (error) {
    console.error("[Turnstile] Error during verification:", error);
    // Fail secure if external verification is completely blocked
    return false;
  }
}

/**
 * Distributed rate limiting using Upstash Redis
 */
async function checkRateLimit(clientIp: string): Promise<{ success: boolean; reset?: number }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!upstashUrl || !upstashToken) {
    // Dev fallback if Upstash is not configured
    return { success: true };
  }

  try {
    const redis = new Redis({
      url: upstashUrl,
      token: upstashToken,
    });

    // 5 inquiries per 10 minutes per client IP
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "ratelimit:wedding_inquiry",
    });

    const result = await ratelimit.limit(clientIp);
    return {
      success: result.success,
      reset: result.reset,
    };
  } catch (err) {
    console.error("[RateLimit] Error checking Upstash Redis:", err);
    // Graceful fallback to avoid locking out genuine wedding guests if Redis is briefly unreachable
    return { success: true };
  }
}

/**
 * Escapes characters for safe inclusion in plain text and HTML emails
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  // Enforce Content-Type
  const contentType = req.headers["content-type"] || "";
  if (!contentType.includes("application/json")) {
    return res.status(400).json({ error: "Invalid Content-Type. Expected application/json." });
  }

  // Origin / Referer validation (Defense in Depth)
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const requestOrigin = (req.headers["origin"] as string) || (req.headers["referer"] as string);

  if (allowedOrigin && requestOrigin) {
    try {
      const allowedHost = new URL(allowedOrigin).host;
      const requestHost = new URL(requestOrigin).host;
      if (allowedHost !== requestHost) {
        return res.status(403).json({ error: "Cross-site request blocked." });
      }
    } catch {
      return res.status(403).json({ error: "Invalid request origin." });
    }
  }

  // Extract client IP behind trusted proxy
  const forwardedFor = req.headers["x-forwarded-for"];
  const clientIp = typeof forwardedFor === "string"
    ? forwardedFor.split(",")[0].trim()
    : (req.socket?.remoteAddress || "127.0.0.1");

  // Rate Limiting Check
  const rateLimitResult = await checkRateLimit(clientIp);
  if (!rateLimitResult.success) {
    return res.status(429).json({
      error: "Too many inquiries sent from this connection. Please wait a few moments before trying again.",
    });
  }

  // Parse Body
  const rawBody = req.body;
  if (!rawBody || typeof rawBody !== "object") {
    return res.status(400).json({ error: "Missing or malformed request body." });
  }

  // Payload size check
  const bodyString = JSON.stringify(rawBody);
  if (bodyString.length > MAX_PAYLOAD_BYTES) {
    return res.status(413).json({ error: "Payload exceeds allowable size." });
  }

  // Zod Validation
  const parseResult = guestInquirySchema.safeParse(rawBody);
  if (!parseResult.success) {
    const errorDetails = parseResult.error.issues.map((i) => i.message);
    return res.status(422).json({
      error: errorDetails[0] || "Invalid submission data.",
      details: errorDetails,
    });
  }

  const { name, phone, email, enquiryType, message, company, turnstileToken } = parseResult.data;

  // Bot honeypot caught: silent simulated success
  if (company && company.trim().length > 0) {
    return res.status(200).json({
      success: true,
      message: "Your inquiry has been received.",
    });
  }

  // Verify Cloudflare Turnstile token if configured
  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return res.status(400).json({ error: "Please complete the security challenge." });
    }
    const isValidToken = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!isValidToken) {
      return res.status(403).json({ error: "Security check failed. Please refresh and try again." });
    }
  }

  // Ensure Resend API Key is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  const organizerInbox = process.env.ORGANIZER_INBOX_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Kenneth & Sheba Wedding <onboarding@resend.dev>";

  if (!resendApiKey || !organizerInbox) {
    console.warn(
      "[Inquiry API] Email service not fully configured in environment (RESEND_API_KEY or ORGANIZER_INBOX_EMAIL missing)."
    );
    // In dev / test environment, return simulated success without exposing server details
    if (process.env.NODE_ENV !== "production") {
      return res.status(200).json({
        success: true,
        message: "Inquiry accepted (Dev mode: email dispatch simulated).",
        simulation: true,
      });
    }

    return res.status(503).json({
      error: "The guest assistance service is temporarily undergoing maintenance. Please try again shortly.",
    });
  }

  // Compose Email via Resend
  try {
    const resend = new Resend(resendApiKey);

    const safeName = escapeHtml(name);
    const safePhone = phone ? escapeHtml(phone) : "Not provided";
    const safeEmail = email ? escapeHtml(email) : "Not provided";
    const safeType = escapeHtml(enquiryType.toUpperCase());
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
    const submittedAtIST = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const emailSubject = `[Wedding Enquiry - ${safeType}] From ${name}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF4E9; color: #2B2625; padding: 24px; margin: 0; }
            .card { background-color: #FFFFFF; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #D7AB63; padding: 28px; box-shadow: 0 4px 12px rgba(124, 16, 36, 0.08); }
            .header { border-bottom: 2px solid #7C1024; padding-bottom: 16px; margin-bottom: 20px; text-align: center; }
            .title { color: #7C1024; font-size: 22px; margin: 0; font-weight: bold; }
            .subtitle { color: #D7AB63; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
            .detail-row { margin-bottom: 14px; font-size: 14px; }
            .label { font-weight: bold; color: #59654C; display: inline-block; width: 140px; }
            .value { color: #2B2625; }
            .message-box { background-color: #FDFCF9; border: 1px solid #EAC0BD; border-radius: 8px; padding: 16px; margin-top: 18px; font-size: 14px; line-height: 1.6; color: #2B2625; }
            .footer { margin-top: 24px; font-size: 11px; color: #8C827A; text-align: center; border-top: 1px solid #EBD8B8; padding-top: 14px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1 class="title">Kenneth &amp; Sheba Wedding</h1>
              <div class="subtitle">New Guest Enquiry</div>
            </div>
            
            <div class="detail-row">
              <span class="label">Guest Name:</span>
              <span class="value"><strong>${safeName}</strong></span>
            </div>
            <div class="detail-row">
              <span class="label">Category:</span>
              <span class="value">${safeType}</span>
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span class="value">${safePhone}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">${safeEmail}</span>
            </div>
            <div class="detail-row">
              <span class="label">Received (IST):</span>
              <span class="value">${submittedAtIST} IST</span>
            </div>

            <div class="message-box">
              <strong style="color: #7C1024; display: block; margin-bottom: 6px;">Message:</strong>
              ${safeMessage}
            </div>

            <div class="footer">
              This message was sent securely from the Kenneth &amp; Sheba Wedding Invitation Website.<br/>
              Client IP: ${clientIp}
            </div>
          </div>
        </body>
      </html>
    `;

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [organizerInbox],
      replyTo: email ? email : undefined,
      subject: emailSubject,
      html: htmlContent,
      text: `Wedding Enquiry from ${name} (${enquiryType})\nPhone: ${phone || "N/A"}\nEmail: ${email || "N/A"}\nTime: ${submittedAtIST} IST\n\nMessage:\n${message}`,
    });

    if (resendError) {
      console.error("[Inquiry API] Resend dispatch error:", resendError);
      return res.status(502).json({
        error: "Unable to dispatch your message to the organizer. Please try again shortly.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thank you! Your enquiry has been safely delivered to the wedding organizers.",
      id: resendData?.id,
    });
  } catch (error) {
    console.error("[Inquiry API] Server exception:", error);
    return res.status(500).json({
      error: "An unexpected server error occurred while processing your enquiry.",
    });
  }
}

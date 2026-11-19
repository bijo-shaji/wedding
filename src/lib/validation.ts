import { z } from "zod";

/**
 * Sanitizes input to prevent HTML/XSS and email header injections (\r, \n)
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[\r\n]+/g, " ")
    .replace(/[<>]/g, "")
    .trim();
}

export function sanitizeMultilineText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

// Phone regex allowing international formats (+91 ..., 10-15 digits, spaces, dashes)
const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,5}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{3,5}$/;

export const guestInquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters")
      .transform(sanitizeText),
    phone: z
      .string()
      .trim()
      .optional()
      .transform((val) => (val ? sanitizeText(val) : undefined))
      .refine(
        (val) => !val || (val.length >= 7 && val.length <= 20 && phoneRegex.test(val)),
        { message: "Please provide a valid contact number" }
      ),
    email: z
      .string()
      .trim()
      .optional()
      .transform((val) => (val ? sanitizeText(val.toLowerCase()) : undefined))
      .refine(
        (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        { message: "Please provide a valid email address" }
      ),
    enquiryType: z.enum(["engagement", "wedding", "reception", "other"] as const),
    message: z
      .string()
      .trim()
      .min(5, "Message must be at least 5 characters")
      .max(1000, "Message cannot exceed 1000 characters")
      .transform(sanitizeMultilineText),
    // Honeypot field (hidden from real users, filled only by naive bots)
    company: z.string().optional(),
    // Cloudflare Turnstile verification token
    turnstileToken: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasPhone = Boolean(data.phone && data.phone.trim().length > 0);
      const hasEmail = Boolean(data.email && data.email.trim().length > 0);
      return hasPhone || hasEmail;
    },
    {
      message: "Please provide at least one contact method (phone number or email address)",
      path: ["contactRequirement"],
    }
  );

export type GuestInquiryInput = z.infer<typeof guestInquirySchema>;

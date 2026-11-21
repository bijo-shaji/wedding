import { describe, it, expect } from "vitest";
import {
  guestInquirySchema,
  sanitizeText,
  sanitizeMultilineText,
} from "../src/lib/validation";

describe("Validation Library & Sanitization", () => {
  it("sanitizes single-line and multiline text preventing HTML tags and CRLF injection", () => {
    const rawInput = "John <script>alert(1)</script>\r\nMathew";
    const sanitized = sanitizeText(rawInput);
    expect(sanitized).not.toContain("<");
    expect(sanitized).not.toContain(">");
    expect(sanitized).not.toContain("\r");
    expect(sanitized).not.toContain("\n");

    const multi = sanitizeMultilineText("Line 1\n<b>Line 2</b>");
    expect(multi).toContain("Line 1\nLine 2");
    expect(multi).not.toContain("<b>");
  });

  it("accepts valid submission with both phone and email", () => {
    const validData = {
      name: "Thomas George",
      phone: "+91 98765 43210",
      email: "thomas@example.com",
      enquiryType: "wedding",
      message: "Looking forward to celebrating with Kenneth and Sheba!",
    };

    const result = guestInquirySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("accepts valid submission with phone only", () => {
    const phoneOnly = {
      name: "Mary Varghese",
      phone: "9847012345",
      enquiryType: "engagement",
      message: "Please let us know where parking is available.",
    };

    const result = guestInquirySchema.safeParse(phoneOnly);
    expect(result.success).toBe(true);
  });

  it("accepts valid submission with email only", () => {
    const emailOnly = {
      name: "George Philip",
      email: "george.p@example.com",
      enquiryType: "reception",
      message: "Sending our heartfelt prayers from abroad.",
    };

    const result = guestInquirySchema.safeParse(emailOnly);
    expect(result.success).toBe(true);
  });

  it("rejects submission if neither phone nor email is provided", () => {
    const missingContact = {
      name: "Anonymous Guest",
      enquiryType: "other",
      message: "Need some info please.",
    };

    const result = guestInquirySchema.safeParse(missingContact);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (i) => i.path[0] === "contactRequirement"
      );
      expect(issue).toBeDefined();
    }
  });

  it("rejects invalid email addresses", () => {
    const invalidEmail = {
      name: "John Doe",
      email: "not-an-email",
      enquiryType: "wedding",
      message: "Congratulations to the couple!",
    };

    const result = guestInquirySchema.safeParse(invalidEmail);
    expect(result.success).toBe(false);
  });

  it("rejects messages shorter than 5 characters", () => {
    const shortMsg = {
      name: "John Doe",
      email: "john@example.com",
      enquiryType: "wedding",
      message: "Hi",
    };

    const result = guestInquirySchema.safeParse(shortMsg);
    expect(result.success).toBe(false);
  });
});

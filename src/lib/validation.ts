// Request Validation and Sanitization Schemas using Zod
import { z } from "zod";

/**
 * Sanitizes input strings to strip dangerous HTML / script tags
 */
export function sanitizeString(val: string): string {
  return val
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

/**
 * Normalizes Indian 10-digit mobile number, stripping +91, 0 prefix, spaces, dashes
 */
export function normalizeIndianMobile(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.substring(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.substring(1);
  }
  return digits;
}

// Indian mobile regex: 10 digits starting with 6, 7, 8, 9
const indianMobileRegex = /^[6-9]\d{9}$/;

// 6-digit Indian PIN code regex
const pinCodeRegex = /^[1-9][0-9]{5}$/;

export const newConnectionSchema = z.object({
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must not exceed 80 characters")
    .transform(sanitizeString),
  mobileNumber: z
    .string()
    .transform(normalizeIndianMobile)
    .refine((val) => indianMobileRegex.test(val), {
      message: "Please enter a valid 10-digit Indian mobile number (e.g. 9471126747)",
    }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val.toLowerCase()) : undefined)),
  locality: z
    .string()
    .min(2, "Please select or enter your locality in Jamshedpur")
    .max(100)
    .transform(sanitizeString),
  pinCode: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => pinCodeRegex.test(val), {
      message: "Please enter a valid 6-digit PIN code (e.g. 831001)",
    }),
  address: z
    .string()
    .max(250)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : undefined)),
  selectedPlan: z
    .string()
    .max(100)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : undefined)),
  message: z
    .string()
    .max(500)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : undefined)),
  // Honeypot field (must remain empty for legitimate users)
  website_url: z.string().optional(),
});

export const availabilityCheckSchema = z.object({
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80)
    .transform(sanitizeString),
  mobileNumber: z
    .string()
    .transform(normalizeIndianMobile)
    .refine((val) => indianMobileRegex.test(val), {
      message: "Please enter a valid 10-digit Indian mobile number",
    }),
  locality: z
    .string()
    .min(2, "Please enter your locality in Jamshedpur")
    .max(100)
    .transform(sanitizeString),
  pinCode: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => pinCodeRegex.test(val), {
      message: "Please enter a valid 6-digit PIN code (e.g. 831001)",
    }),
  address: z
    .string()
    .max(250)
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : undefined)),
  website_url: z.string().optional(),
});

export const contactMessageSchema = z.object({
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80)
    .transform(sanitizeString),
  mobileNumber: z
    .string()
    .transform(normalizeIndianMobile)
    .refine((val) => indianMobileRegex.test(val), {
      message: "Please enter a valid 10-digit Indian mobile number",
    }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val.toLowerCase()) : undefined)),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(120)
    .transform(sanitizeString),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000)
    .transform(sanitizeString),
  website_url: z.string().optional(),
});

export const adminUpdateEnquirySchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
  adminNotes: z.string().max(1000).optional(),
});

export const adminUpdatePlanSchema = z.object({
  slug: z.string(),
  monthlyPrice: z.number().positive(),
  effectivePrice: z.number().positive(),
  discountPercent: z.number().min(0).max(100),
  isActive: z.boolean(),
  recommended: z.boolean(),
});

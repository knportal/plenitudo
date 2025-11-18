/**
 * Email validation utilities for beta signups
 */

// Common disposable email domains
const DISPOSABLE_EMAIL_DOMAINS = [
  "10minutemail.com",
  "tempmail.com",
  "guerrillamail.com",
  "mailinator.com",
  "throwaway.email",
  "temp-mail.org",
  "getnada.com",
  "mohmal.com",
  "fakeinbox.com",
  "trashmail.com",
  "yopmail.com",
  "sharklasers.com",
  "grr.la",
  "guerrillamailblock.com",
];

/**
 * Check if email domain is disposable/temporary
 */
export function isDisposableEmail(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1];
  if (!domain) return false;
  return DISPOSABLE_EMAIL_DOMAINS.includes(domain);
}

/**
 * Enhanced email validation
 * - Format validation
 * - Disposable email detection
 */
export function validateEmail(email: string): {
  valid: boolean;
  error?: string;
} {
  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Check for disposable emails
  if (isDisposableEmail(email)) {
    return {
      valid: false,
      error: "Disposable email addresses are not allowed",
    };
  }

  return { valid: true };
}

import crypto from "crypto";

/**
 * Generate a secure verification token
 */
export function generateVerificationToken(): string {
  // Use Node.js crypto for secure random token
  const array = new Uint8Array(32);
  crypto.randomFillSync(array);
  return Buffer.from(array).toString("base64url");
}


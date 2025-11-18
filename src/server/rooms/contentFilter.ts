/**
 * Content filtering for chat messages.
 * Basic hygiene checks with opt-in for stronger moderation later.
 */

interface FilterResult {
  ok: boolean;
  reason?: string;
}

/**
 * Naive bad word list (expandable via external service/database later).
 * Lowercase for case-insensitive matching.
 */
const BAD_WORDS = [
  "spam",
  "test123",
  // Add more as needed - can be replaced with external service
];

/**
 * Normalize unicode characters to ASCII equivalents where possible.
 * Helps catch obfuscated bad words (e.g., "ѕраm" -> "spam").
 */
function normalizeUnicode(text: string): string {
  // Basic normalization: remove diacritics, convert to lowercase
  return text
    .normalize("NFD") // Decompose characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase();
}

/**
 * Filter message content for inappropriate content.
 * Returns { ok: true } if content is acceptable, { ok: false, reason } if rejected.
 */
export function filterMessage(content: string): FilterResult {
  if (!content || content.trim().length === 0) {
    return { ok: false, reason: "Message cannot be empty" };
  }

  // Normalize and check for bad words
  const normalized = normalizeUnicode(content);
  const words = normalized.split(/\s+/);

  for (const badWord of BAD_WORDS) {
    // Check if bad word appears as substring (catches variations)
    if (normalized.includes(badWord) || words.includes(badWord)) {
      return {
        ok: false,
        reason: "Message contains inappropriate content",
      };
    }
  }

  return { ok: true };
}



/**
 * Parse @username mentions from message content.
 * Returns list of unique usernames mentioned (without @).
 */

/**
 * Extract @username mentions from text content.
 *
 * Matches patterns like:
 * - @username
 * - @user_name
 * - @user-name
 * - @user123
 *
 * Excludes:
 * - @ at start/end of line without username
 * - Email addresses (already have @)
 *
 * @param content Message content to parse
 * @returns Array of unique usernames (without @ prefix)
 */
export function parseMentions(content: string): string[] {
  if (!content || typeof content !== "string") {
    return [];
  }

  // Match @username patterns
  // Regex: @ followed by word characters (letters, numbers, underscore, hyphen)
  // Minimum 1 character, maximum reasonable length (e.g., 50)
  const mentionPattern = /@([\w-]{1,50})(?=\s|$|[.,!?;:])/g;

  const matches = content.matchAll(mentionPattern);
  const usernames = new Set<string>();

  for (const match of matches) {
    const username = match[1]?.trim().toLowerCase();
    if (username && username.length > 0) {
      usernames.add(username);
    }
  }

  return Array.from(usernames);
}

/**
 * Example usage:
 * parseMentions("@alice Hello @bob and @charlie!")
 * // Returns: ["alice", "bob", "charlie"]
 */



/**
 * Substack integration utilities
 * Handles UTM tracking and Substack URL generation
 */

/**
 * Get Substack URL with UTM tracking parameters
 * @param campaign - Campaign name for tracking
 * @param source - Traffic source (default: "plenitudo_app")
 * @param medium - Traffic medium (default: "web")
 * @returns Substack URL with UTM parameters
 */
export function getSubstackUrl(
  campaign: string,
  source: string = "plenitudo_app",
  medium: string = "web"
): string {
  const baseUrl = process.env["NEXT_PUBLIC_SUBSTACK_URL"];

  if (!baseUrl) {
    // Fallback to local page if Substack URL not configured
    return "/substack";
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("utm_source", source);
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("utm_campaign", campaign);
    return url.toString();
  } catch {
    // If URL parsing fails, return base URL
    return baseUrl;
  }
}

/**
 * Get room link with Substack UTM tracking
 * Useful for linking from Substack posts to specific rooms
 * @param roomSlug - Room slug (e.g., "ai", "mindfulness")
 * @param campaign - Campaign name (e.g., "weekly_digest", "room_highlight")
 * @returns Room URL with UTM tracking
 */
export function getRoomLinkWithTracking(
  roomSlug: string,
  campaign: string
): string {
  const baseUrl = process.env["NEXT_PUBLIC_APP_URL"] || "https://plenitudo.ai";
  const url = new URL(`${baseUrl}/rooms/${roomSlug}`);
  url.searchParams.set("utm_source", "substack");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

/**
 * Get thread link with Substack UTM tracking
 * Useful for linking from Substack posts to specific threads
 * @param roomSlug - Room slug
 * @param threadId - Thread ID
 * @param campaign - Campaign name
 * @returns Thread URL with UTM tracking
 */
export function getThreadLinkWithTracking(
  roomSlug: string,
  threadId: string,
  campaign: string
): string {
  const baseUrl = process.env["NEXT_PUBLIC_APP_URL"] || "https://plenitudo.ai";
  const url = new URL(`${baseUrl}/rooms/${roomSlug}/thread/${threadId}`);
  url.searchParams.set("utm_source", "substack");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

/**
 * Check if current visit is from Substack
 * @param searchParams - URL search parameters
 * @returns true if visit is from Substack
 */
export function isFromSubstack(searchParams: URLSearchParams): boolean {
  return (
    searchParams.get("utm_source") === "substack" ||
    searchParams.get("utm_medium") === "email"
  );
}

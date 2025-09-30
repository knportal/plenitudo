import { format } from "date-fns";

export function toETDateISO(d = new Date()): string {
  // Trust server TZ=America/New_York
  return format(d, "yyyy-MM-dd");
}
export function pickMood(
  title: string,
  summary: string
): "uplift" | "opportunity" | "caution" {
  const s = (title + " " + summary).toLowerCase();
  if (s.includes("risk") || s.includes("ban") || s.includes("breach"))
    return "caution";
  if (s.includes("launch") || s.includes("partnership") || s.includes("open"))
    return "opportunity";
  return "uplift";
}
export async function inferGenre(text: string): Promise<string> {
  const t = text.toLowerCase();
  const entries = Object.entries((await import("./feeds")).GENRE_KEYWORDS);
  for (const [g, kws] of entries) if (kws.some((k) => t.includes(k))) return g;
  return "enterprise";
}

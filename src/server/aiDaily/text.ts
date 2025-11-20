import { format, toZonedTime } from "date-fns-tz";

export function toETDateISO(d = new Date()): string {
  // Convert to America/New_York timezone
  const etDate = toZonedTime(d, "America/New_York");
  return format(etDate, "yyyy-MM-dd", { timeZone: "America/New_York" });
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

/**
 * Infer genre/category from title and summary using keyword matching.
 * Returns one of: policy, research, chips, enterprise, consumer, robotics, health, climate
 */
export function inferGenre(title: string, summary: string = ""): string {
  const text = (title + " " + summary).toLowerCase();

  // Policy & Regulation
  if (
    text.match(/\b(policy|regulation|government|congress|senate|law|legal|compliance|gdpr|privacy act)\b/)
  ) {
    return "policy";
  }

  // Research & Academia
  if (
    text.match(/\b(research|study|paper|university|academic|arxiv|nature|science|breakthrough|discovery|experiment)\b/)
  ) {
    return "research";
  }

  // Hardware & Chips
  if (
    text.match(/\b(chip|semiconductor|nvidia|amd|intel|gpu|tpu|hardware|fabrication|tsmc|processor)\b/)
  ) {
    return "chips";
  }

  // Robotics & Automation
  if (
    text.match(/\b(robot|robotics|autonomous|drone|automation|manufacturing|tesla bot|figure ai)\b/)
  ) {
    return "robotics";
  }

  // Health & Medical
  if (
    text.match(/\b(health|medical|healthcare|diagnosis|patient|drug|therapy|clinical|hospital|disease)\b/)
  ) {
    return "health";
  }

  // Climate & Environment
  if (
    text.match(/\b(climate|environment|carbon|emissions|renewable|energy|sustainability|green tech)\b/)
  ) {
    return "climate";
  }

  // Consumer Products
  if (
    text.match(/\b(consumer|app|phone|device|chatgpt|gemini|copilot|alexa|siri|personal|user|customer)\b/)
  ) {
    return "consumer";
  }

  // Default: Enterprise (business/corporate)
  return "enterprise";
}

export type Genre =
  | "policy"
  | "research"
  | "chips"
  | "enterprise"
  | "consumer"
  | "robotics"
  | "health"
  | "climate";
export type Mood = "uplift" | "opportunity" | "caution";

export interface SourceRef {
  title: string;
  url: string;
  publisher: string;
  publishedAt: string; // ISO
}

export interface AIDailyItemDTO {
  id: string;
  dateISO: string;
  genre: Genre;
  mood: Mood;
  title: string;
  summary: string;
  bullets: string[];
  sources: SourceRef[];
  score: number;
}

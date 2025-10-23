import Parser from "rss-parser";
import pMap from "p-map";
import { FEEDS, PUBLISHER_REP } from "./feeds";
import { clusterByTitle } from "./dedupe";
import { toETDateISO, pickMood } from "./text";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { formatISO } from "date-fns";

const prisma = new PrismaClient();
const parser = new Parser({ timeout: 15000 });

type FeedSource = {
  title: string;
  url: string;
  publisher: string;
  publishedAt: string;
  desc?: string;
};

type EligibleEntry = {
  leader: FeedSource;
  sources: FeedSource[];
  summary: string;
  bullets: string[];
};

const ItemZ = z.object({
  title: z.string(),
  link: z.string().url(),
  isoDate: z.string().optional(),
  contentSnippet: z.string().optional(),
  content: z.string().optional(),
});
type RawItem = z.infer<typeof ItemZ>;

function publisherFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "unknown";
  }
}
function publisherLabel(host: string) {
  if (host.includes("reuters")) return "Reuters";
  if (host.includes("technologyreview")) return "MIT Technology Review";
  if (host.includes("nature.com")) return "Nature";
  if (host.includes("arstechnica")) return "Ars Technica";
  if (host.includes("theverge")) return "The Verge";
  if (host.includes("techcrunch")) return "TechCrunch";
  if (host.includes("wired")) return "Wired";
  if (host.includes("venturebeat")) return "VentureBeat";
  if (host.includes("zdnet")) return "ZDNet";
  if (host.includes("artificialintelligence-news")) return "AI News";
  if (host.includes("towardsdatascience")) return "Towards Data Science";
  if (host.includes("openai.com")) return "OpenAI";
  if (host.includes("anthropic.com")) return "Anthropic";
  if (host.includes("ai.googleblog")) return "Google";
  if (host.includes("nvidia.com")) return "NVIDIA";
  if (host.includes("microsoft.com")) return "Microsoft";
  if (host.includes("meta.com")) return "Meta";
  if (host.includes("huggingface")) return "HuggingFace";
  if (host.includes("europa.eu")) return "EU Commission";
  if (host.includes("engadget")) return "Engadget";
  if (host.includes("gizmodo")) return "Gizmodo";
  if (host.includes("mashable")) return "Mashable";
  if (host.includes("cnet")) return "CNET";
  if (host.includes("digitaltrends")) return "Digital Trends";
  if (host.includes("thenextweb")) return "The Next Web";
  if (host.includes("aibusiness")) return "AI Business";
  if (host.includes("syncedreview")) return "Synced";
  if (host.includes("spectrum.ieee")) return "IEEE Spectrum";
  if (host.includes("brookings")) return "Brookings";
  return host;
}
// Filter out advertisements and non-AI content
function isRelevantAIContent(title: string, desc: string): boolean {
  const text = (title + " " + desc).toLowerCase();

  // Exclude advertisements and promotional content
  const adKeywords = [
    "sponsored",
    "advertisement",
    "deals",
    "discount",
    "coupon",
    "sale",
    "buy now",
    "shop",
    "subscribe",
    "newsletter",
    "webinar",
    "register now",
    "limited time",
    "affiliate",
  ];

  if (adKeywords.some((kw) => text.includes(kw))) {
    return false;
  }

  // Must contain AI-related keywords
  const aiKeywords = [
    "ai",
    "artificial intelligence",
    "machine learning",
    "ml",
    "deep learning",
    "neural",
    "llm",
    "gpt",
    "claude",
    "gemini",
    "chatbot",
    "model",
    "algorithm",
    "automation",
    "robotics",
    "computer vision",
    "nlp",
    "natural language",
  ];

  return aiKeywords.some((kw) => text.includes(kw));
}

async function fetchFeed(url: string) {
  try {
    console.log(`📡 Fetching: ${url}`);
    const feed = await parser.parseURL(url);
    const items = (feed.items || [])
      .map((i) => ItemZ.safeParse(i))
      .filter((r) => r.success)
      .map((r) => r.data as RawItem)
      .filter((item) =>
        isRelevantAIContent(
          item.title,
          item.contentSnippet || item.content || ""
        )
      );
    console.log(`✅ Fetched ${items.length} AI-relevant items from ${url}`);
    return items;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.warn(`⚠️  Failed to fetch ${url}:`, error.message);
    } else {
      console.warn(`⚠️  Failed to fetch ${url}:`, String(error));
    }
    return [];
  }
}
function summarizeNaively(title: string, desc: string, sourceNames: string[]) {
  // LLM plug-in point; safe fallback:
  const d = (desc || "").replace(/\s+/g, " ").trim().slice(0, 500);
  const why = d ? d : "New development in AI with practical implications.";
  const summary = `${title}. ${why}`;
  const bullets = [
    `Why it matters: ${sourceNames[0]} + ${sourceNames[1]} both report it.`,
    `What's new: ${title.split(":")[1]?.trim() || "fresh update today"}.`,
  ];
  return { summary, bullets };
}
function scoreItem(publishers: string[], title: string) {
  const rep = publishers.reduce((s, p) => s + (PUBLISHER_REP.get(p) ?? 1), 0);
  const novelty = 2; // quick default; you can refine by hours old
  const practicality = /launch|available|api|tool|partnership/i.test(title)
    ? 2
    : 1;
  return rep + novelty + practicality; // ~3–9
}

export async function buildDaily({ limit = 10 }: { limit?: number } = {}) {
  const all = (
    await pMap(FEEDS, async (f) => fetchFeed(f.url), { concurrency: 4 })
  ).flat();
  console.log(`📰 Total items fetched: ${all.length}`);

  const mapped = all.map((it) => {
    const url = it.link;
    const host = publisherFromUrl(url);
    const pub = publisherLabel(host);
    return {
      title: it.title,
      url,
      publisher: pub,
      publishedAt: it.isoDate || formatISO(new Date()),
      desc: it.contentSnippet || it.content || "",
    };
  });

  console.log(
    `📝 Mapped items by publisher:`,
    Object.entries(
      mapped.reduce(
        (acc, item) => {
          acc[item.publisher] = (acc[item.publisher] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      )
    )
  );
  // Group near-dupes across publishers
  const clusters = clusterByTitle(mapped);
  console.log(
    `🔍 Created ${clusters.length} clusters from ${mapped.length} items`
  );

  // Keep only clusters with ≥2 distinct publishers (cross-check rule)
  const eligible = clusters
    .map((cl) => {
      const pubs = new Set(cl.map((x) => x.publisher));
      console.log(
        `📊 Cluster with ${cl.length} items from ${pubs.size} publishers: ${Array.from(pubs).join(", ")}`
      );
      if (pubs.size < 2) return null;
      // choose canonical title = longest title
      const leader = cl
        .slice()
        .sort((a, b) => (b.title?.length || 0) - (a.title?.length || 0))[0];
      const sources = cl.slice(0, 5).map((s) => ({
        title: s.title,
        url: s.url,
        publisher: s.publisher,
        publishedAt: s.publishedAt,
      }));
      const { summary, bullets } = summarizeNaively(
        leader.title,
        leader.desc || "",
        Array.from(pubs) as string[]
      );
      return { leader, sources, summary, bullets };
    })
    .filter(Boolean) as EligibleEntry[];

  // Hard cap company/topic repetition later if you like

  // Convert to AIDailyItem records
  const dateISO = toETDateISO();
  const items = eligible
    .slice(0, Math.max(5, Math.min(limit, 10)))
    .map(({ leader, sources }: EligibleEntry) => {
      const mood = pickMood(leader.title, leader.desc || "");
      const genre = "enterprise"; // simple default for now
      const score = scoreItem(
        [...new Set(sources.map((s) => s.publisher))] as string[],
        leader.title
      );
      return {
        dateISO,
        genre,
        mood,
        title: leader.title,
        summary: leader.desc ? leader.desc.slice(0, 280) : "Update on AI.",
        bullets: JSON.stringify([
          "Impact: cross-verified by multiple outlets.",
          "Keep an eye on follow-ups.",
        ]),
        sources: JSON.stringify(sources),
        score,
      };
    });

  // Persist: replace today
  await prisma.aIDailyItem.deleteMany({ where: { dateISO } });
  await prisma.aIDailyItem.createMany({ data: items });
  return items.length;
}

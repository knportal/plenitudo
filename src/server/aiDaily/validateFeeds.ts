import Parser from "rss-parser";
import { FEEDS } from "./feeds";
import { PrismaClient } from "@prisma/client";
import pMap from "p-map";

const prisma = new PrismaClient();
const parser = new Parser({ timeout: 10000 }); // 10 second timeout

export type FeedHealthStatus = "healthy" | "degraded" | "broken" | "unknown";

export interface FeedHealthResult {
  feedUrl: string;
  feedLabel: string;
  status: FeedHealthStatus;
  responseTime: number;
  itemCount: number;
  errorMessage?: string | null;
}

/**
 * Validates a single RSS feed
 */
async function validateFeed(feed: {
  label: string;
  url: string;
}): Promise<FeedHealthResult> {
  const startTime = Date.now();
  let status: FeedHealthStatus = "unknown";
  let itemCount = 0;
  let errorMessage: string | undefined;

  try {
    const feedData = await parser.parseURL(feed.url);
    const responseTime = Date.now() - startTime;
    itemCount = feedData.items?.length || 0;

    // Determine status based on results
    if (itemCount === 0) {
      status = "degraded"; // Feed works but has no items
      errorMessage = "Feed returned 0 items";
    } else if (responseTime > 5000) {
      status = "degraded"; // Slow but working
      errorMessage = `Slow response time: ${responseTime}ms`;
    } else {
      status = "healthy";
    }

    const result: FeedHealthResult = {
      feedUrl: feed.url,
      feedLabel: feed.label,
      status,
      responseTime,
      itemCount,
    };
    if (errorMessage) {
      result.errorMessage = errorMessage;
    }
    return result;
  } catch (error: unknown) {
    const responseTime = Date.now() - startTime;
    status = "broken";
    errorMessage = error instanceof Error ? error.message : String(error);

    return {
      feedUrl: feed.url,
      feedLabel: feed.label,
      status,
      responseTime,
      itemCount: 0,
      errorMessage,
    };
  }
}

/**
 * Validates all RSS feeds and updates health status in database
 */
export async function validateAllFeeds(): Promise<{
  total: number;
  healthy: number;
  degraded: number;
  broken: number;
  results: FeedHealthResult[];
}> {
  console.log(`🔍 Validating ${FEEDS.length} RSS feeds...`);

  // Validate all feeds in parallel (with concurrency limit)
  const results = await pMap(
    FEEDS,
    async (feed) => {
      try {
        return await validateFeed(feed);
      } catch (error) {
        console.error(`❌ Error validating ${feed.label}:`, error);
        return {
          feedUrl: feed.url,
          feedLabel: feed.label,
          status: "broken" as FeedHealthStatus,
          responseTime: 0,
          itemCount: 0,
          errorMessage: error instanceof Error ? error.message : String(error),
        };
      }
    },
    { concurrency: 5 } // Limit concurrent requests
  );

  // Update database with health status
  for (const result of results) {
    const existing = await prisma.feedHealth.findUnique({
      where: { feedUrl: result.feedUrl },
    });

    const consecutiveFailures =
      result.status === "broken" || result.status === "degraded"
        ? (existing?.consecutiveFailures || 0) + 1
        : 0;

    await prisma.feedHealth.upsert({
      where: { feedUrl: result.feedUrl },
      create: {
        feedUrl: result.feedUrl,
        feedLabel: result.feedLabel,
        status: result.status,
        lastChecked: new Date(),
        lastSuccess:
          result.status === "healthy"
            ? new Date()
            : existing?.lastSuccess || null,
        consecutiveFailures,
        errorMessage: result.errorMessage || null,
        responseTime: result.responseTime,
        itemCount: result.itemCount,
      },
      update: {
        feedLabel: result.feedLabel,
        status: result.status,
        lastChecked: new Date(),
        lastSuccess:
          result.status === "healthy"
            ? new Date()
            : existing?.lastSuccess || null,
        consecutiveFailures,
        errorMessage: result.errorMessage || null,
        responseTime: result.responseTime,
        itemCount: result.itemCount,
      },
    });
  }

  // Count statuses
  const healthy = results.filter((r) => r.status === "healthy").length;
  const degraded = results.filter((r) => r.status === "degraded").length;
  const broken = results.filter((r) => r.status === "broken").length;

  console.log(`✅ Validation complete:`);
  console.log(`   Healthy: ${healthy}`);
  console.log(`   Degraded: ${degraded}`);
  console.log(`   Broken: ${broken}`);

  return {
    total: results.length,
    healthy,
    degraded,
    broken,
    results,
  };
}

/**
 * Get broken feeds that need attention
 */
export async function getBrokenFeeds(): Promise<
  Array<{
    feedUrl: string;
    feedLabel: string;
    consecutiveFailures: number;
    lastSuccess: Date | null;
    errorMessage: string | null;
  }>
> {
  const broken = await prisma.feedHealth.findMany({
    where: {
      OR: [
        { status: "broken" },
        { consecutiveFailures: { gte: 3 } }, // 3+ consecutive failures
      ],
    },
    orderBy: { consecutiveFailures: "desc" },
  });

  return broken.map((f) => ({
    feedUrl: f.feedUrl,
    feedLabel: f.feedLabel,
    consecutiveFailures: f.consecutiveFailures,
    lastSuccess: f.lastSuccess,
    errorMessage: f.errorMessage,
  }));
}

/**
 * Suggest potential replacement feeds for broken ones
 * This is a simple helper - you can enhance it with web search or feed discovery APIs
 */
export async function suggestReplacements(
  brokenFeedUrl: string
): Promise<Array<{ label: string; url: string; reason: string }>> {
  const suggestions: Array<{ label: string; url: string; reason: string }> = [];

  try {
    const url = new URL(brokenFeedUrl);
    const domain = url.hostname.replace("www.", "");

    // Common RSS feed patterns to try
    const commonPaths = [
      "/feed",
      "/rss",
      "/rss.xml",
      "/atom.xml",
      "/feed.xml",
      "/feeds/all",
      "/blog/feed",
      "/news/feed",
    ];

    // Suggest trying common feed paths on the same domain
    for (const path of commonPaths) {
      suggestions.push({
        label: `${domain}${path}`,
        url: `https://${domain}${path}`,
        reason: `Common RSS feed path on ${domain}`,
      });
    }

    // Check if there's a similar feed in our existing list
    const existingFeed = FEEDS.find((f) => f.url === brokenFeedUrl);
    if (existingFeed) {
      const similarFeeds = FEEDS.filter(
        (f) =>
          f.url !== brokenFeedUrl &&
          (f.label
            .toLowerCase()
            .includes(existingFeed.label.toLowerCase().split(" ")[0]) ||
            existingFeed.label
              .toLowerCase()
              .includes(f.label.toLowerCase().split(" ")[0]))
      );

      similarFeeds.slice(0, 3).forEach((feed) => {
        suggestions.push({
          label: feed.label,
          url: feed.url,
          reason: `Similar feed already in our list`,
        });
      });
    }
  } catch {
    // Invalid URL, skip suggestions
  }

  return suggestions;
}

/**
 * Get feed health summary
 */
export async function getFeedHealthSummary() {
  const all = await prisma.feedHealth.findMany({
    orderBy: { lastChecked: "desc" },
  });

  const byStatus = all.reduce(
    (acc, feed) => {
      acc[feed.status] = (acc[feed.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const avgResponseTime =
    all.length > 0
      ? Math.round(
          all.reduce((sum, f) => sum + (f.responseTime || 0), 0) / all.length
        )
      : 0;

  const neverChecked = FEEDS.length - all.length;

  return {
    total: FEEDS.length,
    checked: all.length,
    neverChecked,
    byStatus,
    avgResponseTime,
    lastChecked: all[0]?.lastChecked || null,
  };
}

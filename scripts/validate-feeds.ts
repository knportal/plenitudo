#!/usr/bin/env tsx
/**
 * Script to validate all RSS feeds
 * Run: npm run validate:feeds
 */

import {
  validateAllFeeds,
  getBrokenFeeds,
  getFeedHealthSummary,
} from "../src/server/aiDaily/validateFeeds";

(async () => {
  try {
    console.log("🔍 Starting RSS feed validation...\n");

    await validateAllFeeds();
    const broken = await getBrokenFeeds();
    const summary = await getFeedHealthSummary();

    console.log(
      "\n═══════════════════════════════════════════════════════════════"
    );
    console.log("📊 FEED HEALTH SUMMARY");
    console.log(
      "═══════════════════════════════════════════════════════════════"
    );
    console.log(`Total Feeds: ${summary.total}`);
    console.log(`Checked: ${summary.checked}`);
    console.log(`Never Checked: ${summary.neverChecked}`);
    console.log(`Average Response Time: ${summary.avgResponseTime}ms`);
    console.log("\nStatus Breakdown:");
    Object.entries(summary.byStatus).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });

    if (broken.length > 0) {
      console.log(
        "\n═══════════════════════════════════════════════════════════════"
      );
      console.log("⚠️  BROKEN FEEDS (Need Attention)");
      console.log(
        "═══════════════════════════════════════════════════════════════"
      );
      broken.forEach((feed) => {
        console.log(`\n❌ ${feed.feedLabel}`);
        console.log(`   URL: ${feed.feedUrl}`);
        console.log(`   Consecutive Failures: ${feed.consecutiveFailures}`);
        console.log(
          `   Last Success: ${feed.lastSuccess ? feed.lastSuccess.toISOString() : "Never"}`
        );
        console.log(`   Error: ${feed.errorMessage || "Unknown"}`);
      });
    } else {
      console.log("\n✅ All feeds are healthy!");
    }

    console.log(
      "\n═══════════════════════════════════════════════════════════════"
    );
    console.log("💡 TIP: Run this script weekly to monitor feed health");
    console.log("   Consider setting up a cron job or scheduled task");
    console.log(
      "═══════════════════════════════════════════════════════════════\n"
    );

    process.exit(broken.length > 0 ? 1 : 0); // Exit with error if broken feeds found
  } catch (error) {
    console.error("❌ Error during feed validation:", error);
    process.exit(1);
  }
})();

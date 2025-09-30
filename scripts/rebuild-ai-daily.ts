import { buildDaily } from "@/server/aiDaily/buildDaily";

(async () => {
  try {
    console.log("🚀 Starting AI Daily rebuild...");
    console.log("📡 Fetching RSS feeds...");

    const count = await buildDaily({ limit: 10 });

    console.log("✅ Successfully built items:", count);
    console.log("🎉 AI Daily rebuild complete!");
  } catch (error) {
    console.error("❌ Error during AI Daily rebuild:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
})();

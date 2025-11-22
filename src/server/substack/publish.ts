/**
 * Substack API integration for publishing posts
 *
 * Note: Substack doesn't have an official public API.
 * This uses the unofficial Substack API or webhook approach.
 *
 * For production, you may need to:
 * 1. Use Substack's RSS import feature
 * 2. Use browser automation (Puppeteer/Playwright)
 * 3. Use Substack's email-to-post feature
 * 4. Use a third-party service
 */

interface SubstackPost {
  title: string;
  subtitle?: string;
  body: string;
  isPreview?: boolean;
  sendEmail?: boolean;
  tags?: string[];
}

interface SubstackConfig {
  publicationId: string;
  apiKey: string;
  baseUrl?: string;
}

/**
 * Format AI Daily items as Substack post
 */
export function formatAIDailyAsPost(
  items: Array<{
    title: string;
    summary: string;
    genre: string;
    mood: string;
    sources: Array<{ url: string; publisher: string }>;
  }>,
  date: string
): string {
  const dateFormatted = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let post = `# AI Daily — ${dateFormatted}\n\n`;
  post += `Today's top AI breakthroughs, curated from 40+ trusted sources.\n\n`;
  post += `---\n\n`;

  items.slice(0, 10).forEach((item, index) => {
    const moodEmoji = {
      uplift: "✨",
      opportunity: "💡",
      caution: "⚠️",
    }[item.mood] || "📰";

    post += `## ${moodEmoji} ${item.title}\n\n`;
    post += `${item.summary}\n\n`;

    if (item.sources && item.sources.length > 0) {
      post += `**Sources:** `;
      post += item.sources
        .slice(0, 3)
        .map((s) => `[${s.publisher}](${s.url})`)
        .join(", ");
      if (item.sources.length > 3) {
        post += ` (+${item.sources.length - 3} more)`;
      }
      post += `\n\n`;
    }

    post += `---\n\n`;
  });

  post += `**Want more?** [Subscribe for weekly deep dives →](${process.env.NEXT_PUBLIC_SUBSTACK_URL || "#"})\n\n`;
  post += `**Join the discussion:** [AI Rooms →](https://plenitudo.ai/rooms/ai)\n\n`;

  return post;
}

/**
 * Format weekly newsletter as Substack post
 */
export function formatWeeklyNewsletterAsPost(
  weeklyItems: Array<{
    title: string;
    summary: string;
    genre: string;
    mood: string;
    sources: Array<{ url: string; publisher: string }>;
    analysis?: string;
  }>,
  weekOf: string
): string {
  const weekFormatted = new Date(weekOf).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let post = `# Weekly AI Digest — Week of ${weekFormatted}\n\n`;
  post += `This week's most important AI developments, curated and analyzed.\n\n`;
  post += `---\n\n`;

  post += `## 📊 The Big Picture\n\n`;
  post += `This week brought significant developments across AI research, policy, and industry. `;
  post += `Here are the stories that matter most.\n\n`;
  post += `---\n\n`;

  post += `## 🎯 Top 5 Stories\n\n`;

  weeklyItems.slice(0, 5).forEach((item, index) => {
    const moodEmoji = {
      uplift: "✨",
      opportunity: "💡",
      caution: "⚠️",
    }[item.mood] || "📰";

    post += `### ${index + 1}. ${moodEmoji} ${item.title}\n\n`;

    post += `**What happened:** ${item.summary}\n\n`;

    if (item.analysis) {
      post += `**Why it matters:** ${item.analysis}\n\n`;
    }

    if (item.sources && item.sources.length > 0) {
      post += `**Sources:** `;
      post += item.sources
        .slice(0, 3)
        .map((s) => `[${s.publisher}](${s.url})`)
        .join(", ");
      post += `\n\n`;
    }

    post += `---\n\n`;
  });

  post += `## 💡 Insights & Analysis\n\n`;
  post += `This week's developments show [your analysis here]. `;
  post += `The pace of AI innovation continues to accelerate, with particular focus on [trends].\n\n`;

  post += `## 🔮 Looking Ahead\n\n`;
  post += `Next week, watch for [upcoming events/trends]. `;
  post += `We'll be covering these developments in real-time in our AI Rooms.\n\n`;

  post += `---\n\n`;
  post += `**Join our community:** [AI Rooms →](https://plenitudo.ai/rooms/ai)\n\n`;
  post += `**Share this:** [Twitter](https://twitter.com/intent/tweet?text=...) | [LinkedIn](https://www.linkedin.com/shareArticle?url=...)\n\n`;

  return post;
}

/**
 * Publish post to Substack
 *
 * Note: This is a placeholder. Substack doesn't have an official API.
 * You'll need to implement one of these approaches:
 *
 * 1. Email-to-post: Send formatted email to Substack's email address
 * 2. Browser automation: Use Puppeteer/Playwright to automate posting
 * 3. RSS import: Use Substack's RSS import feature
 * 4. Third-party service: Use a service that integrates with Substack
 */
export async function publishToSubstack(
  post: SubstackPost,
  config: SubstackConfig
): Promise<{ success: boolean; postId?: string; error?: string }> {
  // TODO: Implement actual Substack publishing
  // Options:
  // 1. Email-to-post (easiest)
  // 2. Browser automation
  // 3. Unofficial API wrapper

  console.log("📝 Would publish to Substack:", {
    title: post.title,
    bodyLength: post.body.length,
  });

  // Placeholder implementation
  return {
    success: false,
    error: "Substack API not implemented. See comments in code.",
  };
}

/**
 * Send post via email (Substack email-to-post feature)
 * This is the easiest way to auto-publish to Substack
 */
export async function sendPostViaEmail(
  post: SubstackPost,
  emailAddress: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Import email service
    const { sendSubstackPost } = await import("../notifications/email");

    // Send formatted HTML to Substack
    await sendSubstackPost(post.title, post.body, emailAddress);

    console.log("✅ Sent post to Substack via email:", {
      to: emailAddress,
      title: post.title,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("❌ Failed to send post to Substack:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}


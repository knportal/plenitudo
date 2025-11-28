/**
 * Beautiful newsletter templates for Substack
 * These templates create visually appealing, well-formatted posts
 */

export interface NewsletterItem {
  title: string;
  summary: string;
  genre: string;
  mood: "uplift" | "opportunity" | "caution";
  sources: Array<{ url: string; publisher: string }>;
  analysis?: string;
}

/**
 * Daily AI Daily template with beautiful formatting
 */
export function dailyAITemplate(
  items: NewsletterItem[],
  date: Date
): string {
  const dateFormatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let html = `<h1 style="font-size: 2.5em; font-weight: 700; margin-bottom: 0.5em; color: #10b981;">AI Daily — ${dateFormatted}</h1>\n\n`;
  html += `<p style="font-size: 1.1em; color: #64748b; margin-bottom: 2em;">Today's top AI breakthroughs, curated from 40+ trusted sources.</p>\n\n`;
  html += `<hr style="border: none; border-top: 2px solid #1e293b; margin: 2em 0;">\n\n`;

  items.slice(0, 10).forEach((item) => {
    const moodConfig = {
      uplift: { emoji: "✨", color: "#10b981", label: "Uplift" },
      opportunity: { emoji: "💡", color: "#3b82f6", label: "Opportunity" },
      caution: { emoji: "⚠️", color: "#f59e0b", label: "Caution" },
    }[item.mood];

    html += `<div style="margin-bottom: 2.5em; padding: 1.5em; background: #0f172a; border-radius: 12px; border-left: 4px solid ${moodConfig.color};">\n\n`;
    html += `<h2 style="font-size: 1.5em; font-weight: 600; margin-bottom: 0.5em; color: #f1f5f9;">${moodConfig.emoji} ${item.title}</h2>\n\n`;
    html += `<p style="color: #94a3b8; line-height: 1.6; margin-bottom: 1em;">${item.summary}</p>\n\n`;

    if (item.sources && item.sources.length > 0) {
      html += `<div style="margin-top: 1em; padding-top: 1em; border-top: 1px solid #1e293b;">\n`;
      html += `<p style="font-size: 0.9em; color: #64748b; margin-bottom: 0.5em;"><strong>Sources:</strong></p>\n`;
      html += `<div style="display: flex; flex-wrap: wrap; gap: 0.5em;">\n`;
      item.sources.slice(0, 3).forEach((source) => {
        html += `<a href="${source.url}" style="display: inline-block; padding: 0.25em 0.75em; background: #1e293b; color: #10b981; text-decoration: none; border-radius: 6px; font-size: 0.85em; margin-right: 0.5em;">${source.publisher}</a>\n`;
      });
      if (item.sources.length > 3) {
        html += `<span style="color: #64748b; font-size: 0.85em;">+${item.sources.length - 3} more</span>\n`;
      }
      html += `</div>\n</div>\n\n`;
    }

    html += `</div>\n\n`;
  });

  html += `<hr style="border: none; border-top: 2px solid #1e293b; margin: 2em 0;">\n\n`;
  html += `<div style="text-align: center; padding: 2em; background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); border-radius: 12px; margin: 2em 0;">\n`;
  html += `<p style="color: white; font-size: 1.1em; margin-bottom: 1em;"><strong>Want more?</strong></p>\n`;
  html += `<p style="color: rgba(255,255,255,0.9); margin-bottom: 1.5em;">Subscribe for weekly deep dives, exclusive analysis, and community access.</p>\n`;
  html += `<a href="${process.env["NEXT_PUBLIC_SUBSTACK_URL"] || "#"}" style="display: inline-block; padding: 0.75em 2em; background: white; color: #10b981; text-decoration: none; border-radius: 8px; font-weight: 600;">Subscribe Now →</a>\n`;
  html += `</div>\n\n`;
  html += `<p style="text-align: center; color: #64748b; margin-top: 2em;"><a href="https://plenitudo.ai/rooms/ai" style="color: #10b981; text-decoration: none;">💬 Join the discussion in our AI Rooms →</a></p>\n`;

  return html;
}

/**
 * Weekly newsletter template with beautiful formatting
 */
export function weeklyNewsletterTemplate(
  items: NewsletterItem[],
  weekOf: Date
): string {
  const weekFormatted = weekOf.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let html = `<h1 style="font-size: 2.5em; font-weight: 700; margin-bottom: 0.5em; color: #10b981;">Weekly AI Digest — Week of ${weekFormatted}</h1>\n\n`;
  html += `<p style="font-size: 1.1em; color: #64748b; margin-bottom: 2em;">This week's most important AI developments, curated and analyzed.</p>\n\n`;
  html += `<hr style="border: none; border-top: 2px solid #1e293b; margin: 2em 0;">\n\n`;

  html += `<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 2em; border-radius: 12px; margin-bottom: 2em;">\n`;
  html += `<h2 style="font-size: 1.8em; font-weight: 600; margin-bottom: 1em; color: #f1f5f9;">📊 The Big Picture</h2>\n`;
  html += `<p style="color: #94a3b8; line-height: 1.8; font-size: 1.05em;">This week brought significant developments across AI research, policy, and industry. Here are the stories that matter most.</p>\n`;
  html += `</div>\n\n`;

  html += `<h2 style="font-size: 2em; font-weight: 600; margin: 2em 0 1em; color: #f1f5f9;">🎯 Top 5 Stories</h2>\n\n`;

  items.slice(0, 5).forEach((item, index) => {
    const moodConfig = {
      uplift: { emoji: "✨", color: "#10b981" },
      opportunity: { emoji: "💡", color: "#3b82f6" },
      caution: { emoji: "⚠️", color: "#f59e0b" },
    }[item.mood];

    html += `<div style="margin-bottom: 3em; padding: 2em; background: #0f172a; border-radius: 12px; border-left: 4px solid ${moodConfig.color};">\n\n`;
    html += `<div style="display: flex; align-items: center; gap: 0.5em; margin-bottom: 1em;">\n`;
    html += `<span style="font-size: 1.5em; font-weight: 700; color: ${moodConfig.color};">${index + 1}.</span>\n`;
    html += `<h3 style="font-size: 1.5em; font-weight: 600; margin: 0; color: #f1f5f9;">${moodConfig.emoji} ${item.title}</h3>\n`;
    html += `</div>\n\n`;

    html += `<div style="background: #1e293b; padding: 1em; border-radius: 8px; margin-bottom: 1em;">\n`;
    html += `<p style="color: #94a3b8; margin: 0; line-height: 1.6;"><strong style="color: #10b981;">What happened:</strong> ${item.summary}</p>\n`;
    html += `</div>\n\n`;

    if (item.analysis) {
      html += `<div style="background: #1e293b; padding: 1em; border-radius: 8px; margin-bottom: 1em;">\n`;
      html += `<p style="color: #94a3b8; margin: 0; line-height: 1.6;"><strong style="color: #3b82f6;">Why it matters:</strong> ${item.analysis}</p>\n`;
      html += `</div>\n\n`;
    }

    if (item.sources && item.sources.length > 0) {
      html += `<div style="margin-top: 1em; padding-top: 1em; border-top: 1px solid #1e293b;">\n`;
      html += `<p style="font-size: 0.9em; color: #64748b; margin-bottom: 0.5em;"><strong>Sources:</strong></p>\n`;
      html += `<div style="display: flex; flex-wrap: wrap; gap: 0.5em;">\n`;
      item.sources.slice(0, 3).forEach((source) => {
        html += `<a href="${source.url}" style="display: inline-block; padding: 0.25em 0.75em; background: #1e293b; color: #10b981; text-decoration: none; border-radius: 6px; font-size: 0.85em;">${source.publisher}</a>\n`;
      });
      html += `</div>\n</div>\n\n`;
    }

    html += `</div>\n\n`;
  });

  html += `<hr style="border: none; border-top: 2px solid #1e293b; margin: 2em 0;">\n\n`;

  html += `<div style="background: #0f172a; padding: 2em; border-radius: 12px; margin-bottom: 2em;">\n`;
  html += `<h2 style="font-size: 1.8em; font-weight: 600; margin-bottom: 1em; color: #f1f5f9;">💡 Insights & Analysis</h2>\n`;
  html += `<p style="color: #94a3b8; line-height: 1.8; font-size: 1.05em;">This week's developments show the continued acceleration of AI innovation across multiple domains. The pace of change remains rapid, with particular focus on [add your analysis here].</p>\n`;
  html += `</div>\n\n`;

  html += `<div style="background: #0f172a; padding: 2em; border-radius: 12px; margin-bottom: 2em;">\n`;
  html += `<h2 style="font-size: 1.8em; font-weight: 600; margin-bottom: 1em; color: #f1f5f9;">🔮 Looking Ahead</h2>\n`;
  html += `<p style="color: #94a3b8; line-height: 1.8; font-size: 1.05em;">Next week, watch for [upcoming events/trends]. We'll be covering these developments in real-time in our AI Rooms.</p>\n`;
  html += `</div>\n\n`;

  html += `<div style="text-align: center; padding: 2em; background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); border-radius: 12px; margin: 2em 0;">\n`;
  html += `<p style="color: white; font-size: 1.1em; margin-bottom: 1em;"><strong>Join our community</strong></p>\n`;
  html += `<a href="https://plenitudo.ai/rooms/ai" style="display: inline-block; padding: 0.75em 2em; background: white; color: #10b981; text-decoration: none; border-radius: 8px; font-weight: 600; margin-right: 1em;">AI Rooms →</a>\n`;
  html += `<a href="${process.env["NEXT_PUBLIC_SUBSTACK_URL"] || "#"}" style="display: inline-block; padding: 0.75em 2em; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; border: 2px solid white;">Share This →</a>\n`;
  html += `</div>\n`;

  return html;
}



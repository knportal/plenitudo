/**
 * Chat summarization utilities.
 * TODO: Replace naive implementation with LLM provider (OpenAI, Anthropic, etc.)
 *
 * Current implementation: Basic text summarization using heuristics.
 * Future: Integrate with LLM API for intelligent summarization.
 *
 * Example LLM integration pattern:
 * ```typescript
 * import { openai } from "@ai-sdk/openai";
 * import { generateText } from "ai";
 *
 * const { text } = await generateText({
 *   model: openai("gpt-4o-mini"),
 *   prompt: `Summarize the following chat messages in a concise, readable format...`
 * });
 * ```
 */

interface ChatMessageForSummary {
  authorName: string;
  content: string;
  createdAt: Date;
}

/**
 * Summarize a list of chat messages into a readable text summary.
 *
 * Current implementation: Naive summarizer that:
 * - Groups messages by author
 * - Lists key topics mentioned
 * - Preserves important context
 *
 * TODO: Replace with LLM-based summarization:
 * 1. Choose provider (OpenAI, Anthropic, Groq, etc.)
 * 2. Format messages into prompt
 * 3. Call LLM API with proper error handling
 * 4. Parse and validate response
 * 5. Handle rate limits and retries
 *
 * @param messages Array of chat messages to summarize
 * @returns Summary text as a string
 */
export function summarizeChat(messages: ChatMessageForSummary[]): string {
  if (messages.length === 0) {
    return "No messages to summarize.";
  }

  // Naive implementation: group by author and list topics
  const authorGroups = new Map<string, string[]>();
  const topics = new Set<string>();

  for (const msg of messages) {
    const author = msg.authorName || "Anonymous";
    if (!authorGroups.has(author)) {
      authorGroups.set(author, []);
    }
    authorGroups.get(author)!.push(msg.content);

    // Extract potential topics (capitalized words, technical terms)
    const words = msg.content.split(/\s+/);
    for (const word of words) {
      const cleaned = word.replace(/[^\w]/g, ""); // Remove punctuation
      if (cleaned.length > 4 && /^[A-Z]/.test(cleaned)) {
        topics.add(cleaned.toLowerCase());
      }
    }
  }

  // Build summary
  const lines: string[] = [];
  lines.push(`Summary of ${messages.length} message${messages.length !== 1 ? "s" : ""}:\n`);

  // List active participants
  if (authorGroups.size > 0) {
    lines.push(`**Participants:** ${Array.from(authorGroups.keys()).join(", ")}\n`);
  }

  // List topics discussed (if any)
  if (topics.size > 0) {
    const topicList = Array.from(topics).slice(0, 10).join(", ");
    lines.push(`**Topics:** ${topicList}\n`);
  }

  // Sample recent messages (first 3-5)
  const recentMessages = messages.slice(-5);
  lines.push(`\n**Recent messages:**`);
  for (const msg of recentMessages) {
    const author = msg.authorName || "Anonymous";
    const preview = msg.content.length > 100
      ? msg.content.substring(0, 100) + "..."
      : msg.content;
    lines.push(`- ${author}: ${preview}`);
  }

  return lines.join("\n");
}

/**
 * Chunk messages if they exceed a token/character limit.
 * Useful for LLM APIs that have context windows.
 *
 * TODO: When integrating with LLM, use proper token counting.
 * Current: Character-based chunking as approximation.
 */
export function chunkMessages(
  messages: ChatMessageForSummary[],
  maxChars: number = 4000
): ChatMessageForSummary[][] {
  const chunks: ChatMessageForSummary[][] = [];
  let currentChunk: ChatMessageForSummary[] = [];
  let currentLength = 0;

  for (const msg of messages) {
    const msgLength = msg.content.length + (msg.authorName?.length || 0) + 10; // Approx overhead

    if (currentLength + msgLength > maxChars && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentLength = 0;
    }

    currentChunk.push(msg);
    currentLength += msgLength;
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks.length > 0 ? chunks : [[]];
}


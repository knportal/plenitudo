import { describe, it, expect } from "vitest";
import { isRelevantAIContent } from "./buildDaily";

describe("isRelevantAIContent", () => {
  it("filters obvious advertisements", () => {
    const title = "Limited time sale: Get 50% off";
    const desc = "Subscribe now and buy now for discounts";
    expect(isRelevantAIContent(title, desc)).toBe(false);
  });

  it("accepts AI-related content", () => {
    const title = "OpenAI releases new model";
    const desc = "A new GPT-based model improves performance";
    expect(isRelevantAIContent(title, desc)).toBe(true);
  });

  it("rejects when no AI keywords present", () => {
    const title = "Gardening tips for beginners";
    const desc = "How to grow tomatoes and herbs";
    expect(isRelevantAIContent(title, desc)).toBe(false);
  });
});

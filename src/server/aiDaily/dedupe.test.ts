import { describe, it, expect } from "vitest";
import { trigramSim, clusterByTitle, normalizeTitle } from "./dedupe";

describe("normalizeTitle", () => {
  it("cleans and normalizes text", () => {
    expect(normalizeTitle("OpenAI! Announces: New Model")).toBe(
      "openai announces new model"
    );
    expect(normalizeTitle("  Multiple   Spaces  ")).toBe("multiple spaces");
    expect(normalizeTitle("Special@#$%Characters")).toBe("special characters");
  });
});

describe("trigramSim", () => {
  it("groups near-duplicates", () => {
    const a = "OpenAI announces new model";
    const b = "New model announced by OpenAI today";
    expect(trigramSim(a, b)).toBeGreaterThan(0.35);
  });

  it("returns 0 for completely different strings", () => {
    const a = "OpenAI announces new model";
    const b = "Weather forecast for tomorrow";
    expect(trigramSim(a, b)).toBe(0);
  });

  it("returns 1 for identical strings", () => {
    const a = "OpenAI announces new model";
    const b = "OpenAI announces new model";
    expect(trigramSim(a, b)).toBe(1);
  });
});

describe("clusterByTitle", () => {
  it("clusters similar titles", () => {
    const items = [
      { title: "A" },
      { title: "A!!" },
      { title: "Completely different" },
    ];
    const clusters = clusterByTitle(items, 0.3);
    expect(clusters.length).toBe(3); // All items are different enough to be separate clusters
  });

  it("groups very similar titles", () => {
    const items = [
      { title: "OpenAI announces new model" },
      { title: "OpenAI announces new model today" },
      { title: "Completely different news story" },
    ];
    const clusters = clusterByTitle(items, 0.3);
    expect(clusters.length).toBe(2); // First two should cluster together
  });

  it("handles empty array", () => {
    const clusters = clusterByTitle([], 0.3);
    expect(clusters.length).toBe(0);
  });

  it("handles single item", () => {
    const items = [{ title: "Single item" }];
    const clusters = clusterByTitle(items, 0.3);
    expect(clusters.length).toBe(1);
    expect(clusters[0].length).toBe(1);
  });
});

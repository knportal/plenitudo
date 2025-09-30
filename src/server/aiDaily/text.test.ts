import { describe, it, expect } from "vitest";
import { pickMood, toETDateISO } from "./text";

describe("pickMood", () => {
  it("detects caution mood", () => {
    expect(
      pickMood("AI risk assessment", "New study reveals potential risks")
    ).toBe("caution");
    expect(
      pickMood("Government ban", "New regulations ban certain AI uses")
    ).toBe("caution");
    expect(pickMood("Data breach", "Security incident reported")).toBe(
      "caution"
    );
  });

  it("detects opportunity mood", () => {
    expect(pickMood("Product launch", "New AI tool launches today")).toBe(
      "opportunity"
    );
    expect(
      pickMood("Partnership announced", "Major collaboration revealed")
    ).toBe("opportunity");
    expect(pickMood("Open source", "Open source AI model released")).toBe(
      "opportunity"
    );
  });

  it("defaults to uplift", () => {
    expect(pickMood("AI research", "New breakthrough in AI technology")).toBe(
      "uplift"
    );
    expect(pickMood("Company news", "Regular business update")).toBe("uplift");
  });
});

describe("toETDateISO", () => {
  it("returns date in YYYY-MM-DD format", () => {
    const result = toETDateISO();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("handles custom date", () => {
    const customDate = new Date("2024-01-15T10:30:00Z");
    const result = toETDateISO(customDate);
    expect(result).toBe("2024-01-15");
  });
});

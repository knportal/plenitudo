/**
 * Unit tests for rate limiting sliding window logic.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRateLimiter } from "./rate-limit";

describe("MemoryRateLimiter - Sliding Window Logic", () => {
  let limiter: MemoryRateLimiter;

  beforeEach(() => {
    limiter = new MemoryRateLimiter();
  });

  it("should allow requests within limit", async () => {
    const result1 = await limiter.checkAndConsume("user1", 2, 60);
    expect(result1.allowed).toBe(true);
    expect(result1.retryAfter).toBeUndefined();

    const result2 = await limiter.checkAndConsume("user1", 2, 60);
    expect(result2.allowed).toBe(true);
  });

  it("should block when limit exceeded", async () => {
    // Consume limit
    await limiter.checkAndConsume("user2", 2, 60);
    await limiter.checkAndConsume("user2", 2, 60);

    // Should be blocked
    const result = await limiter.checkAndConsume("user2", 2, 60);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeDefined();
    expect(result.retryAfter).toBeGreaterThan(0);
    expect(result.retryAfter).toBeLessThanOrEqual(60);
  });

  it("should calculate retryAfter correctly", async () => {
    const limit = 2;
    const windowSec = 10;

    // Consume limit
    await limiter.checkAndConsume("user3", limit, windowSec);
    await limiter.checkAndConsume("user3", limit, windowSec);

    // Should be blocked
    const blocked = await limiter.checkAndConsume("user3", limit, windowSec);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeDefined();

    // RetryAfter should be close to windowSec (within 100ms tolerance)
    const retryAfter = blocked.retryAfter!;
    expect(retryAfter).toBeGreaterThan(windowSec - 1);
    expect(retryAfter).toBeLessThanOrEqual(windowSec);
  });

  it("should reset after window expires (sliding window)", async () => {
    const limit = 2;
    const windowSec = 1; // 1 second window

    // Consume limit
    await limiter.checkAndConsume("user4", limit, windowSec);
    await limiter.checkAndConsume("user4", limit, windowSec);

    // Should be blocked immediately
    const blocked = await limiter.checkAndConsume("user4", limit, windowSec);
    expect(blocked.allowed).toBe(false);

    // Wait for window to expire
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Should be allowed again (old requests expired)
    const allowed = await limiter.checkAndConsume("user4", limit, windowSec);
    expect(allowed.allowed).toBe(true);
  });

  it("should handle multiple keys independently", async () => {
    // User A hits limit
    await limiter.checkAndConsume("userA", 2, 60);
    await limiter.checkAndConsume("userA", 2, 60);
    const blockedA = await limiter.checkAndConsume("userA", 2, 60);
    expect(blockedA.allowed).toBe(false);

    // User B should still be allowed
    const allowedB = await limiter.checkAndConsume("userB", 2, 60);
    expect(allowedB.allowed).toBe(true);
  });

  it("should handle sliding window correctly (partial expiry)", async () => {
    const limit = 3;
    const windowSec = 1.5; // 1.5 second window for more reliable timing

    // Make 3 requests (hit limit)
    await limiter.checkAndConsume("user5", limit, windowSec);
    await new Promise((resolve) => setTimeout(resolve, 300));
    await limiter.checkAndConsume("user5", limit, windowSec);
    await new Promise((resolve) => setTimeout(resolve, 300));
    await limiter.checkAndConsume("user5", limit, windowSec);

    // Should be blocked now (3 used)
    const blocked = await limiter.checkAndConsume("user5", limit, windowSec);
    expect(blocked.allowed).toBe(false);

    // Wait for first request to expire (windowSec + buffer)
    // First at 0ms, second at ~300ms, third at ~600ms
    // After 1.8s, first should expire, leaving 2 in window
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Should be allowed again (first expired, 2nd and 3rd still in window, limit is 3)
    const allowedAgain = await limiter.checkAndConsume("user5", limit, windowSec);
    expect(allowedAgain.allowed).toBe(true);
  });
});


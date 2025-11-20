/**
 * Rate limiting service with Redis (Upstash) and in-memory fallback.
 * Implements sliding window rate limiting.
 */

type RedisClient = {
  zremrangebyscore: (key: string, min: number, max: number) => Promise<number>;
  zcard: (key: string) => Promise<number>;
  zrange: <T>(
    key: string,
    start: number,
    stop: number,
    opts?: { byScore: boolean }
  ) => Promise<T[]>;
  zadd: (
    key: string,
    item: { score: number; member: number }
  ) => Promise<number>;
  expire: (key: string, seconds: number) => Promise<number>;
};

interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number; // seconds until next request is allowed
}

interface RateLimiter {
  checkAndConsume(
    key: string,
    limit: number,
    windowSec: number
  ): Promise<RateLimitResult>;
}

/**
 * In-memory rate limiter using Map (fallback when Redis unavailable).
 * Stores timestamps of requests per key.
 */
class MemoryRateLimiter implements RateLimiter {
  private store = new Map<string, number[]>();

  async checkAndConsume(
    key: string,
    limit: number,
    windowSec: number
  ): Promise<RateLimitResult> {
    const now = Date.now();
    const windowMs = windowSec * 1000;
    const timestamps = this.store.get(key) || [];

    // Remove timestamps outside the window
    const recent = timestamps.filter((time) => now - time < windowMs);

    if (recent.length >= limit) {
      // Calculate retryAfter: time until oldest request expires
      const oldest = recent[0];
      const retryAfter = Math.ceil((oldest + windowMs - now) / 1000);
      return { allowed: false, retryAfter };
    }

    // Add current request
    recent.push(now);
    this.store.set(key, recent);

    return { allowed: true };
  }
}

/**
 * Redis rate limiter using Upstash (production-ready).
 * Implements sliding window using sorted sets.
 */
class RedisRateLimiter implements RateLimiter {
  private redis: RedisClient;

  constructor() {
    const url = process.env["UPSTASH_REDIS_REST_URL"];
    const token = process.env["UPSTASH_REDIS_REST_TOKEN"];

    if (!url || !token) {
      throw new Error("Upstash Redis credentials not configured");
    }

    try {
      // Dynamic import to avoid bundling issues when Redis not configured
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Redis } = require("@upstash/redis");
      this.redis = new Redis({
        url,
        token,
      }) as RedisClient;
    } catch (error) {
      throw new Error(
        `Failed to initialize Redis: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async checkAndConsume(
    key: string,
    limit: number,
    windowSec: number
  ): Promise<RateLimitResult> {
    const now = Date.now();
    const windowMs = windowSec * 1000;
    const cutoff = now - windowMs;

    // Redis key for the rate limit window
    const redisKey = `rate_limit:${key}`;

    try {
      // Remove old entries (outside the window)
      await this.redis.zremrangebyscore(redisKey, 0, cutoff);

      // Count current entries in window
      const count = await this.redis.zcard(redisKey);

      if (count >= limit) {
        // Get oldest timestamp to calculate retryAfter
        const oldest = await this.redis.zrange<number[]>(redisKey, 0, 0, {
          byScore: true,
        });
        if (
          oldest &&
          Array.isArray(oldest) &&
          oldest.length > 0 &&
          typeof oldest[0] === "number"
        ) {
          const oldestTime = oldest[0];
          const retryAfter = Math.ceil((oldestTime + windowMs - now) / 1000);
          return { allowed: false, retryAfter };
        }
        return { allowed: false, retryAfter: windowSec };
      }

      // Add current request
      await this.redis.zadd(redisKey, { score: now, member: now });
      // Set expiry slightly longer than window to allow cleanup
      await this.redis.expire(redisKey, windowSec + 1);

      return { allowed: true };
    } catch (error) {
      console.error("Redis rate limit error:", error);
      throw error;
    }
  }
}

// Singleton rate limiter instance
let rateLimiterInstance: RateLimiter | null = null;

function getRateLimiter(): RateLimiter {
  if (rateLimiterInstance) {
    return rateLimiterInstance;
  }

  const url = process.env["UPSTASH_REDIS_REST_URL"];
  const token = process.env["UPSTASH_REDIS_REST_TOKEN"];

  if (url && token) {
    try {
      rateLimiterInstance = new RedisRateLimiter();
      console.log("✅ Using Redis rate limiter (Upstash)");
      return rateLimiterInstance;
    } catch (error) {
      console.warn(
        "⚠️  Failed to initialize Redis rate limiter, falling back to in-memory:",
        error
      );
    }
  } else {
    console.warn(
      "⚠️  Redis not configured (UPSTASH_REDIS_REST_URL/TOKEN missing), using in-memory rate limiter"
    );
  }

  rateLimiterInstance = new MemoryRateLimiter();
  return rateLimiterInstance;
}

/**
 * Public API: Check and consume rate limit.
 * Returns whether request is allowed and retryAfter time if blocked.
 */
export async function checkAndConsume(
  key: string,
  limit: number,
  windowSec: number
): Promise<RateLimitResult> {
  const limiter = getRateLimiter();
  return limiter.checkAndConsume(key, limit, windowSec);
}

// Export for testing
export { MemoryRateLimiter, RedisRateLimiter };

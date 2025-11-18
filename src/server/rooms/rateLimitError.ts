/**
 * Rate limit error class for chat message throttling.
 */
export class RateLimitError extends Error {
  constructor(public retryAfter: number, message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}



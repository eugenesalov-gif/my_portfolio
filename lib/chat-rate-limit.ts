import {
  CHAT_RATE_LIMIT_MAX_REQUESTS,
  CHAT_RATE_LIMIT_WINDOW_MS,
} from "@/lib/chat-limits";

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function pruneExpiredEntries(now: number) {
  rateLimitStore.forEach((entry, key) => {
    if (now - entry.windowStart >= CHAT_RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  });
}

export function checkChatRateLimit(key: string):
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number } {
  const now = Date.now();
  pruneExpiredEntries(now);

  const entry = rateLimitStore.get(key);

  if (!entry || now - entry.windowStart >= CHAT_RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (entry.count >= CHAT_RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((entry.windowStart + CHAT_RATE_LIMIT_WINDOW_MS - now) / 1000),
    );
    return { allowed: false, retryAfterSeconds };
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);
  return { allowed: true };
}

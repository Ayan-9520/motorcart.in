import { AI_RATE_LIMIT_PER_MIN } from "../constants";

const buckets = new Map<string, number[]>();

export function checkRateLimit(key: string, limit = AI_RATE_LIMIT_PER_MIN): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) return false;
  hits.push(now);
  buckets.set(key, hits);
  return true;
}

export function rateLimitKey(agentId: string, userId?: string): string {
  return `${agentId}:${userId ?? "anon"}`;
}

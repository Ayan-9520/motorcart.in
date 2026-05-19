/** Lightweight client-side spam / promo heuristics (0–1). Not a replacement for server models. */
export function scoreSpamContent(text: string): number {
  const t = text.toLowerCase();
  let score = 0;
  if (t.length < 8) score += 0.15;
  if (t.length > 4000) score += 0.1;
  const repeats = /(.)\1{12,}/.test(t);
  if (repeats) score += 0.25;
  const links = (t.match(/https?:\/\//g) ?? []).length;
  if (links > 3) score += 0.2;
  if (/\b(click here|free money|crypto|whatsapp only|call now|loan guaranteed)\b/i.test(t)) score += 0.35;
  const caps = (text.match(/[A-Z]/g) ?? []).length;
  if (text.length > 40 && caps / text.length > 0.55) score += 0.15;
  return Math.min(1, Math.round(score * 100) / 100);
}

export function shouldQueueForReview(score: number): boolean {
  return score >= 0.45;
}

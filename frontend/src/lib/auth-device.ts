const STORAGE_KEY = "motorcart_device_key_v1";

function simpleHash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return `d_${(h >>> 0).toString(16)}`;
}

/** Stable per-browser key (not cryptographically strong — fingerprinting only). */
export function getOrCreateDeviceKey(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const raw = [
      navigator.userAgent,
      navigator.language,
      String(screen.width),
      String(screen.height),
      String(screen.colorDepth),
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    ].join("|");
    const key = simpleHash(raw);
    localStorage.setItem(STORAGE_KEY, key);
    return key;
  } catch {
    return simpleHash(`${navigator.userAgent}|fallback`);
  }
}

import { clearTokens } from "@/lib/api/axios";

/** Bump when auth storage shape changes (clears old Supabase sessions once). */
export const AUTH_STORAGE_VERSION = "2";
const VERSION_KEY = "motorcart_auth_storage_v";

const LEGACY_PREFIXES = ["sb-", "supabase"];
const LEGACY_KEYS = new Set([
  "supabase.auth.token",
  "supabase.auth.refreshToken",
  "motorcart_access_token",
  "motorcart_refresh_token",
]);

function collectLegacyKeys(storage: Storage): string[] {
  const keys: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (!key) continue;
    const lower = key.toLowerCase();
    if (
      LEGACY_KEYS.has(key) ||
      LEGACY_PREFIXES.some((p) => lower.startsWith(p) || lower.includes("supabase"))
    ) {
      keys.push(key);
    }
  }
  return keys;
}

/** Remove Supabase-era tokens and Motorcart JWT keys from browser storage. */
export function clearLegacyAuthStorage(): void {
  if (typeof window === "undefined") return;
  clearTokens();
  for (const storage of [localStorage, sessionStorage]) {
    for (const key of collectLegacyKeys(storage)) {
      storage.removeItem(key);
    }
  }
  localStorage.setItem(VERSION_KEY, AUTH_STORAGE_VERSION);
}

/** One-time migration: wipe stale sessions after backend switch. */
export function ensureAuthStorageVersion(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(VERSION_KEY) === AUTH_STORAGE_VERSION) return;
  clearLegacyAuthStorage();
}

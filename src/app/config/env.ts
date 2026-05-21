import { z } from "zod";

/**
 * Public (Vite) environment — safe to ship to the browser.
 * Validates shape at startup; logs in dev, never crashes the shell on missing local .env.
 */
const publicEnvSchema = z.object({
  MODE: z.string().default("development"),
  VITE_SUPABASE_URL: z.string().optional(),
  VITE_SUPABASE_ANON_KEY: z.string().optional(),
  VITE_SITE_URL: z.string().optional(),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

let cached: PublicEnv | null = null;

export function parsePublicEnv(): PublicEnv {
  if (cached) return cached;
  const raw = {
    MODE: import.meta.env.MODE,
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL as string | undefined,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
    VITE_SITE_URL: import.meta.env.VITE_SITE_URL as string | undefined,
  };
  const result = publicEnvSchema.safeParse(raw);
  if (!result.success) {
    console.warn("[motorcart:env] Invalid public environment", result.error.flatten().fieldErrors);
    cached = { MODE: String(raw.MODE ?? "development") };
    return cached;
  }
  cached = result.data;
  return cached;
}

export function hasSupabaseConfig(env: PublicEnv = parsePublicEnv()): boolean {
  const url = env.VITE_SUPABASE_URL ?? "";
  const key = env.VITE_SUPABASE_ANON_KEY ?? "";
  return Boolean(url && key && !url.includes("placeholder"));
}

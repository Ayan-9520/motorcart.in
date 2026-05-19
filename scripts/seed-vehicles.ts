/**
 * Seed Supabase `vehicles` from the generated Indian catalog.
 *
 * Requires in .env.local (or env):
 *   VITE_SUPABASE_URL (or SUPABASE_URL)
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Run: npm run seed:vehicles
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { MOCK_VEHICLES } from "../src/data/vehicle-catalog";
import { normalizeFuelType, normalizeTransmissionType } from "../src/services/vehicle.service";

function loadEnvFile(name: string) {
  const path = resolve(process.cwd(), name);
  if (!existsSync(path)) return;
  const raw = readFileSync(path, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  const limit = Number(process.env.SEED_LIMIT ?? MOCK_VEHICLES.length);
  const pool = MOCK_VEHICLES.slice(0, limit);
  console.log(`Seeding ${pool.length} vehicles to Supabase…`);

  let inserted = 0;
  let errors = 0;

  for (const batch of chunk(pool, 40)) {
    const rows = batch.map((v) => ({
      slug: v.slug,
      title: v.title,
      brand: v.brand,
      model: v.model,
      variant: v.variant ?? null,
      year: v.year,
      price: v.price,
      original_price: v.originalPrice ?? null,
      fuel_type: normalizeFuelType(v.fuelType),
      transmission: normalizeTransmissionType(v.transmission),
      body_type: v.bodyType,
      category: v.category,
      kms_driven: v.kmsDriven,
      owners: v.owners,
      color: v.color ?? null,
      location: v.location ?? `${v.city}, ${v.state}`,
      city: v.city,
      state: v.state,
      images: v.images,
      features: v.features,
      description: v.description ?? null,
      is_certified: v.isCertified,
      is_featured: v.isFeatured,
      condition: v.condition,
      status: v.status,
      ai_price_score: v.aiPriceScore ?? null,
      metadata: {
        ...v.metadata,
        dealerName: v.dealerName,
        dealerSlug: v.dealerSlug,
        dealerPhone: v.dealerPhone,
        dealerRating: v.dealerRating,
        dealerVerified: v.dealerVerified,
        catalogId: v.id,
      },
    }));

    const { error } = await supabase.from("vehicles").upsert(rows, { onConflict: "slug" });
    if (error) {
      console.error("Batch error:", error.message);
      errors += batch.length;
    } else {
      inserted += batch.length;
    }
  }

  console.log(`Done. Upserted ~${inserted} rows, ${errors} failed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

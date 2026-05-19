/**
 * Dev helper: confirm a user's email in Supabase (skip verification).
 * Usage: npm run auth:confirm -- mayan123@gmail.com
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile(name: string) {
  const path = resolve(process.cwd(), name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
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

const email = process.argv[2];
if (!email) {
  console.error("Usage: npm run auth:confirm -- user@email.com");
  process.exit(1);
}

const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Need VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

async function main() {
  const { data: list, error: listErr } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (listErr) {
    console.error(listErr.message);
    process.exit(1);
  }

  const user = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!user) {
    console.error(`No user found for ${email}`);
    process.exit(1);
  }

  const { error } = await admin.auth.admin.updateUserById(user.id, {
    email_confirm: true,
  });

  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  console.log(`Email confirmed for ${email} — you can sign in now.`);
}

main();

import { supabase } from "@/integrations/supabase/client";

/** Current Supabase session (persisted via client storage by default). */
export async function getSession() {
  return supabase.auth.getSession();
}

export async function refreshSession() {
  return supabase.auth.refreshSession();
}

/** Ends all refresh tokens server-side where supported — use on explicit logout. */
export async function signOutAllSessions() {
  return supabase.auth.signOut({ scope: "global" });
}

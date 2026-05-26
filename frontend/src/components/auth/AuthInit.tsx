import { useAuth } from "@/hooks/useAuth";

/** Initializes Supabase auth session on app load */
export function AuthInit() {
  useAuth();
  return null;
}

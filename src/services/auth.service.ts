import { supabase } from "@/integrations/supabase/client";
import type { AppRole } from "@/types/database";
import type { DbUser } from "@/types/database";

export type SignUpPayload = {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role?: AppRole;
};

export async function fetchUserProfile(userId: string): Promise<DbUser | null> {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
  if (error) {
    console.error("fetchUserProfile", error.message);
    return null;
  }
  return data as DbUser;
}

const authRedirectUrl = () =>
  typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined;

export function isEmailNotConfirmedError(message: string): boolean {
  const m = message.toLowerCase();
  return m.includes("email not confirmed") || m.includes("email_not_confirmed");
}

export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(payload: SignUpPayload) {
  return supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      emailRedirectTo: authRedirectUrl(),
      data: {
        full_name: payload.fullName,
        role: payload.role ?? "customer",
        phone: payload.phone,
      },
    },
  });
}

export async function resendConfirmationEmail(email: string) {
  return supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: authRedirectUrl(),
    },
  });
}

export async function signInWithPhoneOtp(phone: string) {
  return supabase.auth.signInWithOtp({
    phone,
    options: { channel: "sms" },
  });
}

export async function verifyPhoneOtp(phone: string, token: string) {
  return supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });
}

export async function signInWithGoogle() {
  const redirectTo = `${window.location.origin}/auth/callback`;
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<DbUser, "full_name" | "phone" | "city" | "state" | "avatar_url" | "company_name">>
) {
  return supabase.from("users").update(updates).eq("id", userId).select().single();
}

export async function submitKyc(
  userId: string,
  kycData: Record<string, unknown>
) {
  return supabase
    .from("users")
    .update({ kyc_status: "submitted", kyc_data: kycData })
    .eq("id", userId)
    .select()
    .single();
}

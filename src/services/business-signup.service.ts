import { supabase } from "@/integrations/supabase/client";
import type { BusinessSignupForm } from "@/auth/business-signup-types";
import { isDealerRole } from "@/permissions/role-matching";
import type { AppRole } from "@/types/database";

function slugifyCompany(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base || "dealer"}-${suffix}`;
}

/** Persist business onboarding on `users` (+ dealer stub when applicable). */
export async function persistBusinessSignupProfile(
  userId: string,
  form: BusinessSignupForm
): Promise<{ ok: boolean; error?: string }> {
  const phone = form.mobile.replace(/\D/g, "").slice(-10);
  const businessMeta = {
    gst: form.gst.trim(),
    business_category: form.businessCategory,
    business_type: form.businessType,
    owner_name: form.ownerName.trim(),
    documents: form.documentNames ?? [],
    submitted_at: new Date().toISOString(),
  };

  const { error: userError } = await supabase
    .from("users")
    .update({
      full_name: form.ownerName.trim(),
      company_name: form.companyName.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      phone: phone || null,
      status: "pending_verification",
      metadata: {
        business_signup: true,
        business: businessMeta,
        onboarding_status: "submitted",
        approval_status: "pending",
        profile_completion: 65,
      },
    })
    .eq("id", userId);

  if (userError) {
    return { ok: false, error: userError.message };
  }

  if (isDealerRole(form.role)) {
    const { data: existing } = await supabase
      .from("dealers")
      .select("id")
      .eq("owner_id", userId)
      .maybeSingle();

    if (!existing) {
      const slug = slugifyCompany(form.companyName);
      const { error: dealerError } = await supabase.from("dealers").insert({
        owner_id: userId,
        name: form.companyName.trim(),
        slug,
        dealer_type: form.role,
        city: form.city.trim(),
        state: form.state.trim(),
        phone: phone || null,
        email: form.email.trim().toLowerCase(),
        is_verified: false,
      });

      if (dealerError) {
        console.warn("[business-signup] dealer stub", dealerError.message);
      }
    }
  }

  return { ok: true };
}

export function businessRoleFromSignup(role: AppRole): AppRole {
  return role;
}

import { supabase } from "@/shared/api/client";
import type { AppRole, KycStatus, UserStatus } from "@/types/database";
import {
  MOCK_ANALYTICS,
  MOCK_BANNERS,
  MOCK_CMS,
  MOCK_DEALERS,
  MOCK_FRAUD,
  MOCK_KYC,
  MOCK_NOTIFICATIONS,
  MOCK_OVERVIEW,
  MOCK_PLANS,
  MOCK_REPORTS,
  MOCK_TICKETS,
  MOCK_USERS,
} from "../data/mock-platform-data";
import type {
  AdminDealerRow,
  AdminUserRow,
  CmsPageRow,
  FraudAlertRow,
  KycQueueRow,
  PlatformAnalytics,
  PlatformBanner,
  PlatformNotificationRow,
  PlatformOverview,
  PlatformReportRow,
  PlatformFraudStatus,
  PlatformTicketStatus,
  SubscriptionPlanRow,
  SupportTicketRow,
} from "../types";

function useMock<T>(data: T, error: unknown): T {
  if (error) console.warn("[platform-admin] fallback mock", error);
  return data;
}

export async function fetchPlatformOverview(): Promise<PlatformOverview> {
  try {
    const [users, dealers, vehicles, tickets, fraud] = await Promise.all([
      supabase.from("users").select("id, status, kyc_status", { count: "exact", head: false }).limit(5000),
      supabase
        .from("dealers")
        .select("id, verification_status", { count: "exact" })
        .in("verification_status", ["pending", "documents_submitted", "under_review"]),
      supabase.from("vehicles").select("id", { count: "exact", head: true }).eq("status", "available"),
      supabase.from("support_tickets").select("id", { count: "exact", head: true }).eq("status", "open"),
      supabase.from("platform_fraud_alerts").select("id", { count: "exact", head: true }).eq("status", "open"),
    ]);

    const rows = users.data ?? [];
    const pendingKyc = rows.filter((u) => u.kyc_status === "submitted" || u.kyc_status === "pending").length;
    const activeUsers = rows.filter((u) => (u.status ?? "active") === "active").length;

    return {
      totalUsers: users.count ?? rows.length,
      activeUsers,
      pendingKyc,
      pendingDealers: dealers.count ?? 0,
      openTickets: tickets.count ?? 0,
      fraudOpen: fraud.count ?? 0,
      mrrEstimate: MOCK_OVERVIEW.mrrEstimate,
      listingsLive: vehicles.count ?? 0,
    };
  } catch (e) {
    return useMock(MOCK_OVERVIEW, e);
  }
}

export async function fetchAdminUsers(): Promise<AdminUserRow[]> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, full_name, role, status, kyc_status, city, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error || !data?.length) return useMock(MOCK_USERS, error);

  return data.map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.full_name,
    role: u.role as AppRole,
    status: (u.status ?? "active") as UserStatus,
    kycStatus: u.kyc_status as KycStatus,
    city: u.city,
    createdAt: u.created_at,
  }));
}

export async function updateAdminUser(
  id: string,
  patch: Partial<{ status: UserStatus; role: AppRole; kyc_status: KycStatus }>
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("users").update(patch).eq("id", id);
  return { error: error?.message ?? null };
}

export async function fetchPendingDealers(): Promise<AdminDealerRow[]> {
  const { data, error } = await supabase
    .from("dealers")
    .select("id, name, city, owner_id, verification_status, subscription_tier, is_verified, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error || !data?.length) return useMock(MOCK_DEALERS, error);

  return data.map((d) => ({
    id: d.id,
    name: d.name,
    city: d.city,
    ownerId: d.owner_id,
    verificationStatus: String(d.verification_status ?? "pending"),
    subscriptionTier: d.subscription_tier ?? "free",
    isVerified: d.is_verified,
    createdAt: d.created_at,
  }));
}

export async function setDealerVerification(
  dealerId: string,
  status: "verified" | "rejected"
): Promise<{ error: string | null }> {
  const patch =
    status === "verified"
      ? { verification_status: "verified", is_verified: true }
      : { verification_status: "rejected", is_verified: false };
  const { error } = await supabase.from("dealers").update(patch).eq("id", dealerId);
  return { error: error?.message ?? null };
}

export async function fetchKycQueue(): Promise<KycQueueRow[]> {
  const { data, error } = await supabase
    .from("users")
    .select("id, full_name, email, kyc_status, role, updated_at")
    .in("kyc_status", ["submitted", "pending"])
    .order("updated_at", { ascending: false })
    .limit(100);

  if (error || !data?.length) return useMock(MOCK_KYC, error);

  return data.map((u) => ({
    userId: u.id,
    fullName: u.full_name,
    email: u.email,
    kycStatus: u.kyc_status as KycStatus,
    submittedAt: u.updated_at,
    role: u.role as AppRole,
  }));
}

export async function fetchPlatformAnalytics(): Promise<PlatformAnalytics> {
  return MOCK_ANALYTICS;
}

export async function fetchSubscriptionPlans(): Promise<SubscriptionPlanRow[]> {
  const { data: plans, error } = await supabase
    .from("subscription_plans")
    .select("code, name, price_monthly, max_listings")
    .order("sort_order");

  if (error || !plans?.length) return useMock(MOCK_PLANS, error);

  const { data: dealers } = await supabase.from("dealers").select("subscription_tier");
  const counts: Record<string, number> = {};
  for (const d of dealers ?? []) {
    const t = d.subscription_tier ?? "free";
    counts[t] = (counts[t] ?? 0) + 1;
  }

  return plans.map((p) => ({
    code: p.code,
    name: p.name,
    priceMonthly: Number(p.price_monthly),
    maxListings: p.max_listings,
    activeDealers: counts[p.code] ?? 0,
  }));
}

export async function fetchPlatformBanners(): Promise<PlatformBanner[]> {
  const { data, error } = await supabase
    .from("platform_banners")
    .select("*")
    .order("sort_order");

  if (error || !data?.length) return useMock(MOCK_BANNERS, error);

  return data.map((b) => ({
    id: b.id,
    title: b.title,
    placement: b.placement,
    imageUrl: b.image_url,
    linkUrl: b.link_url,
    isActive: b.is_active,
    sortOrder: b.sort_order,
  }));
}

export async function fetchCmsPages(): Promise<CmsPageRow[]> {
  const { data, error } = await supabase.from("platform_cms_pages").select("id, slug, title, status, updated_at").order("updated_at", { ascending: false });

  if (error || !data?.length) return useMock(MOCK_CMS, error);

  return data.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    status: p.status as CmsPageRow["status"],
    updatedAt: p.updated_at,
  }));
}

export async function fetchPlatformNotifications(): Promise<PlatformNotificationRow[]> {
  const { data, error } = await supabase.from("platform_notifications").select("*").order("created_at", { ascending: false }).limit(50);

  if (error || !data?.length) return useMock(MOCK_NOTIFICATIONS, error);

  return data.map((n) => ({
    id: n.id,
    title: n.title,
    channel: n.channel,
    audience: n.audience,
    status: n.status,
    scheduledAt: n.scheduled_at,
  }));
}

export async function fetchSupportTickets(): Promise<SupportTicketRow[]> {
  const { data, error } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false }).limit(100);

  if (error || !data?.length) return useMock(MOCK_TICKETS, error);

  return data.map((t) => ({
    id: t.id,
    subject: t.subject,
    status: t.status as SupportTicketRow["status"],
    priority: t.priority as SupportTicketRow["priority"],
    requesterEmail: t.requester_email,
    category: t.category,
    createdAt: t.created_at,
  }));
}

export async function updateSupportTicket(id: string, status: PlatformTicketStatus): Promise<{ error: string | null }> {
  const { error } = await supabase.from("support_tickets").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  return { error: error?.message ?? null };
}

export async function fetchFraudAlerts(): Promise<FraudAlertRow[]> {
  const { data, error } = await supabase.from("platform_fraud_alerts").select("*").order("created_at", { ascending: false }).limit(100);

  if (error || !data?.length) return useMock(MOCK_FRAUD, error);

  return data.map((f) => ({
    id: f.id,
    source: f.source,
    entityType: f.entity_type,
    entityId: f.entity_id,
    riskScore: Number(f.risk_score),
    reason: f.reason,
    status: f.status as FraudAlertRow["status"],
    createdAt: f.created_at,
  }));
}

export async function updateFraudAlert(id: string, status: PlatformFraudStatus): Promise<{ error: string | null }> {
  const { error } = await supabase.from("platform_fraud_alerts").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  return { error: error?.message ?? null };
}

export async function fetchPlatformReports(): Promise<PlatformReportRow[]> {
  const { data, error } = await supabase.from("platform_report_snapshots").select("*").order("created_at", { ascending: false }).limit(30);

  if (error || !data?.length) return useMock(MOCK_REPORTS, error);

  return data.map((r) => ({
    id: r.id,
    reportKey: r.report_key,
    title: r.title,
    periodLabel: r.period_label,
    createdAt: r.created_at,
  }));
}

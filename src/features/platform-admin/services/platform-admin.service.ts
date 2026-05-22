import { supabase } from "@/shared/api/client";
import type { AppRole, KycStatus, UserStatus } from "@/types/database";
import {
  MOCK_ANALYTICS,
  MOCK_AUCTIONS,
  MOCK_BANNERS,
  MOCK_CMS,
  MOCK_DEALERS,
  MOCK_FRAUD,
  MOCK_KYC,
  MOCK_NOTIFICATIONS,
  MOCK_OVERVIEW,
  MOCK_PLANS,
  MOCK_REPORTS,
  MOCK_REVENUE,
  MOCK_TICKETS,
  MOCK_TRANSACTIONS,
  MOCK_USERS,
  MOCK_VEHICLES,
} from "../data/mock-platform-data";
import type {
  AdminAuctionRow,
  AdminDealerRow,
  AdminUserRow,
  AdminVehicleRow,
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
  PlatformTransactionRow,
  RevenueAnalytics,
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
  return fetchRevenueAnalytics();
}

export async function fetchRevenueAnalytics(): Promise<RevenueAnalytics> {
  try {
    const { data: disbursed } = await supabase
      .from("finance_applications")
      .select("loan_amount")
      .eq("status", "disbursed")
      .limit(500);
    const loanTotal = (disbursed ?? []).reduce((s, r) => s + Number(r.loan_amount ?? 0), 0);
    if (loanTotal > 0) {
      return {
        ...MOCK_REVENUE,
        loanDisbursed: loanTotal,
        gmvTotal: loanTotal + MOCK_REVENUE.subscriptionRevenue + MOCK_REVENUE.auctionFees,
      };
    }
  } catch {
    /* mock */
  }
  return MOCK_REVENUE;
}

export async function fetchPlatformTransactions(): Promise<PlatformTransactionRow[]> {
  try {
    const { data } = await supabase
      .from("finance_applications")
      .select("id, loan_amount, status, created_at, users(full_name), banks(name)")
      .in("status", ["approved", "disbursed"])
      .order("created_at", { ascending: false })
      .limit(50);

    if (data?.length) {
      return data.map((r) => {
        const row = r as unknown as Record<string, unknown> & {
          users?: { full_name: string } | null;
          banks?: { name: string } | null;
        };
        return {
          id: String(row.id),
          type: "loan" as const,
          reference: `FIN-${String(row.id).slice(0, 8)}`,
          party: `${row.banks?.name ?? "Bank"} · ${row.users?.full_name ?? "Applicant"}`,
          amount: Number(row.loan_amount),
          status: String(row.status),
          createdAt: String(row.created_at),
        };
      });
    }
  } catch {
    /* mock */
  }
  return MOCK_TRANSACTIONS;
}

export async function fetchAdminVehicles(): Promise<AdminVehicleRow[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("id, title, brand, model, price, city, status, is_featured, metadata, created_at, dealers(name)")
    .order("created_at", { ascending: false })
    .limit(150);

  if (error || !data?.length) return useMock(MOCK_VEHICLES, error);

  return data.map((v) => {
    const row = v as unknown as Record<string, unknown> & { dealers?: { name: string } | null };
    const meta = (row.metadata as Record<string, unknown>) ?? {};
    return {
      id: String(row.id),
      title: String(row.title),
      brand: String(row.brand),
      model: String(row.model),
      price: Number(row.price),
      city: String(row.city),
      status: String(row.status),
      isFeatured: Boolean(row.is_featured),
      platformFeatured: Boolean(meta.platform_featured),
      dealerName: row.dealers?.name ?? null,
      createdAt: String(row.created_at),
    };
  });
}

export async function moderateVehicle(
  id: string,
  patch: Partial<{ status: string; is_featured: boolean; platform_featured: boolean }>
): Promise<{ error: string | null }> {
  const update: Record<string, unknown> = {};
  if (patch.status) update.status = patch.status;
  if (patch.is_featured != null) update.is_featured = patch.is_featured;

  if (patch.platform_featured != null) {
    const { data: current } = await supabase.from("vehicles").select("metadata").eq("id", id).maybeSingle();
    const meta = ((current?.metadata as Record<string, unknown>) ?? {}) as Record<string, unknown>;
    update.metadata = { ...meta, platform_featured: patch.platform_featured };
  }

  const { error } = await supabase.from("vehicles").update(update).eq("id", id);
  return { error: error?.message ?? null };
}

export async function fetchAdminAuctions(): Promise<AdminAuctionRow[]> {
  const { data, error } = await supabase
    .from("auctions")
    .select("id, title, status, is_featured, current_bid, reserve_price, bid_count, ends_at")
    .order("created_at", { ascending: false })
    .limit(80);

  if (error || !data?.length) return useMock(MOCK_AUCTIONS, error);

  return data.map((a) => ({
    id: a.id,
    title: a.title,
    status: a.status,
    isFeatured: a.is_featured,
    currentBid: Number(a.current_bid ?? 0),
    reservePrice: Number(a.reserve_price ?? 0),
    bidCount: a.bid_count ?? 0,
    endsAt: a.ends_at,
  }));
}

export async function updateAdminAuction(
  id: string,
  patch: Partial<{ status: string; is_featured: boolean }>
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("auctions").update(patch).eq("id", id);
  return { error: error?.message ?? null };
}

export async function createPlatformNotification(payload: {
  title: string;
  body: string;
  channel: string;
  audience: string;
}): Promise<{ error: string | null }> {
  const { error } = await supabase.from("platform_notifications").insert({
    title: payload.title,
    body: payload.body,
    channel: payload.channel,
    audience: payload.audience,
    status: "scheduled",
    scheduled_at: new Date(Date.now() + 3600000).toISOString(),
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function sendPlatformNotification(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("platform_notifications")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", id);
  return { error: error?.message ?? null };
}

export async function upsertCmsPage(payload: {
  id?: string;
  slug: string;
  title: string;
  body: string;
  status: "draft" | "published" | "archived";
}): Promise<{ error: string | null }> {
  if (payload.id) {
    const { error } = await supabase
      .from("platform_cms_pages")
      .update({
        slug: payload.slug,
        title: payload.title,
        body: payload.body,
        status: payload.status,
        updated_at: new Date().toISOString(),
        published_at: payload.status === "published" ? new Date().toISOString() : null,
      })
      .eq("id", payload.id);
    return { error: error?.message ?? null };
  }
  const { error } = await supabase.from("platform_cms_pages").insert({
    slug: payload.slug,
    title: payload.title,
    body: payload.body,
    status: payload.status,
  });
  return { error: error?.message ?? null };
}

export async function generatePlatformReport(reportKey: string, title: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("platform_report_snapshots").insert({
    report_key: reportKey,
    title,
    period_label: new Date().toLocaleString("en-IN", { month: "long", year: "numeric" }),
    payload: { generatedAt: new Date().toISOString(), source: "admin_erp" },
  });
  return { error: error?.message ?? null };
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

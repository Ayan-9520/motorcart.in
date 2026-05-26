import { supabase } from "@/shared/api/client";
import { buildMockCustomerSnapshot } from "../data/mock-customer-data";
import { buildDashboardWidgets } from "../lib/profile-utils";
import { getVehicleHero } from "@/lib/media/vehicle-media-registry";
import { ensureCustomerOwnershipSeed } from "./customer-seed.service";
import type {
  CustomerEcosystemSnapshot,
  CustomerPreferences,
  CustomerVehicle,
  CustomerVehicleSegment,
  EngagementCampaign,
  InsuranceWalletEntry,
  OwnershipTimelineEvent,
  ServiceRecord,
} from "../types";

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  const msg = (error.message ?? "").toLowerCase();
  return error.code === "42P01" || error.code === "PGRST205" || msg.includes("does not exist");
}

function daysUntil(iso?: string): number | undefined {
  if (!iso) return undefined;
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));
}

function mapVehicle(row: Record<string, unknown>): CustomerVehicle {
  const brand = String(row.brand);
  const model = String(row.model);
  const segment = String(row.segment ?? "car");
  const bodyType = segment === "bike" ? "Scooter" : segment === "ev" ? "SUV" : "SUV";
  const meta = (row.metadata as Record<string, unknown> | null) ?? {};

  return {
    id: String(row.id),
    brand,
    model,
    variant: row.variant as string | undefined,
    year: Number(row.year),
    fuelType: String(row.fuel_type ?? "petrol"),
    transmission: String(row.transmission ?? "manual"),
    registrationNumber: row.registration_number as string | undefined,
    registrationCity: row.registration_city as string | undefined,
    segment: segment as CustomerVehicleSegment,
    ownershipNumber: Number(row.ownership_number ?? 1),
    purchaseDate: row.purchase_date as string | undefined,
    odometerKm: row.odometer_km as number | undefined,
    healthScore: row.health_score as number | undefined,
    resaleEstimate: row.resale_estimate as number | undefined,
    fastagBalance: Number(row.fastag_balance ?? 0),
    isPrimary: Boolean(row.is_primary),
    imageUrl: getVehicleHero({ brand, model, bodyType, fuelType: String(row.fuel_type ?? "petrol") }),
    insuranceStatus: "none",
    rcStatus: "verified",
    emiDueAmount: meta.emi_due_amount != null ? Number(meta.emi_due_amount) : undefined,
    emiDueDate: meta.emi_due_date as string | undefined,
    loanLender: meta.loan_lender as string | undefined,
  };
}

function enrichVehicles(
  vehicles: CustomerVehicle[],
  insurance: InsuranceWalletEntry[],
  serviceRecords: ServiceRecord[],
  emi?: { amount: number; dueDate: string; lender?: string }
): CustomerVehicle[] {
  return vehicles.map((v) => {
    const ins = insurance.find((i) => i.vehicleId === v.id);
    const svc = serviceRecords.find((s) => s.vehicleLabel.includes(v.model) || s.vehicleLabel.includes(v.brand));
    const svcDays = svc?.nextDueDate ? daysUntil(svc.nextDueDate) : undefined;

    const enriched: CustomerVehicle = {
      ...v,
      insuranceStatus: ins?.status ?? v.insuranceStatus,
      insuranceDaysLeft: ins?.daysLeft,
      serviceDueDays: svcDays,
    };

    if (v.isPrimary && emi) {
      enriched.emiDueAmount = emi.amount;
      enriched.emiDueDate = emi.dueDate;
      enriched.loanLender = emi.lender;
    }

    return enriched;
  });
}

function buildTimelineFromData(
  vehicles: CustomerVehicle[],
  insurance: InsuranceWalletEntry[],
  serviceRecords: ServiceRecord[]
): OwnershipTimelineEvent[] {
  const events: OwnershipTimelineEvent[] = [];

  for (const v of vehicles) {
    if (v.purchaseDate) {
      events.push({
        id: `purchase-${v.id}`,
        date: v.purchaseDate,
        title: "Vehicle purchased",
        description: `${v.brand} ${v.model} registered`,
        type: "purchase",
        vehicleLabel: `${v.brand} ${v.model}`,
      });
    }
  }

  for (const ins of insurance) {
    if (ins.policyEnd) {
      events.push({
        id: `ins-${ins.id}`,
        date: ins.policyEnd,
        title: ins.status === "expiring" ? "Insurance renewal due" : "Insurance policy",
        description: `${ins.insurerName} · ${ins.planType}`,
        type: "insurance",
        vehicleLabel: ins.vehicleLabel,
      });
    }
  }

  for (const svc of serviceRecords) {
    events.push({
      id: `svc-${svc.id}`,
      date: svc.servicedAt.slice(0, 10),
      title: svc.serviceType,
      description: svc.serviceCenter,
      type: "service",
      vehicleLabel: svc.vehicleLabel,
    });
  }

  return events.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
}

async function fetchPrimaryEmi(userId: string): Promise<{ amount: number; dueDate: string; lender?: string } | undefined> {
  let data: Record<string, unknown>[] | null = null;

  const withBank = await supabase
    .from("finance_applications")
    .select("emi_amount, banks(name), status, updated_at")
    .eq("user_id", userId)
    .in("status", ["approved", "disbursed"])
    .order("updated_at", { ascending: false })
    .limit(1);

  if (!withBank.error && withBank.data?.[0]?.emi_amount) {
    data = withBank.data as Record<string, unknown>[];
  } else {
    const plain = await supabase
      .from("finance_applications")
      .select("emi_amount, status, updated_at")
      .eq("user_id", userId)
      .in("status", ["approved", "disbursed"])
      .order("updated_at", { ascending: false })
      .limit(1);
    if (!plain.error && plain.data?.[0]?.emi_amount) {
      data = plain.data as Record<string, unknown>[];
    }
  }

  if (!data?.[0]?.emi_amount) return undefined;

  const row = data[0];
  const banks = row.banks as { name?: string } | { name?: string }[] | null | undefined;
  const bankName = Array.isArray(banks) ? banks[0]?.name : banks?.name;
  const due = new Date();
  due.setDate(28);
  if (due < new Date()) due.setMonth(due.getMonth() + 1);

  return {
    amount: Number(row.emi_amount),
    dueDate: due.toISOString().slice(0, 10),
    lender: bankName,
  };
}

export type CreateVehicleInput = {
  brand: string;
  model: string;
  year: number;
  registrationNumber?: string;
  segment?: CustomerVehicleSegment;
  isPrimary?: boolean;
};

export type UpsertPreferencesInput = Partial<
  Pick<CustomerPreferences, "dob" | "anniversary" | "preferredBrand" | "city" | "state">
>;

export async function createCustomerVehicle(
  userId: string,
  input: CreateVehicleInput
): Promise<{ ok: boolean; error?: string }> {
  const { count } = await supabase
    .from("customer_vehicles")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  const isFirst = !count || count === 0;

  if (input.isPrimary || isFirst) {
    await supabase.from("customer_vehicles").update({ is_primary: false }).eq("user_id", userId);
  }

  const { error } = await supabase.from("customer_vehicles").insert({
    user_id: userId,
    brand: input.brand.trim(),
    model: input.model.trim(),
    year: input.year,
    registration_number: input.registrationNumber?.trim() || null,
    segment: input.segment ?? "car",
    is_primary: input.isPrimary ?? isFirst,
    health_score: 80,
    metadata: {},
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function upsertCustomerPreferences(
  userId: string,
  input: UpsertPreferencesInput
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from("customer_preferences").upsert({
    user_id: userId,
    dob: input.dob || null,
    anniversary: input.anniversary || null,
    preferred_brand: input.preferredBrand || null,
    city: input.city || null,
    state: input.state || null,
    updated_at: new Date().toISOString(),
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function updateCustomerVehicleFastag(
  vehicleId: string,
  userId: string,
  balance: number
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase
    .from("customer_vehicles")
    .update({ fastag_balance: balance, updated_at: new Date().toISOString() })
    .eq("id", vehicleId)
    .eq("user_id", userId);

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function fetchCustomerEcosystemSnapshot(
  userId: string | undefined
): Promise<CustomerEcosystemSnapshot> {
  const mock = buildMockCustomerSnapshot();
  if (!userId) return mock;

  let [vehiclesRes, prefsRes, notifRes, insightsRes, docsRes, insRes, svcRes, campaignsRes] =
    await Promise.all([
      supabase.from("customer_vehicles").select("*").eq("user_id", userId).order("is_primary", { ascending: false }),
      supabase.from("customer_preferences").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("notification_logs").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20),
      supabase.from("ai_insights").select("*").eq("user_id", userId).is("dismissed_at", null).order("created_at", { ascending: false }).limit(10),
      supabase.from("vehicle_documents").select("*").eq("user_id", userId),
      supabase.from("insurance_wallet").select("*").eq("user_id", userId),
      supabase.from("service_records").select("*").eq("user_id", userId).order("serviced_at", { ascending: false }).limit(10),
      supabase.from("engagement_campaigns").select("*").eq("user_id", userId).is("dismissed_at", null).limit(6),
    ]);

  if (isMissingTableError(vehiclesRes.error) || isMissingTableError(prefsRes.error)) {
    return mock;
  }

  if (!vehiclesRes.data?.length) {
    const seeded = await ensureCustomerOwnershipSeed(userId);
    if (seeded) {
      [vehiclesRes, prefsRes, notifRes, insightsRes, docsRes, insRes, svcRes, campaignsRes] = await Promise.all([
        supabase.from("customer_vehicles").select("*").eq("user_id", userId).order("is_primary", { ascending: false }),
        supabase.from("customer_preferences").select("*").eq("user_id", userId).maybeSingle(),
        supabase.from("notification_logs").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20),
        supabase.from("ai_insights").select("*").eq("user_id", userId).is("dismissed_at", null).order("created_at", { ascending: false }).limit(10),
        supabase.from("vehicle_documents").select("*").eq("user_id", userId),
        supabase.from("insurance_wallet").select("*").eq("user_id", userId),
        supabase.from("service_records").select("*").eq("user_id", userId).order("serviced_at", { ascending: false }).limit(10),
        supabase.from("engagement_campaigns").select("*").eq("user_id", userId).is("dismissed_at", null).limit(6),
      ]);
    }
  }

  const useMockFallback = !vehiclesRes.data?.length;

  const preferences: CustomerPreferences = prefsRes.data
    ? {
        dob: prefsRes.data.dob as string | undefined,
        anniversary: prefsRes.data.anniversary as string | undefined,
        preferredBrand: prefsRes.data.preferred_brand as string | undefined,
        city: prefsRes.data.city as string | undefined,
        state: prefsRes.data.state as string | undefined,
        profileCompletion: Number(prefsRes.data.profile_completion ?? 0),
        loyaltyTier: String(prefsRes.data.loyalty_tier ?? "bronze"),
        rewardPointsBalance: Number(prefsRes.data.reward_points_balance ?? 0),
      }
    : useMockFallback
      ? mock.preferences
      : { profileCompletion: 0, loyaltyTier: "Bronze", rewardPointsBalance: 0 };

  const insurance: InsuranceWalletEntry[] = insRes.data?.length
    ? insRes.data.map((w) => {
        const end = String(w.policy_end ?? "");
        const daysLeft = daysUntil(end) ?? 0;
        return {
          id: String(w.id),
          vehicleId: w.vehicle_id as string | undefined,
          vehicleLabel: String((w.metadata as Record<string, string>)?.vehicle_label ?? "Vehicle"),
          insurerName: String(w.insurer_name),
          policyNumber: w.policy_number as string | undefined,
          planType: String(w.plan_type ?? "Comprehensive"),
          idvAmount: Number(w.idv_amount ?? 0),
          annualPremium: Number(w.annual_premium ?? 0),
          ncbPercent: Number(w.ncb_percent ?? 0),
          policyEnd: end,
          daysLeft,
          claimCount: Number(w.claim_count ?? 0),
          status: (daysLeft <= 15 ? "expiring" : daysLeft === 0 ? "expired" : "active") as InsuranceWalletEntry["status"],
        };
      })
    : useMockFallback
      ? mock.insurance
      : [];

  const serviceRecords: ServiceRecord[] = svcRes.data?.length
    ? svcRes.data.map((s) => ({
        id: String(s.id),
        vehicleLabel: String((s.metadata as Record<string, string>)?.vehicle_label ?? "Vehicle"),
        serviceType: String(s.service_type),
        serviceCenter: s.service_center as string | undefined,
        amount: s.amount as number | undefined,
        servicedAt: String(s.serviced_at),
        nextDueDate: s.next_due_date as string | undefined,
      }))
    : useMockFallback
      ? mock.serviceRecords
      : [];

  const emi = await fetchPrimaryEmi(userId);

  let vehicles: CustomerVehicle[] = vehiclesRes.data?.length
    ? vehiclesRes.data.map((r) => mapVehicle(r as Record<string, unknown>))
    : useMockFallback
      ? mock.vehicles
      : [];

  vehicles = enrichVehicles(vehicles, insurance, serviceRecords, emi);

  const notifications = notifRes.data?.length
    ? notifRes.data.map((n) => ({
        id: String(n.id),
        type: n.type as CustomerEcosystemSnapshot["notifications"][0]["type"],
        title: String(n.title),
        body: n.body as string | undefined,
        actionUrl: n.action_url as string | undefined,
        createdAt: String(n.created_at),
        read: Boolean(n.read_at),
      }))
    : useMockFallback
      ? mock.notifications
      : [];

  const insights = insightsRes.data?.length
    ? insightsRes.data.map((i) => ({
        id: String(i.id),
        insightKey: String(i.insight_key),
        title: String(i.title),
        summary: String(i.summary),
        severity: (i.severity ?? "info") as CustomerEcosystemSnapshot["insights"][0]["severity"],
        actionLabel: i.action_label as string | undefined,
        actionUrl: i.action_url as string | undefined,
        vehicleLabel: (i.metadata as Record<string, string>)?.vehicle_label,
      }))
    : useMockFallback
      ? mock.insights
      : [];

  const documents = docsRes.data?.length
    ? docsRes.data.map((d) => {
        const expiresAt = d.expires_at as string | undefined;
        return {
          id: String(d.id),
          vehicleId: d.vehicle_id as string | undefined,
          docType: d.doc_type as CustomerEcosystemSnapshot["documents"][0]["docType"],
          title: String(d.title),
          documentNumber: d.document_number as string | undefined,
          verified: Boolean(d.verified),
          expiresAt,
          daysUntilExpiry: daysUntil(expiresAt),
        };
      })
    : useMockFallback
      ? mock.documents
      : [];

  const campaigns: EngagementCampaign[] = campaignsRes.data?.length
    ? campaignsRes.data.map((c) => ({
        id: String(c.id),
        type: c.campaign_type as EngagementCampaign["type"],
        title: String(c.title),
        message: String(c.message),
        ctaLabel: String(c.cta_label ?? "View"),
        ctaUrl: String(c.cta_url ?? "/dashboard/customer"),
        icon: ((c.metadata as Record<string, string>)?.icon ?? "sparkles") as EngagementCampaign["icon"],
      }))
    : useMockFallback
      ? mock.campaigns
      : [];

  const primary = vehicles.find((v) => v.isPrimary) ?? vehicles[0];
  const widgets = buildDashboardWidgets(primary, preferences, insights.length);
  const timeline = vehiclesRes.data?.length
    ? buildTimelineFromData(vehicles, insurance, serviceRecords)
    : mock.timeline;

  return {
    vehicles,
    documents,
    insurance,
    insuranceClaims: mock.insuranceClaims,
    serviceRecords,
    notifications,
    insights,
    preferences,
    widgets,
    timeline,
    campaigns,
    unreadNotifications: notifications.filter((n) => !n.read).length,
  };
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  const { error } = await supabase
    .from("notification_logs")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId);
  if (isMissingTableError(error)) return;
}

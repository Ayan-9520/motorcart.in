import { supabase } from "@/shared/api/client";
import { buildMockCustomerSnapshot } from "../data/mock-customer-data";
import { buildDashboardWidgets } from "../lib/profile-utils";
import { getVehicleHero } from "@/lib/media/vehicle-media-registry";
import type { CustomerEcosystemSnapshot, CustomerVehicle } from "../types";

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  const msg = (error.message ?? "").toLowerCase();
  return error.code === "42P01" || error.code === "PGRST205" || msg.includes("does not exist");
}

function mapVehicle(row: Record<string, unknown>): CustomerVehicle {
  const brand = String(row.brand);
  const model = String(row.model);
  const segment = String(row.segment ?? "car");
  const bodyType = segment === "bike" ? "Scooter" : segment === "ev" ? "SUV" : "SUV";
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
    segment: segment as CustomerVehicle["segment"],
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
  };
}

export async function fetchCustomerEcosystemSnapshot(
  userId: string | undefined
): Promise<CustomerEcosystemSnapshot> {
  const mock = buildMockCustomerSnapshot();
  if (!userId) return mock;

  const [vehiclesRes, prefsRes, notifRes, insightsRes, docsRes, insRes, svcRes] = await Promise.all([
    supabase.from("customer_vehicles").select("*").eq("user_id", userId).order("is_primary", { ascending: false }),
    supabase.from("customer_preferences").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("notification_logs").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20),
    supabase.from("ai_insights").select("*").eq("user_id", userId).is("dismissed_at", null).order("created_at", { ascending: false }).limit(10),
    supabase.from("vehicle_documents").select("*").eq("user_id", userId),
    supabase.from("insurance_wallet").select("*").eq("user_id", userId),
    supabase.from("service_records").select("*").eq("user_id", userId).order("serviced_at", { ascending: false }).limit(10),
  ]);

  if (
    isMissingTableError(vehiclesRes.error) ||
    isMissingTableError(prefsRes.error)
  ) {
    return mock;
  }

  const vehicles = vehiclesRes.data?.length
    ? vehiclesRes.data.map((r) => mapVehicle(r as Record<string, unknown>))
    : mock.vehicles;

  const preferences = prefsRes.data
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
    : mock.preferences;

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
    : mock.notifications;

  const insights = insightsRes.data?.length
    ? insightsRes.data.map((i) => ({
        id: String(i.id),
        insightKey: String(i.insight_key),
        title: String(i.title),
        summary: String(i.summary),
        severity: (i.severity ?? "info") as CustomerEcosystemSnapshot["insights"][0]["severity"],
        actionLabel: i.action_label as string | undefined,
        actionUrl: i.action_url as string | undefined,
      }))
    : mock.insights;

  const documents = docsRes.data?.length
    ? docsRes.data.map((d) => ({
        id: String(d.id),
        vehicleId: d.vehicle_id as string | undefined,
        docType: d.doc_type as CustomerEcosystemSnapshot["documents"][0]["docType"],
        title: String(d.title),
        documentNumber: d.document_number as string | undefined,
        verified: Boolean(d.verified),
        expiresAt: d.expires_at as string | undefined,
      }))
    : mock.documents;

  const insurance = insRes.data?.length
    ? insRes.data.map((w) => {
        const end = String(w.policy_end ?? "");
        const daysLeft = end ? Math.max(0, Math.ceil((new Date(end).getTime() - Date.now()) / 86400000)) : 0;
        return {
          id: String(w.id),
          vehicleId: w.vehicle_id as string | undefined,
          vehicleLabel: String(w.metadata?.vehicle_label ?? "Vehicle"),
          insurerName: String(w.insurer_name),
          policyNumber: w.policy_number as string | undefined,
          planType: String(w.plan_type ?? "Comprehensive"),
          idvAmount: Number(w.idv_amount ?? 0),
          annualPremium: Number(w.annual_premium ?? 0),
          ncbPercent: Number(w.ncb_percent ?? 0),
          policyEnd: end,
          daysLeft,
          claimCount: Number(w.claim_count ?? 0),
          status: (daysLeft <= 15 ? "expiring" : "active") as "active" | "expiring" | "expired",
        };
      })
    : mock.insurance;

  const serviceRecords = svcRes.data?.length
    ? svcRes.data.map((s) => ({
        id: String(s.id),
        vehicleLabel: String(s.metadata?.vehicle_label ?? "Vehicle"),
        serviceType: String(s.service_type),
        serviceCenter: s.service_center as string | undefined,
        amount: s.amount as number | undefined,
        servicedAt: String(s.serviced_at),
        nextDueDate: s.next_due_date as string | undefined,
      }))
    : mock.serviceRecords;

  const primary = vehicles.find((v) => v.isPrimary) ?? vehicles[0];
  const widgets = buildDashboardWidgets(primary, preferences, insights.length);

  return {
    vehicles,
    documents,
    insurance,
    serviceRecords,
    notifications,
    insights,
    preferences,
    widgets,
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

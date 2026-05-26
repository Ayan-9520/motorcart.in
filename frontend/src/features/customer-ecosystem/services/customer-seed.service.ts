import { supabase } from "@/shared/api/client";
import { DEFAULT_SERVICE_BOOK_PATH } from "@/features/service-booking/lib/service-book-routes";

/** Seeds a realistic ownership wallet when tables exist but the user has no vehicles yet. */
export async function ensureCustomerOwnershipSeed(userId: string): Promise<boolean> {
  const { count } = await supabase
    .from("customer_vehicles")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (count && count > 0) return false;

  const { data: primaryVehicle, error: vehicleError } = await supabase
    .from("customer_vehicles")
    .insert({
      user_id: userId,
      brand: "Hyundai",
      model: "Creta",
      variant: "SX(O) 1.5 Turbo DCT",
      year: 2022,
      fuel_type: "diesel",
      transmission: "automatic",
      registration_number: "MH 12 AB 4521",
      registration_city: "Pune",
      segment: "car",
      ownership_number: 1,
      purchase_date: "2022-08-14",
      odometer_km: 28400,
      health_score: 86,
      resale_estimate: 1425000,
      fastag_balance: 1240,
      is_primary: true,
      metadata: {
        loan_lender: "HDFC Bank",
        emi_due_amount: 18420,
        emi_due_date: "2026-05-28",
      },
    })
    .select("id")
    .single();

  if (vehicleError || !primaryVehicle) return false;

  const vehicleId = primaryVehicle.id as string;

  await Promise.all([
    supabase.from("customer_vehicles").insert({
      user_id: userId,
      brand: "Honda",
      model: "Activa 6G",
      variant: "DLX",
      year: 2021,
      fuel_type: "petrol",
      transmission: "automatic",
      registration_number: "MH 12 CD 8890",
      registration_city: "Pune",
      segment: "bike",
      ownership_number: 1,
      purchase_date: "2021-03-02",
      odometer_km: 11200,
      health_score: 92,
      resale_estimate: 72000,
      fastag_balance: 0,
      is_primary: false,
      metadata: {},
    }),
    supabase.from("customer_preferences").upsert({
      user_id: userId,
      dob: "1994-06-12",
      anniversary: "2020-11-08",
      preferred_brand: "Hyundai",
      city: "Pune",
      state: "Maharashtra",
      profile_completion: 75,
      loyalty_tier: "Gold",
      reward_points_balance: 4250,
    }),
    supabase.from("insurance_wallet").insert({
      user_id: userId,
      vehicle_id: vehicleId,
      insurer_name: "ACKO",
      policy_number: "ACKO/MH/2025/8821",
      plan_type: "Comprehensive + Zero Dep",
      idv_amount: 1280000,
      annual_premium: 18420,
      ncb_percent: 35,
      policy_start: "2025-05-28",
      policy_end: "2026-05-28",
      metadata: { vehicle_label: "Hyundai Creta" },
    }),
    supabase.from("service_records").insert({
      user_id: userId,
      vehicle_id: vehicleId,
      service_center: "Hyundai Arena — Kothrud",
      service_type: "Periodic service · 25,000 km",
      amount: 6200,
      next_due_date: "2026-06-01",
      metadata: { vehicle_label: "Hyundai Creta" },
      serviced_at: "2025-11-18T10:00:00Z",
    }),
    supabase.from("vehicle_documents").insert([
      {
        user_id: userId,
        vehicle_id: vehicleId,
        doc_type: "rc",
        title: "Registration Certificate",
        document_number: "MH12AB4521",
        verified: true,
      },
      {
        user_id: userId,
        vehicle_id: vehicleId,
        doc_type: "insurance",
        title: "Comprehensive Policy",
        document_number: "ACKO/MH/2025/8821",
        verified: true,
        expires_at: "2026-05-28",
      },
    ]),
    supabase.from("ai_insights").insert([
      {
        user_id: userId,
        vehicle_id: vehicleId,
        insight_key: "insurance_expiry",
        title: "Insurance expiring soon",
        summary: "ACKO comprehensive for Creta ends in 8 days. Renew now to keep zero-dep cover.",
        severity: "warning",
        action_label: "Renew policy",
        action_url: "/dashboard/customer/insurance-wallet",
      },
      {
        user_id: userId,
        vehicle_id: vehicleId,
        insight_key: "service_due",
        title: "Service window opening",
        summary: "Book early for weekend slots in Pune.",
        severity: "info",
        action_label: "Book service",
        action_url: DEFAULT_SERVICE_BOOK_PATH,
      },
    ]),
    supabase.from("notification_logs").insert([
      {
        user_id: userId,
        type: "insurance",
        title: "Insurance expiring in 8 days",
        body: "Renew ACKO policy for Hyundai Creta before 28 May.",
        action_url: "/dashboard/customer/insurance-wallet",
      },
      {
        user_id: userId,
        type: "emi",
        title: "EMI due on 28 May",
        body: "₹18,420 HDFC auto loan installment.",
        action_url: "/dashboard/customer/loans",
      },
    ]),
    supabase.from("engagement_campaigns").insert([
      {
        user_id: userId,
        campaign_type: "insurance",
        title: "Renew before expiry",
        message: "Save up to ₹1,200 on ACKO renewal with zero-dep retained.",
        cta_label: "Renew now",
        cta_url: "/dashboard/customer/insurance-wallet",
        metadata: { icon: "shield" },
      },
      {
        user_id: userId,
        campaign_type: "service",
        title: "Service slot open",
        message: "Weekend slots filling fast in Pune — book Creta service early.",
        cta_label: "Book garage",
        cta_url: DEFAULT_SERVICE_BOOK_PATH,
        metadata: { icon: "wrench" },
      },
    ]),
  ]);

  return true;
}

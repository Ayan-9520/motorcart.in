import { supabase } from "@/shared/api/client";
import { buildMockNewCarDealerSnapshot, getLeadDetail } from "../data/mock-ncd-data";
import type { NewCarDealerSnapshot, NcdLeadDetail } from "../types";

function isMissingTable(err: { code?: string; message?: string } | null): boolean {
  if (!err) return false;
  const m = (err.message ?? "").toLowerCase();
  return err.code === "42P01" || err.code === "PGRST205" || m.includes("does not exist");
}

export async function fetchNewCarDealerSnapshot(
  dealerId?: string,
  dealerName?: string
): Promise<NewCarDealerSnapshot> {
  const mock = buildMockNewCarDealerSnapshot(dealerName ?? "Hyundai Arena Pune");
  if (!dealerId) return mock;

  const { data: inv, error } = await supabase
    .from("new_car_inventory")
    .select("*")
    .eq("dealer_id", dealerId)
    .limit(50);

  if (isMissingTable(error) || !inv?.length) return mock;

  const { data: leads } = await supabase
    .from("dealer_leads")
    .select("*")
    .eq("dealer_id", dealerId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (!leads?.length) return mock;

  return {
    ...mock,
    inventory: inv.map((r) => ({
      id: String(r.id),
      brand: String(r.brand),
      model: String(r.model),
      variant: String(r.variant),
      fuelType: String(r.fuel_type ?? ""),
      transmission: String(r.transmission ?? ""),
      exShowroomPrice: Number(r.ex_showroom_price),
      onRoadPrice: Number(r.on_road_price ?? r.ex_showroom_price),
      discountAmount: Number(r.discount_amount ?? 0),
      stockStatus: r.stock_status as NewCarDealerSnapshot["inventory"][0]["stockStatus"],
      stockHealth: (r.stock_health ?? "fast_moving") as NewCarDealerSnapshot["inventory"][0]["stockHealth"],
      colors: (r.colors as string[]) ?? [],
      expectedDeliveryDays: r.expected_delivery_days as number | undefined,
      imageUrl: String(r.image_url ?? mock.inventory[0]!.imageUrl),
    })),
    leads: leads.map((l) => ({
      id: String(l.id),
      customerName: String(l.customer_name),
      phone: String(l.phone),
      email: l.email as string | undefined,
      city: String(l.city ?? ""),
      source: String(l.source),
      stage: l.stage as NewCarDealerSnapshot["leads"][0]["stage"],
      preferredBrand: l.preferred_brand as string | undefined,
      preferredModel: l.preferred_model as string | undefined,
      budgetMax: l.budget_max as number | undefined,
      tradeIn: l.trade_in_vehicle as string | undefined,
      financeInterest: Boolean(l.finance_interest),
      insuranceInterest: Boolean(l.insurance_interest),
      assignedTo: l.assigned_to as string | undefined,
      score: Number(l.score ?? 0),
      createdAt: String(l.created_at),
    })),
  };
}

export async function fetchLeadDetail(leadId: string): Promise<NcdLeadDetail | null> {
  const { data, error } = await supabase.from("dealer_leads").select("*").eq("id", leadId).maybeSingle();
  if (isMissingTable(error) || !data) return getLeadDetail(leadId);
  const base = getLeadDetail(leadId);
  if (!base) return null;
  return { ...base, customerName: String(data.customer_name), phone: String(data.phone) };
}

import { getVehicleHero } from "@/lib/media/vehicle-media-registry";
import { buildDashboardWidgets } from "../lib/profile-utils";
import type { CustomerEcosystemSnapshot } from "../types";

function hero(brand: string, model: string, bodyType: string, fuel = "petrol") {
  return getVehicleHero({ brand, model, bodyType, fuelType: fuel });
}

/** Realistic Indian ownership demo — used when Supabase tables are empty */
export function buildMockCustomerSnapshot(): CustomerEcosystemSnapshot {
  const vehicles = [
    {
      id: "mv-hyundai-creta",
      brand: "Hyundai",
      model: "Creta",
      variant: "SX(O) 1.5 Turbo DCT",
      year: 2022,
      fuelType: "Diesel",
      transmission: "Automatic",
      registrationNumber: "MH 12 AB 4521",
      registrationCity: "Pune",
      segment: "car" as const,
      ownershipNumber: 1,
      purchaseDate: "2022-08-14",
      odometerKm: 28400,
      healthScore: 86,
      resaleEstimate: 1425000,
      fastagBalance: 1240,
      isPrimary: true,
      imageUrl: hero("Hyundai", "Creta", "SUV", "diesel"),
      insuranceStatus: "expiring" as const,
      insuranceDaysLeft: 8,
      rcStatus: "verified" as const,
      serviceDueDays: 12,
      emiDueAmount: 18420,
      emiDueDate: "2026-05-28",
    },
    {
      id: "mv-honda-activa",
      brand: "Honda",
      model: "Activa 6G",
      variant: "DLX",
      year: 2021,
      fuelType: "Petrol",
      transmission: "Automatic (CVT)",
      registrationNumber: "MH 12 CD 8890",
      registrationCity: "Pune",
      segment: "bike" as const,
      ownershipNumber: 1,
      purchaseDate: "2021-03-02",
      odometerKm: 11200,
      healthScore: 92,
      resaleEstimate: 72000,
      fastagBalance: 0,
      isPrimary: false,
      imageUrl: hero("Honda", "Activa 6G", "Scooter"),
      insuranceStatus: "active" as const,
      insuranceDaysLeft: 142,
      rcStatus: "verified" as const,
      serviceDueDays: 45,
    },
  ];

  const documents = [
    { id: "doc-rc-1", vehicleId: vehicles[0]!.id, docType: "rc" as const, title: "Registration Certificate", documentNumber: "MH12AB4521", verified: true, expiresAt: undefined },
    { id: "doc-ins-1", vehicleId: vehicles[0]!.id, docType: "insurance" as const, title: "Comprehensive Policy", documentNumber: "ACKO/MH/2025/8821", verified: true, expiresAt: "2026-05-28", daysUntilExpiry: 8 },
    { id: "doc-puc-1", vehicleId: vehicles[0]!.id, docType: "puc" as const, title: "PUC Certificate", verified: true, expiresAt: "2026-09-15", daysUntilExpiry: 118 },
    { id: "doc-loan-1", vehicleId: vehicles[0]!.id, docType: "loan" as const, title: "HDFC Auto Loan", documentNumber: "ALN8829102", verified: true },
    { id: "doc-rc-2", vehicleId: vehicles[1]!.id, docType: "rc" as const, title: "Two-wheeler RC", verified: true },
    { id: "doc-ins-2", vehicleId: vehicles[1]!.id, docType: "insurance" as const, title: "Third Party + OD", verified: false, expiresAt: "2026-10-02", daysUntilExpiry: 135 },
  ];

  const insurance = [
    {
      id: "ins-1",
      vehicleId: vehicles[0]!.id,
      vehicleLabel: "Hyundai Creta",
      insurerName: "ACKO",
      policyNumber: "ACKO/MH/2025/8821",
      planType: "Comprehensive + Zero Dep",
      idvAmount: 1280000,
      annualPremium: 18420,
      ncbPercent: 35,
      policyEnd: "2026-05-28",
      daysLeft: 8,
      claimCount: 0,
      status: "expiring" as const,
    },
    {
      id: "ins-2",
      vehicleId: vehicles[1]!.id,
      vehicleLabel: "Honda Activa 6G",
      insurerName: "Digit",
      policyNumber: "DIG/BK/2025/4412",
      planType: "Comprehensive",
      idvAmount: 68000,
      annualPremium: 2890,
      ncbPercent: 20,
      policyEnd: "2026-10-02",
      daysLeft: 135,
      claimCount: 1,
      status: "active" as const,
    },
  ];

  const serviceRecords = [
    { id: "svc-1", vehicleLabel: "Hyundai Creta", serviceType: "Periodic service · 25,000 km", serviceCenter: "Hyundai Arena — Kothrud", amount: 6200, servicedAt: "2025-11-18", nextDueDate: "2026-06-01" },
    { id: "svc-2", vehicleLabel: "Hyundai Creta", serviceType: "AC filter & coolant top-up", serviceCenter: "QuickLane — Baner", amount: 1850, servicedAt: "2025-08-02" },
    { id: "svc-3", vehicleLabel: "Honda Activa 6G", serviceType: "Free service · 10,000 km", serviceCenter: "Honda Dream — Pune", amount: 890, servicedAt: "2025-12-05", nextDueDate: "2026-07-10" },
  ];

  const notifications = [
    { id: "n1", type: "insurance" as const, title: "Insurance expiring in 8 days", body: "Renew ACKO policy for Hyundai Creta before 28 May.", actionUrl: "/dashboard/customer/insurance-wallet", createdAt: new Date(Date.now() - 3600000).toISOString(), read: false },
    { id: "n2", type: "emi" as const, title: "EMI due on 28 May", body: "₹18,420 HDFC auto loan installment.", actionUrl: "/dashboard/customer/loans", createdAt: new Date(Date.now() - 7200000).toISOString(), read: false },
    { id: "n3", type: "service" as const, title: "Service due in 12 days", body: "Creta periodic service recommended at 30,000 km.", actionUrl: "/services/book", createdAt: new Date(Date.now() - 86400000).toISOString(), read: true },
    { id: "n4", type: "ai" as const, title: "Resale value up 4.2%", body: "Your Creta estimate increased based on Pune demand.", actionUrl: "/dashboard/customer/insights", createdAt: new Date(Date.now() - 172800000).toISOString(), read: false },
    { id: "n5", type: "price_drop" as const, title: "Saved listing price drop", body: "2021 Kia Seltos GTX now ₹45,000 lower.", actionUrl: "/wishlist", createdAt: new Date(Date.now() - 259200000).toISOString(), read: true },
    { id: "n6", type: "loyalty" as const, title: "+250 reward points", body: "Service cashback credited to your wallet.", actionUrl: "/dashboard/customer/rewards", createdAt: new Date(Date.now() - 345600000).toISOString(), read: true },
  ];

  const insights = [
    { id: "ai-1", insightKey: "insurance_expiry", title: "Insurance expiring soon", summary: "ACKO comprehensive for Creta ends in 8 days. Renew now to keep zero-dep cover.", severity: "warning" as const, actionLabel: "Renew policy", actionUrl: "/insurance/quote", vehicleLabel: "Hyundai Creta" },
    { id: "ai-2", insightKey: "service_due", title: "Service window opening", summary: "You're 1,600 km from 30,000 km service. Book early for weekend slots in Pune.", severity: "info" as const, actionLabel: "Book service", actionUrl: "/services/book", vehicleLabel: "Hyundai Creta" },
    { id: "ai-3", insightKey: "resale_up", title: "Resale value increased", summary: "Creta SX(O) estimate is up ₹58,000 vs last quarter in your city.", severity: "success" as const, actionLabel: "View valuation", actionUrl: "/dashboard/customer/garage", vehicleLabel: "Hyundai Creta" },
    { id: "ai-4", insightKey: "loan_preapproved", title: "Top-up pre-approved", summary: "HDFC has a ₹2.5L pre-approved top-up at 9.2% for verified profiles.", severity: "success" as const, actionLabel: "Check eligibility", actionUrl: "/finance/tools", vehicleLabel: "Profile" },
    { id: "ai-5", insightKey: "fuel_efficiency", title: "Fuel efficiency dip", summary: "Last 3 tank-ups show 12% lower mileage — consider air filter check.", severity: "info" as const, actionLabel: "Book inspection", actionUrl: "/services/book", vehicleLabel: "Hyundai Creta" },
  ];

  const preferences = {
    dob: "1994-06-12",
    anniversary: "2020-11-08",
    preferredBrand: "Hyundai",
    city: "Pune",
    state: "Maharashtra",
    profileCompletion: 78,
    loyaltyTier: "Gold",
    rewardPointsBalance: 4250,
  };

  const primary = vehicles[0]!;
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

export function greetingForHour(name: string): string {
  const h = new Date().getHours();
  const part = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const first = name.split(" ")[0] ?? name;
  return `${part}, ${first} 👋`;
}

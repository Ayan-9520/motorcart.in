import type { InsuranceVehicleType } from "../types";

export function parseInsuranceVehicle(param: string | null): InsuranceVehicleType {
  return param === "bike" ? "bike" : "car";
}

export function insuranceHubPath(type?: InsuranceVehicleType): string {
  return type ? `/insurance?type=${type}` : "/insurance";
}

export function insuranceQuotePath(type: InsuranceVehicleType = "car"): string {
  return `/insurance/quote?type=${type}`;
}

export function insuranceComparePath(type: InsuranceVehicleType = "car"): string {
  return `/insurance/compare?type=${type}`;
}

export function insuranceApplyPath(quoteId?: string, type?: InsuranceVehicleType): string {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (quoteId) params.set("quote", quoteId);
  const q = params.toString();
  return q ? `/insurance/apply?${q}` : "/insurance/apply";
}

export function vehicleTypeLabel(type: InsuranceVehicleType): string {
  return type === "bike" ? "Bike & scooter" : "Car";
}

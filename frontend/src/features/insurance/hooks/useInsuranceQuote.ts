import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buildInsuranceQuotes,
  fetchInsurancePartners,
  persistInsuranceQuotes,
} from "../services/insurance.service";
import { POPULAR_BIKE_MODELS, POPULAR_CAR_MODELS } from "../lib/insurance-premium";
import type { InsuranceQuoteInput, InsuranceQuoteOffer, InsuranceVehicleType } from "../types";

function defaultsForType(vehicleType: InsuranceVehicleType): InsuranceQuoteInput {
  const popular = vehicleType === "bike" ? POPULAR_BIKE_MODELS[0] : POPULAR_CAR_MODELS[0];
  return {
    vehicleType,
    vehicleYear: new Date().getFullYear() - 2,
    vehicleMake: popular.make,
    vehicleModel: popular.model,
    registrationCity: "Mumbai",
    fuelType: "petrol",
    ncbPercent: 20,
    planType: "comprehensive",
    addons: [],
  };
}

export function useInsuranceQuote(vehicleType: InsuranceVehicleType = "car") {
  const [input, setInput] = useState<InsuranceQuoteInput>(() => defaultsForType(vehicleType));
  const [offers, setOffers] = useState<InsuranceQuoteOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInput(defaultsForType(vehicleType));
  }, [vehicleType]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const partners = await fetchInsurancePartners();
      const quotes = buildInsuranceQuotes(partners, input);
      setOffers(quotes);
      void persistInsuranceQuotes(input, quotes).catch(() => {});
    } finally {
      setLoading(false);
    }
  }, [input]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const bestOffer = useMemo(() => offers[0] ?? null, [offers]);

  const patchInput = useCallback((patch: Partial<InsuranceQuoteInput>) => {
    setInput((prev) => ({ ...prev, ...patch }));
  }, []);

  return { input, patchInput, offers, bestOffer, loading, refresh };
}

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import type { HeroSearchFilters, HeroSearchMode } from "@/features/home/data/homepage-data";
import { useVehicleHubStore } from "@/store/vehicleHubStore";
import type { HubCategorySlug } from "@/features/marketplace/types";

const HUB_TO_HERO_MODE: Partial<Record<HubCategorySlug, HeroSearchMode>> = {
  cars: "cars",
  bikes: "bikes",
  trucks: "trucks",
  buses: "buses",
  auto: "auto",
  ev: "cars",
};

type HeroSearchContextValue = {
  mode: HeroSearchMode;
  setMode: (mode: HeroSearchMode) => void;
  query: string;
  setQuery: (q: string) => void;
  brand: string;
  setBrand: (v: string) => void;
  budget: string;
  setBudget: (v: string) => void;
  fuel: string;
  setFuel: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  filters: HeroSearchFilters;
  hasFilters: boolean;
  clearFilters: () => void;
};

const HeroSearchContext = createContext<HeroSearchContextValue | null>(null);

export function HeroSearchProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isMarketingHome = pathname === "/";
  const [mode, setMode] = useState<HeroSearchMode>("cars");
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [budget, setBudget] = useState("");
  const [fuel, setFuel] = useState("");
  const [city, setCity] = useState("");

  const filters = useMemo<HeroSearchFilters>(
    () => ({ brand, budget, fuel, city }),
    [brand, budget, fuel, city]
  );

  const hasFilters = Boolean(brand.trim() || budget.trim() || fuel.trim() || city.trim());

  const clearFilters = () => {
    setBrand("");
    setBudget("");
    setFuel("");
    setCity("");
  };

  useEffect(() => {
    setBrand("");
    setBudget("");
    setFuel("");
    setCity("");
    setQuery("");
  }, [mode]);

  const activeHub = useVehicleHubStore((s) => s.activeHub);
  const setBuyContext = useVehicleHubStore((s) => s.setBuyContext);

  useEffect(() => {
    if (isMarketingHome) return;
    const mapped = HUB_TO_HERO_MODE[activeHub];
    if (mapped) setMode(mapped);
  }, [activeHub, isMarketingHome]);

  useEffect(() => {
    if (isMarketingHome) return;
    const onHubChange = (e: Event) => {
      const detail = (e as CustomEvent<{ hub: HubCategorySlug; condition?: "new" | "used" }>)
        .detail;
      const hub = detail?.hub;
      const mapped = hub ? HUB_TO_HERO_MODE[hub] : undefined;
      if (mapped) setMode(mapped);
      if (hub && detail?.condition) {
        setBuyContext(hub, detail.condition);
      }
    };
    window.addEventListener("motorcart:hub-change", onHubChange);
    return () => window.removeEventListener("motorcart:hub-change", onHubChange);
  }, [isMarketingHome, setBuyContext]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      query,
      setQuery,
      brand,
      setBrand,
      budget,
      setBudget,
      fuel,
      setFuel,
      city,
      setCity,
      filters,
      hasFilters,
      clearFilters,
    }),
    [mode, query, brand, budget, fuel, city, filters, hasFilters]
  );

  return <HeroSearchContext.Provider value={value}>{children}</HeroSearchContext.Provider>;
}

export function useHeroSearch() {
  const ctx = useContext(HeroSearchContext);
  if (!ctx) throw new Error("useHeroSearch must be used within HeroSearchProvider");
  return ctx;
}

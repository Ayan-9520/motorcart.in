import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { HeroSearchFilters, HeroSearchMode } from "@/features/home/data/homepage-data";

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

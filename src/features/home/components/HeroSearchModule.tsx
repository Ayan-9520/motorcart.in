import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HERO_CATEGORY_LINKS,
  HERO_CONDITION_OPTIONS,
  HERO_VEHICLE_CATEGORIES,
  getHeroBrowsePath,
  getHeroHubPath,
  isHeroVehicleCategory,
  type HeroCategoryId,
  type HeroCondition,
  type HeroVehicleType,
  SEARCH_BRANDS,
  SEARCH_BUDGETS,
  SEARCH_FUEL,
  SEARCH_CITIES,
  AI_SUGGESTIONS,
  TRENDING_SEARCHES,
  RECENT_SEARCHES,
} from "@/features/home/data/homepage-data";
import { cn } from "@/lib/utils";

const DEFAULT_VEHICLE: HeroVehicleType = "cars";

function getServicePath(categoryId: HeroCategoryId): string {
  switch (categoryId) {
    case "auctions":
      return "/auctions";
    case "loans":
      return "/finance";
    case "services":
      return "/services";
    case "parts":
      return "/parts";
    default:
      return "/vehicles";
  }
}

export function HeroSearchModule() {
  const [activeCategoryId, setActiveCategoryId] = useState<HeroCategoryId>("cars");
  const [condition, setCondition] = useState<HeroCondition>("new");
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState(SEARCH_BRANDS[0]);
  const [budget, setBudget] = useState(SEARCH_BUDGETS[0]);
  const [fuel, setFuel] = useState(SEARCH_FUEL[0]);
  const [city, setCity] = useState(SEARCH_CITIES[0]);

  const activeItem = HERO_CATEGORY_LINKS.find((c) => c.id === activeCategoryId) ?? HERO_CATEGORY_LINKS[0];
  const isVehicle = isHeroVehicleCategory(activeItem);
  const vehicleType = isVehicle ? activeItem.vehicleType : DEFAULT_VEHICLE;
  const categoryLabel = activeItem.tab;

  const searchPath = isVehicle
    ? getHeroBrowsePath(vehicleType, condition, query)
    : getServicePath(activeCategoryId);

  const handleCategorySelect = (id: HeroCategoryId) => {
    setActiveCategoryId(id);
    const item = HERO_CATEGORY_LINKS.find((c) => c.id === id);
    if (item && isHeroVehicleCategory(item)) {
      setCondition("new");
    }
  };

  return (
    <div className="hero-search-module space-y-4">
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {HERO_CATEGORY_LINKS.map((item) => {
          const Icon = item.icon;
          const isActive = activeCategoryId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              title={item.label}
              onClick={() => handleCategorySelect(item.id)}
              className={cn("hero-category-link", isActive && "hero-category-link-active")}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11",
                  isActive ? "bg-primary-foreground/15" : "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" strokeWidth={isActive ? 2.25 : 2} />
              </span>
              <span className="text-[10px] font-semibold leading-none sm:text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-[var(--shadow-card)]">
        {isVehicle && (
          <div className="border-b border-border bg-muted/30 p-3 dark:bg-muted/20">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {categoryLabel} — choose condition
            </p>
            <div className="grid grid-cols-2 gap-2">
              {HERO_CONDITION_OPTIONS.map((opt) => {
                const OptIcon = opt.icon;
                const isNew = opt.id === "new";
                const hubPath = getHeroHubPath(vehicleType, opt.id);
                const active = condition === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCondition(opt.id)}
                    className={cn("hero-condition-card", active && "hero-condition-card-active")}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg",
                          active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        )}
                      >
                        <OptIcon className="h-4 w-4" />
                      </span>
                      <Link
                        to={hubPath}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] font-medium text-primary hover:underline"
                      >
                        Hub <ArrowRight className="inline h-3 w-3" />
                      </Link>
                    </span>
                    <span className="mt-2 text-sm font-bold text-foreground">
                      {isNew ? `New ${categoryLabel}` : `Pre-Owned ${categoryLabel}`}
                    </span>
                    <span className="text-[11px] leading-snug text-muted-foreground">{opt.description}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 border-b border-border p-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-primary)]">
            <Search className="h-5 w-5" />
          </span>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isVehicle
                ? `Search ${condition === "new" ? "new" : "pre-owned"} ${categoryLabel.toLowerCase()} — brand, model...`
                : `Search ${categoryLabel.toLowerCase()}...`
            }
            className="h-11 flex-1 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
          />
          <Button size="lg" className="hidden shrink-0 rounded-xl sm:flex" asChild>
            <Link to={searchPath}>Search</Link>
          </Button>
        </div>

        {isVehicle && (
          <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
            {[
              { label: "Brand", value: brand, options: SEARCH_BRANDS, set: setBrand },
              { label: "Budget", value: budget, options: SEARCH_BUDGETS, set: setBudget },
              { label: "Fuel", value: fuel, options: SEARCH_FUEL, set: setFuel },
              { label: "City", value: city, options: SEARCH_CITIES, set: setCity },
            ].map((f) => (
              <label key={f.label} className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </span>
                <select
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="mc-input h-9 w-full cursor-pointer text-xs"
                >
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}

        <Button size="lg" className="mx-3 mb-3 w-[calc(100%-1.5rem)] rounded-xl sm:hidden" asChild>
          <Link to={searchPath}>
            Search {isVehicle ? `${condition === "new" ? "new" : "used"} ${categoryLabel}` : categoryLabel}
          </Link>
        </Button>
      </div>

      {isVehicle && (
        <p className="text-center text-[11px] text-muted-foreground">
          {HERO_VEHICLE_CATEGORIES.length} vehicle categories · New &amp; certified pre-owned on Motorcart
        </p>
      )}

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI suggestions
          </span>
          {AI_SUGGESTIONS.map((s) => (
            <Link
              key={s}
              to={
                isVehicle
                  ? getHeroBrowsePath(vehicleType, condition, s)
                  : `/vehicles?q=${encodeURIComponent(s)}`
              }
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {s}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-xs sm:flex-row sm:flex-wrap sm:gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-muted-foreground">Trending:</span>
            {TRENDING_SEARCHES.map((t) => (
              <Link
                key={t}
                to={
                  isVehicle
                    ? getHeroBrowsePath(vehicleType, condition, t)
                    : `/vehicles?q=${encodeURIComponent(t)}`
                }
                className="text-foreground hover:text-primary"
              >
                {t}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Recent:</span>
            {RECENT_SEARCHES.map((r) => (
              <Link
                key={r}
                to={
                  isVehicle
                    ? getHeroBrowsePath(vehicleType, condition, r)
                    : `/vehicles?q=${encodeURIComponent(r)}`
                }
                className="text-muted-foreground hover:text-primary"
              >
                {r}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

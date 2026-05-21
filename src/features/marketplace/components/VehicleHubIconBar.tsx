import { useLocation, useNavigate } from "react-router-dom";
import {
  Bike,
  Bus,
  Car,
  CarTaxiFront,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PRIMARY_VEHICLE_HUBS,
  hubEcosystemPath,
  resolveHubMarketplacePath,
  useVehicleHubStore,
} from "@/store/vehicleHubStore";
import type { EcosystemHubSlug } from "@/features/ecosystem/types";
import type { HubCategorySlug } from "../types";
import { hubCategoryLabel } from "../lib/route-utils";
import { getHubCopy } from "../data/marketplace-hub-config";

const HUB_ICONS: Record<HubCategorySlug, LucideIcon> = {
  cars: Car,
  bikes: Bike,
  trucks: Truck,
  buses: Bus,
  auto: CarTaxiFront,
  equipment: Truck,
  ev: Car,
};

type VehicleHubIconBarProps = {
  /** inline = compact strip beside logo in navbar row 1 */
  variant?: "nav" | "page" | "inline";
  className?: string;
  onNavigate?: () => void;
};

export function VehicleHubIconBar({
  variant = "page",
  className,
  onNavigate,
}: VehicleHubIconBarProps) {
  const activeHub = useVehicleHubStore((s) => s.activeHub);
  const setActiveHub = useVehicleHubStore((s) => s.setActiveHub);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onSelect = (hub: EcosystemHubSlug) => {
    setActiveHub(hub);
    const target = pathname.startsWith("/buy") || pathname.startsWith("/sell")
      ? resolveHubMarketplacePath(pathname, hub)
      : hubEcosystemPath(hub);
    navigate(target);
    window.dispatchEvent(new CustomEvent("motorcart:hub-change", { detail: { hub } }));
    onNavigate?.();
  };

  const isSellContext = pathname.startsWith("/sell");
  const activeFromPath = pathname.split("/")[1] as EcosystemHubSlug | undefined;

  return (
    <nav
      className={cn(
        "vehicle-hub-icon-bar",
        variant === "nav" && "vehicle-hub-icon-bar-nav",
        variant === "inline" && "vehicle-hub-icon-bar-inline",
        variant === "page" && "vehicle-hub-icon-bar-page",
        className
      )}
      aria-label="Vehicle ecosystems"
    >
      {PRIMARY_VEHICLE_HUBS.map((hub) => {
        const Icon = HUB_ICONS[hub];
        const isActive = activeHub === hub || activeFromPath === hub;
        const copy = getHubCopy(hub);
        const title = isSellContext
          ? `Sell ${copy.plural.toLowerCase()} — Motorcart`
          : `Buy ${copy.plural.toLowerCase()} — new & pre-owned`;

        return (
          <button
            key={hub}
            type="button"
            title={title}
            onClick={() => onSelect(hub)}
            aria-pressed={isActive}
            aria-label={title}
            className={cn("vehicle-hub-icon-btn", isActive && "vehicle-hub-icon-btn-active")}
          >
            <span className="vehicle-hub-icon-glyph">
              <Icon
                className={
                  variant === "inline" ? "h-3.5 w-3.5" : variant === "nav" ? "h-4 w-4" : "h-5 w-5"
                }
                strokeWidth={
                  variant === "inline"
                    ? isActive
                      ? 2.25
                      : 1.75
                    : variant === "nav"
                      ? isActive
                        ? 2.25
                        : 1.75
                      : isActive
                        ? 2.35
                        : 1.85
                }
              />
            </span>
            <span className="vehicle-hub-icon-label">{hubCategoryLabel(hub)}</span>
            {variant === "page" && (
              <span className="vehicle-hub-icon-hint">
                {isSellContext ? "Sell" : "Buy · Sell"}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

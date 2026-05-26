import { Link, useSearchParams } from "react-router-dom";
import {
  Wrench,
  Hammer,
  Droplets,
  Shield,
  Sparkles,
  Wind,
  Battery,
  CircleDot,
  FileText,
  FileBadge,
  Circle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_CATEGORIES, type ServiceCategorySlug } from "../types";
import { servicesBrowsePath, servicesCategoryPath } from "../data/services-hub-data";
import { parseVehicleHubParam } from "@/lib/vehicle-hub-catalog";
import { useMemo } from "react";

const ICONS: Record<string, LucideIcon> = {
  Wrench,
  Hammer,
  Droplets,
  Shield,
  Sparkles,
  Wind,
  Battery,
  CircleDot,
  FileText,
  FileBadge,
};

interface ServicesCategoryRailProps {
  active?: ServiceCategorySlug | "all";
}

export function ServicesCategoryRail({ active = "all" }: ServicesCategoryRailProps) {
  const [params] = useSearchParams();
  const hub = useMemo(() => parseVehicleHubParam(params.get("hub")), [params]);

  return (
    <nav className="services-category-rail" aria-label="Service categories">
      <Link
        to={servicesBrowsePath({ hub: hub ?? undefined })}
        className={cn(
          "services-category-pill",
          active === "all" && "services-category-pill-active"
        )}
      >
        All
      </Link>
      {SERVICE_CATEGORIES.map((c) => {
        const Icon = ICONS[c.icon] ?? Circle;
        return (
          <Link
            key={c.slug}
            to={servicesCategoryPath(c.slug, hub)}
            className={cn(
              "services-category-pill gap-1.5",
              active === c.slug && "services-category-pill-active"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {c.label}
          </Link>
        );
      })}
    </nav>
  );
}

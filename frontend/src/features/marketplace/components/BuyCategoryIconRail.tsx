import { Link } from "react-router-dom";
import {
  Bike,
  Bus,
  Car,
  CarTaxiFront,
  Tractor,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { HubCategoryItem } from "../types";

const ICONS: Record<string, LucideIcon> = {
  Car,
  Bike,
  Truck,
  Bus,
  CarTaxiFront,
  Tractor,
  Zap,
};

/** All 7 categories visible at once — premium icon strip */
export function BuyCategoryIconRail({ categories }: { categories: HubCategoryItem[] }) {
  return (
    <nav className="buy-icon-rail" aria-label="All vehicle categories">
      {categories.map((item) => {
        const Icon = ICONS[item.icon] ?? Car;
        return (
          <a key={item.id} href={`#category-${item.id}`} className="buy-icon-rail-item group">
            <span className="buy-icon-rail-circle">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="buy-icon-rail-label">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

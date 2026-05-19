import {
  Bike,
  Car,
  CarFront,
  Landmark,
  RefreshCw,
  Shield,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { FinanceHubCategoryItem } from "../data/finance-hub-categories";

const ICONS: Record<string, LucideIcon> = {
  Car,
  CarFront,
  Bike,
  Truck,
  Zap,
  RefreshCw,
  Shield,
  Landmark,
};

export function FinanceIconRail({ categories }: { categories: FinanceHubCategoryItem[] }) {
  return (
    <nav className="buy-icon-rail finance-icon-rail" aria-label="Finance categories">
      {categories.map((item) => {
        const Icon = ICONS[item.icon] ?? Car;
        return (
          <a key={item.id} href={`#finance-${item.id}`} className="buy-icon-rail-item group">
            <span className="buy-icon-rail-circle finance-icon-rail-circle">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="buy-icon-rail-label">{item.label.split(" ")[0]}</span>
          </a>
        );
      })}
    </nav>
  );
}

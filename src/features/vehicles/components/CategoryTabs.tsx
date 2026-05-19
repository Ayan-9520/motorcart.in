import { Link, useLocation } from "react-router-dom";
import { Car, CarFront, Bike, Truck, Bus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VehicleCategory } from "@/types/vehicle";

const CATEGORIES: { id: VehicleCategory | "all"; label: string; icon: React.ElementType; href: string }[] = [
  { id: "all", label: "All", icon: Car, href: "/vehicles" },
  { id: "new-cars", label: "New Cars", icon: CarFront, href: "/new-cars/browse" },
  { id: "used-cars", label: "Certified Used", icon: Car, href: "/used-cars/browse" },
  { id: "bikes", label: "Bikes", icon: Bike, href: "/vehicles/bikes" },
  { id: "trucks", label: "Trucks", icon: Truck, href: "/vehicles/trucks" },
  { id: "buses", label: "Buses", icon: Bus, href: "/vehicles/buses" },
  { id: "ev", label: "EV", icon: Zap, href: "/vehicles/ev" },
];

export function CategoryTabs() {
  const { pathname } = useLocation();
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((cat) => {
        const active = cat.id === "all" ? pathname === "/vehicles" : pathname.startsWith(cat.href);
        const Icon = cat.icon;
        return (
          <Link
            key={cat.id}
            to={cat.href}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
              active ? "bg-primary text-primary-foreground border-transparent text-white shadow-wa" : "bg-card hover:border-primary/40"
            )}
          >
            <Icon className="h-4 w-4" />
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}

import { Car, Bike } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InsuranceVehicleType } from "../types";

interface InsuranceVehicleToggleProps {
  value: InsuranceVehicleType;
  onChange: (v: InsuranceVehicleType) => void;
  className?: string;
}

export function InsuranceVehicleToggle({ value, onChange, className }: InsuranceVehicleToggleProps) {
  return (
    <div className={cn("ins-vehicle-toggle", className)}>
      {(
        [
          { id: "car" as const, label: "Car insurance", icon: Car },
          { id: "bike" as const, label: "Bike insurance", icon: Bike },
        ] as const
      ).map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn("ins-vehicle-toggle__btn", value === id && "ins-vehicle-toggle__btn--active")}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </div>
  );
}

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { INSURANCE_ADDONS } from "../data/insurance-addons";
import { PLAN_OPTIONS, POPULAR_BIKE_MODELS, POPULAR_CAR_MODELS } from "../lib/insurance-premium";
import type { InsuranceQuoteInput } from "../types";
import { cn } from "@/lib/utils";

interface InsuranceQuoteFormProps {
  input: InsuranceQuoteInput;
  onChange: (patch: Partial<InsuranceQuoteInput>) => void;
}

const CITIES = ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];

export function InsuranceQuoteForm({ input, onChange }: InsuranceQuoteFormProps) {
  const models = input.vehicleType === "bike" ? POPULAR_BIKE_MODELS : POPULAR_CAR_MODELS;

  const toggleAddon = (id: string) => {
    const next = input.addons.includes(id) ? input.addons.filter((a) => a !== id) : [...input.addons, id];
    onChange({ addons: next });
  };

  return (
    <div className="ins-quote-form space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Make</Label>
          <Input
            className="mt-1.5"
            value={input.vehicleMake}
            onChange={(e) => onChange({ vehicleMake: e.target.value })}
            list="ins-makes"
          />
          <datalist id="ins-makes">
            {models.map((m) => (
              <option key={m.make} value={m.make} />
            ))}
          </datalist>
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Model</Label>
          <Input
            className="mt-1.5"
            value={input.vehicleModel}
            onChange={(e) => onChange({ vehicleModel: e.target.value })}
          />
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Year</Label>
          <Input
            type="number"
            className="mt-1.5"
            value={input.vehicleYear}
            onChange={(e) => onChange({ vehicleYear: Number(e.target.value) })}
          />
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">City</Label>
          <select
            className="ins-select mt-1.5 w-full"
            value={input.registrationCity}
            onChange={(e) => onChange({ registrationCity: e.target.value })}
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Vehicle value (₹) — optional
          </Label>
          <Input
            type="number"
            className="mt-1.5"
            placeholder="Ex-showroom for IDV"
            value={input.vehicleValue ?? ""}
            onChange={(e) =>
              onChange({ vehicleValue: e.target.value ? Number(e.target.value) : undefined })
            }
          />
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            NCB {input.ncbPercent}%
          </Label>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            className="mt-3 w-full accent-primary"
            value={input.ncbPercent}
            onChange={(e) => onChange({ ncbPercent: Number(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Plan type</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {PLAN_OPTIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange({ planType: p.id })}
              className={cn(
                "ins-plan-pill text-left",
                input.planType === p.id && "ins-plan-pill--active"
              )}
            >
              <span className="font-semibold text-sm">{p.label}</span>
              <span className="block text-[11px] text-muted-foreground">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Add-ons</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {INSURANCE_ADDONS.filter((a) => a.vehicleTypes.includes(input.vehicleType)).map((addon) => (
            <li key={addon.id}>
              <button
                type="button"
                onClick={() => toggleAddon(addon.id)}
                className={cn(
                  "ins-addon-pill w-full text-left",
                  input.addons.includes(addon.id) && "ins-addon-pill--on"
                )}
              >
                <span className="font-medium text-sm">{addon.label}</span>
                <span className="block text-[10px] text-muted-foreground">{addon.description}</span>
                <span className="text-xs text-primary font-semibold">+₹{addon.annualCost}/yr</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

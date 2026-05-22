import { useEffect } from "react";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { usePartsSupplierOS } from "../hooks/usePartsSupplierOS";
import { setPageMeta } from "@/utils/seo";

const DEMO_FITMENTS = [
  { brand: "Hyundai", model: "Creta", variant: "SX Diesel", year: "2022", fuel: "Diesel" },
  { brand: "Kia", model: "Seltos", variant: "GTX Petrol", year: "2023", fuel: "Petrol" },
  { brand: "Hyundai", model: "Venue", variant: "SX", year: "2021–24", fuel: "Petrol" },
];

export function PartsSupplierCompatibilityPage() {
  const { data } = usePartsSupplierOS();

  useEffect(() => setPageMeta({ title: "Compatibility engine" }), []);

  return (
    <PartsSupplierShell
      title="Compatibility engine"
      description="Map OEM parts to make · model · variant · year · fuel"
    >
      <p className="mb-4 text-sm text-slate-400">
        Example: Bosch Brake Pad — compatible vehicles
      </p>
      <div className="psp-compat-grid">
        {DEMO_FITMENTS.map((f) => (
          <div key={`${f.brand}-${f.model}`} className="psp-compat-card">
            <p className="font-semibold text-green-300">
              {f.brand} {f.model}
            </p>
            <p className="text-sm text-slate-300">{f.variant}</p>
            <p className="mt-1 text-xs text-slate-500">
              {f.year} · {f.fuel}
            </p>
          </div>
        ))}
      </div>
      <div className="psp-panel mt-6">
        <h3 className="psp-panel__title">Catalogue fitment</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {(data?.catalog ?? []).slice(0, 4).map((p) => (
            <li key={p.id} className="border-b border-slate-800/80 pb-2">
              <span className="font-medium">{p.name}</span>
              <p className="text-xs text-slate-500">{p.compatibility.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </PartsSupplierShell>
  );
}

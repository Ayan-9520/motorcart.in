import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PARTS_VEHICLE_CHIPS, partsBrowsePath } from "../data/parts-hub-data";

export function PartsHubHero() {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState("All vehicles");
  const [query, setQuery] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(partsBrowsePath({ q: query.trim() || undefined, vehicle }));
  };

  return (
    <section className="parts-hub-hero">
      <div className="container">
        <p className="parts-hub-eyebrow">Motorcart Parts · B2B &amp; retail</p>
        <h1 className="parts-hub-title">
          India&apos;s <span className="text-primary">fintech-grade</span> parts marketplace
        </h1>
        <p className="parts-hub-subtitle">
          OEM &amp; aftermarket — GST invoices, wholesale pricing, COD, same-day metro &amp; WhatsApp bulk checkout
        </p>

        <form onSubmit={onSearch} className="parts-hub-search">
          <div className="parts-hub-search-vehicle">
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="parts-hub-select"
              aria-label="Vehicle"
            >
              {PARTS_VEHICLE_CHIPS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div className="parts-hub-search-input">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search part name, SKU, brand…"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <Button type="submit" className="parts-hub-search-btn h-12 rounded-xl px-8 font-semibold">
            Search parts
          </Button>
        </form>
      </div>
    </section>
  );
}

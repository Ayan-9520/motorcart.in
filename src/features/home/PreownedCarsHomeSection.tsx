import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PreownedCarCard } from "@/features/preowned-cars/components/PreownedCarCard";
import { getFeaturedPreowned } from "@/features/preowned-cars/services/preowned-cars.service";
import { TRUST_BADGES } from "@/features/preowned-cars/data/preowned-data";
import { SectionHeader } from "./SectionHeader";

export function PreownedCarsHomeSection() {
  const featured = getFeaturedPreowned(4);

  return (
    <section className="home-section-alt">
      <div className="container home-stack">
        <SectionHeader
          eyebrow="Certified used"
          title="Inspected pre-owned you can trust"
          description="AI fair price, 200+ point reports, warranty & loan-ready inventory from verified dealers."
          href="/used-cars"
          linkLabel="Used cars hub"
        />
        <div className="flex flex-wrap gap-1.5">
          {TRUST_BADGES.map((b) => (
            <span
              key={b.id}
              className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[10px] font-semibold text-foreground"
            >
              {b.label}
            </span>
          ))}
        </div>
        <div className="vehicle-card-grid">
          {featured.map((v, i) => (
            <PreownedCarCard key={v.id} vehicle={v} index={i} compact />
          ))}
        </div>
        <div className="text-center">
          <Button size="sm" className="home-section-cta rounded-lg" asChild>
            <Link to="/used-cars/browse">
              Browse certified used <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

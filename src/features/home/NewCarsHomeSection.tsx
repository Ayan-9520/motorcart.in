import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewCarCard } from "@/features/new-cars/components/NewCarCard";
import { getFeaturedNewCars } from "@/features/new-cars/services/new-cars.service";
import { NEW_CAR_BRANDS } from "@/features/new-cars/data/new-cars-data";
import { SectionHeader } from "./SectionHeader";

export function NewCarsHomeSection() {
  const featured = getFeaturedNewCars(4);

  return (
    <section className="home-section">
      <div className="container mx-auto space-y-8 px-4">
        <SectionHeader
          eyebrow="New cars"
          title="Latest models & launch offers"
          description="On-road price, EMI, test drives and OEM dealer offers — AI compared for you."
          href="/new-cars"
          linkLabel="New cars hub"
        />
        <div className="partner-scroll flex gap-2 pb-1">
          {NEW_CAR_BRANDS.slice(0, 8).map((b) => (
            <Link key={b.slug} to={b.href} className="partner-pill hover:text-primary">
              {b.name}
            </Link>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((v, i) => (
            <NewCarCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" className="rounded-xl" asChild>
            <Link to="/new-cars/browse">
              Browse all new cars <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

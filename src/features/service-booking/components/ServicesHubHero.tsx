import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarClock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { servicesBrowsePath } from "../data/services-hub-data";

interface ServicesHubHeroProps {
  centersCount: number;
  servicesCount: number;
  loading?: boolean;
}

export function ServicesHubHero({ centersCount, servicesCount, loading }: ServicesHubHeroProps) {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(servicesBrowsePath({ city: city.trim() || undefined }));
  };

  return (
    <section className="services-hub-hero">
      <div className="container">
        <div className="services-hub-hero-grid">
          <div className="services-hub-hero-copy">
            <span className="services-hub-badge">Live slots · Pickup &amp; drop</span>
            <h1 className="services-hub-title">
              Service booking, <span className="text-primary">reimagined</span>
            </h1>
            <p className="services-hub-subtitle">
              Verified centers, real-time slots, OTP handover, live tracking &amp; WhatsApp updates — fintech-grade
              checkout for your vehicle.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="rounded-xl shadow-[var(--shadow-primary)]" asChild>
                <Link to="/services/my-bookings">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  My bookings
                </Link>
              </Button>
              <Button variant="outline" className="rounded-xl" asChild>
                <Link to={servicesBrowsePath()}>Browse catalog</Link>
              </Button>
            </div>
          </div>

          <form onSubmit={onSearch} className="services-hub-search-card">
            <p className="text-sm font-semibold text-foreground">Where is your vehicle?</p>
            <div className="services-hub-search-row">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. Bangalore)"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                onKeyDown={(e) => e.key === "Enter" && onSearch(e as unknown as React.FormEvent)}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              OTP verifies handover at the service bay.
            </p>
            <Button type="submit" className="w-full rounded-xl font-semibold">
              Find centers
            </Button>
            <div className="services-hub-search-stats">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Today near you</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{loading ? "—" : `${centersCount} centers`}</p>
              <p className="text-sm text-muted-foreground">
                {loading ? "—" : `${servicesCount} bookable services`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

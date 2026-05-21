import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setPageMeta } from "@/utils/seo";
import { useServiceMarketplace } from "../hooks/useServiceMarketplace";
import { ServicesHubHero } from "../components/ServicesHubHero";
import { ServicesFintechStrip } from "../components/ServicesFintechStrip";
import { ServicesCategoryCard } from "../components/ServicesCategoryCard";
import { ServiceCenterCard } from "../components/ServiceCenterCard";
import { ServiceCatalogCard } from "../components/ServiceCatalogCard";
import { SERVICE_CATEGORIES, SERVICES_TRUST_STATS, HOW_IT_WORKS, servicesBrowsePath } from "../data/services-hub-data";
import { parseVehicleHubParam } from "@/lib/vehicle-hub-catalog";

export function ServicesHubPage() {
  const [params] = useSearchParams();
  const hub = useMemo(() => parseVehicleHubParam(params.get("hub")), [params]);
  const { centers, catalog, loading } = useServiceMarketplace();

  useEffect(() => {
    setPageMeta({
      title: "Book Automotive Services — Motorcart",
      description:
        "Servicing, PPF, ceramic, AC, tyres, insurance & RC — verified centers with live slots, pickup & OTP handover.",
    });
  }, []);

  return (
    <div className="services-hub-page min-h-screen">
      <ServicesHubHero
        centersCount={centers.length}
        servicesCount={catalog.length}
        loading={loading}
      />

      <div className="container -mt-2 mb-6 flex flex-wrap justify-center gap-3">
        {SERVICES_TRUST_STATS.map(({ label, sub }) => (
          <span key={sub} className="services-hub-stat-pill">
            <strong>{label}</strong> {sub}
          </span>
        ))}
      </div>

      <ServicesFintechStrip />

      <section className="container pb-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="services-hub-section-title">Service categories</h2>
            <p className="mt-1 text-sm text-muted-foreground">10 bookable verticals · transparent pricing</p>
          </div>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to={servicesBrowsePath({ hub: hub ?? undefined })}>
              All services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="services-hub-category-grid">
          {SERVICE_CATEGORIES.map((cat) => (
            <ServicesCategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      <section className="container border-t border-border/80 pb-10 pt-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="services-hub-section-title">Verified centers near you</h2>
            <p className="mt-1 text-sm text-muted-foreground">Ratings, pickup &amp; live slot availability</p>
          </div>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to={servicesBrowsePath({ hub: hub ?? undefined })}>View all centers</Link>
          </Button>
        </div>
        {loading ? (
          <div className="services-centers-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-56 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="services-centers-grid">
            {centers.slice(0, 3).map((c, i) => (
              <ServiceCenterCard key={c.id} center={c} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="container pb-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="services-hub-section-title">Popular services</h2>
            <p className="mt-1 text-sm text-muted-foreground">Book a slot in under 2 minutes</p>
          </div>
        </div>
        {loading ? (
          <div className="services-catalog-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-44 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="services-catalog-grid">
            {catalog.slice(0, 6).map((s, i) => (
              <ServiceCatalogCard key={s.id} service={s} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="container pb-14">
        <h2 className="services-hub-section-title mb-6 text-center">How it works</h2>
        <ol className="services-how-grid">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.step} className="services-how-step">
              <span className="services-how-num">{step.step}</span>
              <h3 className="font-bold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
        <div className="services-hub-footer-cta mt-10 text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            List your workshop on Motorcart — reach thousands of verified vehicle owners &amp; fleet operators
          </p>
          <Button className="rounded-xl shadow-[var(--shadow-primary)]" asChild>
            <Link to="/dashboard/service-hub">Partner with us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

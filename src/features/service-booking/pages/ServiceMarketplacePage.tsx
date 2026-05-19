import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  ArrowRight,
  CalendarClock,
  Wrench,
  Hammer,
  Droplets,
  Shield,
  Sparkles,
  Wind,
  Battery,
  CircleDot,
  FileText,
  FileBadge,
  Circle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useServiceMarketplace } from "../hooks/useServiceMarketplace";
import { SERVICE_CATEGORIES } from "../types";
import type { ServiceCategorySlug } from "../types";

const ICON_MAP: Record<string, typeof Wrench> = {
  Wrench,
  Hammer,
  Droplets,
  Shield,
  Sparkles,
  Wind,
  Battery,
  CircleDot,
  FileText,
  FileBadge,
};

function CategoryIcon({ name }: { name: string }) {
  const C = ICON_MAP[name] ?? Circle;
  return <C className="h-5 w-5" />;
}

export function ServiceMarketplacePage() {
  const navigate = useNavigate();
  const { centers, catalog, loading, categoryFilter } = useServiceMarketplace();

  const filteredCatalog = useMemo(() => {
    if (!categoryFilter) return catalog;
    return catalog.filter((s) => s.serviceType === categoryFilter);
  }, [catalog, categoryFilter]);

  useEffect(() => {
    setPageMeta({
      title: "Book Automotive Services — Motorcart.in",
      description: "Servicing, denting & painting, PPF, ceramic, AC, tyres, insurance & RC — book slots with verified centers.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden border-b border-border">
        <div className="container relative mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge className="border-primary/40 bg-primary/10 text-primary">Live slots · Pickup & drop</Badge>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Service booking, <span className="text-primary">reimagined</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Choose a verified center, lock a slot, track your job in real time, pay securely, and get WhatsApp updates — like ride-hailing, for your car.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="bg-primary text-primary-foreground hover:bg-[#1ebe5d]" asChild>
                  <Link to="/services/my-bookings">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    My bookings
                  </Link>
                </Button>
                <Button variant="outline" className="border-border text-white hover:bg-accent" asChild>
                  <a href="#catalog">Browse catalog</a>
                </Button>
              </div>
            </div>
            <Card className="border-border bg-card/80 shadow-2xl backdrop-blur">
              <CardContent className="space-y-4 p-6">
                <p className="text-sm font-medium text-muted-foreground">Where is your vehicle?</p>
                <Input
                  placeholder="City (e.g. Bangalore)"
                  className="border-border bg-background"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const v = (e.target as HTMLInputElement).value.trim();
                      if (v) navigate(`/services?city=${encodeURIComponent(v)}`);
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">Press Enter to filter centers. OTP verifies handover at the bay.</p>
                <div className="rounded-xl border border-border bg-background/50 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Today near you</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{loading ? "—" : `${centers.length} centers`}</p>
                  <p className="text-sm text-muted-foreground">{filteredCatalog.length} bookable services in view</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-card/40 py-8">
        <div className="container mx-auto px-4">
          <p className="text-sm font-medium text-muted-foreground">Service categories</p>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            <Link to="/services">
              <Badge variant="outline" className={`shrink-0 cursor-pointer border-border ${!categoryFilter ? "border-primary bg-primary/10 text-primary" : ""}`}>
                All
              </Badge>
            </Link>
            {SERVICE_CATEGORIES.map((c) => (
              <Link key={c.slug} to={`/services?category=${c.slug}`}>
                <Badge
                  variant="outline"
                  className={`shrink-0 cursor-pointer gap-1 border-border px-3 py-1.5 ${
                    categoryFilter === c.slug ? "border-primary bg-primary/10 text-primary" : ""
                  }`}
                >
                  <CategoryIcon name={c.icon} />
                  {c.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto space-y-12 px-4 py-12" id="catalog">
        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Verified centers</h2>
              <p className="text-sm text-muted-foreground">Profiles, ratings, and pickup & drop availability</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl bg-muted" />)
              : centers.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/services/centers/${c.slug}`}>
                      <Card className="h-full border-border bg-card transition-colors hover:border-primary/40">
                        <CardContent className="flex flex-col gap-3 p-5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-foreground">{c.name}</h3>
                            {c.pickupDropAvailable && (
                              <Badge className="shrink-0 bg-primary/15 text-primary">Pickup</Badge>
                            )}
                          </div>
                          <p className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            {c.city}, {c.state}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-amber-400">
                            <Star className="h-4 w-4 fill-amber-400" />
                            {c.rating.toFixed(1)} · {c.reviewCount} reviews
                          </div>
                          <span className="text-xs text-primary">View profile & book →</span>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Book a service</h2>
          <p className="text-sm text-muted-foreground">Transparent pricing from · slot in checkout</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl bg-muted" />)
              : filteredCatalog.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <Card className="border-border bg-card">
                      <CardContent className="flex h-full flex-col gap-3 p-5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{(s.serviceType as ServiceCategorySlug) || s.serviceType}</p>
                            <h3 className="font-semibold text-foreground">{s.name}</h3>
                          </div>
                        </div>
                        {s.description && <p className="line-clamp-2 text-sm text-muted-foreground">{s.description}</p>}
                        <p className="text-sm font-medium text-primary">
                          From {formatCurrency(s.priceFrom)}
                          {s.priceTo != null ? ` – ${formatCurrency(s.priceTo)}` : ""}
                        </p>
                        <Button size="sm" className="mt-auto w-full bg-primary text-primary-foreground hover:bg-[#1ebe5d]" asChild>
                          <Link to={`/services/book/${s.id}`}>
                            Book slot <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewCarCard } from "../components/NewCarCard";
import {
  NEW_CAR_BRANDS,
  NEW_CAR_COLLECTIONS,
  NEW_CAR_STATS,
  NEW_CARS_TAGLINE,
} from "../data/new-cars-data";
import { getFeaturedNewCars, getNewlyLaunched } from "../services/new-cars.service";
import { setPageMeta } from "@/utils/seo";

export function NewCarsHubPage() {
  const featured = getFeaturedNewCars(8);
  const launched = getNewlyLaunched(6);

  useEffect(() => {
    setPageMeta({
      title: "New Cars",
      description: NEW_CARS_TAGLINE,
    });
  }, []);

  return (
    <div className="wa-pattern min-h-screen">
      <section className="border-b border-border bg-card">
        <div className="container mx-auto space-y-6 px-4 py-10 md:py-14">
          <Badge className="border-primary/30 bg-primary/10 text-primary">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            OEM-integrated · AI pricing
          </Badge>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            New Cars — <span className="text-primary">on-road price, EMI & test drives</span>
          </h1>
          <p className="max-w-2xl text-muted-foreground md:text-lg">{NEW_CARS_TAGLINE}</p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="rounded-xl" asChild>
              <Link to="/new-cars/browse">
                Browse all new cars <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl" asChild>
              <Link to="/finance/apply">Check loan eligibility</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {NEW_CAR_STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-background p-3 text-center">
                <p className="text-lg font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container mx-auto space-y-6 px-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold">Popular brands</h2>
            <Link to="/new-cars/browse" className="text-sm font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {NEW_CAR_BRANDS.map((b) => (
              <Link
                key={b.slug}
                to={b.href}
                className="rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]"
              >
                <p className="font-semibold text-foreground">{b.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{b.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section-alt">
        <div className="container mx-auto space-y-8 px-4">
          <h2 className="text-2xl font-bold">Shop by segment</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NEW_CAR_COLLECTIONS.map((c) => (
              <Link
                key={c.id}
                to={c.href}
                className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]"
              >
                <h3 className="font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container mx-auto space-y-6 px-4">
          <h2 className="text-2xl font-bold">Newly launched</h2>
          <div className="partner-scroll flex gap-4 pb-2">
            {launched.map((v, i) => (
              <div key={v.id} className="w-[280px] shrink-0 sm:w-[300px]">
                <NewCarCard vehicle={v} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section-alt">
        <div className="container mx-auto space-y-6 px-4">
          <h2 className="text-2xl font-bold">Featured new cars</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v, i) => (
              <NewCarCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

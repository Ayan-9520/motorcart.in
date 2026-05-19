import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setPageMeta } from "@/utils/seo";
import { DealerNetworkCard } from "../components/DealerNetworkCard";
import { useDealerDirectory } from "../hooks/useDealerDirectory";
import { DEALER_CATEGORIES, DEALER_CITY_OPTIONS, dealersBrowsePath } from "../data/dealers-hub-data";
import type { DealerVertical } from "../types";

export function DealersBrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dealers, filters, total } = useDealerDirectory();
  const [q, setQ] = useState(filters.q);
  const [city, setCity] = useState(filters.city || "All cities");

  useEffect(() => {
    setPageMeta({
      title: "Dealer Directory — Motorcart",
      description: "Search verified automotive dealers by city, vertical and brand on Motorcart.in",
    });
  }, []);

  const vertical = (searchParams.get("vertical") as DealerVertical | null) ?? "";
  const verifiedOnly = searchParams.get("verified") === "1";

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (q.trim()) next.set("q", q.trim());
    else next.delete("q");
    if (city && city !== "All cities") next.set("city", city);
    else next.delete("city");
    setSearchParams(next);
  };

  const setVertical = (v: DealerVertical | "") => {
    const next = new URLSearchParams(searchParams);
    if (v) next.set("vertical", v);
    else next.delete("vertical");
    setSearchParams(next);
  };

  const toggleVerified = () => {
    const next = new URLSearchParams(searchParams);
    if (verifiedOnly) next.delete("verified");
    else next.set("verified", "1");
    setSearchParams(next);
  };

  return (
    <div className="dealers-hub-page min-h-screen">
      <section className="dealers-catalog-hero border-b border-border/60 py-8">
        <div className="container">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 rounded-lg" asChild>
            <Link to="/dealers">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Dealer network
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dealer directory</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {dealers.length} of {total}+ partners match your filters
          </p>

          <form onSubmit={applyFilters} className="dealers-hub-search mt-6 max-w-3xl">
            <div className="dealers-hub-search-row flex-1">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search dealers…"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="dealers-hub-select rounded-xl border border-border/60 bg-card px-3 py-2 text-sm"
              aria-label="City"
            >
              {DEALER_CITY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Button type="submit" className="dealers-hub-search-btn rounded-xl px-6">
              Search
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={verifiedOnly ? "default" : "outline"}
              className="rounded-full"
              onClick={toggleVerified}
            >
              <SlidersHorizontal className="mr-1 h-3.5 w-3.5" />
              Verified only
            </Button>
            <Button
              type="button"
              size="sm"
              variant={!vertical ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setVertical("")}
            >
              All
            </Button>
            {DEALER_CATEGORIES.map((c) => (
              <Button
                key={c.slug}
                type="button"
                size="sm"
                variant={vertical === c.slug ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setVertical(c.slug)}
              >
                {c.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-10">
        {dealers.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No dealers match. Try another city or clear filters.
          </p>
        ) : (
          <div className="dealers-network-grid">
            {dealers.map((d, i) => (
              <DealerNetworkCard key={d.id} dealer={d} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUCTION_HUB_STATES } from "../data/auction-hub-data";
import { auctionBrowsePath } from "../lib/auction-hub-routes";

export function AuctionHubHero() {
  const navigate = useNavigate();
  const [state, setState] = useState("All States");
  const [query, setQuery] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(auctionBrowsePath({ q: query.trim() || undefined, state }));
  };

  return (
    <section className="auction-hub-hero">
      <div className="container">
        <p className="auction-hub-eyebrow">Motorcart Auctions</p>
        <h1 className="auction-hub-title">
          India&apos;s largest <span className="text-primary">phygital</span> marketplace
        </h1>
        <p className="auction-hub-subtitle">
          Pre-owned vehicles, equipment &amp; assets — physical yards, online halls &amp; hybrid bidding
        </p>

        <form onSubmit={onSearch} className="auction-hub-search">
          <div className="auction-hub-search-state">
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="auction-hub-select"
              aria-label="Select state"
            >
              {AUCTION_HUB_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="auction-hub-search-input">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search inventory, lot no., make & model…"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <Button type="submit" className="auction-hub-search-btn h-12 rounded-xl px-8 font-semibold">
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}

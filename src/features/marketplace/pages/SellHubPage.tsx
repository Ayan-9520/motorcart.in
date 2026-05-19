import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { SELL_HUB_CATEGORIES } from "../data/sell-hub-categories";
import { SellCategoryCard } from "../components/SellCategoryCard";
import { parseHubCategorySlug, sellListingPath } from "../lib/route-utils";

const STEPS = [
  { title: "Choose category", desc: "Car, bike, truck, bus, auto, equipment or EV" },
  { title: "Add used vehicle details", desc: "Brand, year, kms, city — 5 minutes" },
  { title: "Get offers", desc: "Instant valuation & verified buyer calls" },
];

export function SellHubPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setPageMeta({
      title: "Sell Your Used Vehicle",
      description:
        "Sell your used car, bike, truck or more — free listing, instant valuation and verified buyers on Motorcart.",
    });
  }, []);

  useEffect(() => {
    const type = searchParams.get("type");
    const hub = parseHubCategorySlug(type ?? undefined);
    if (hub) {
      navigate(sellListingPath(hub), { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="marketplace-hub-page min-h-screen">
      <section className="marketplace-hub-hero marketplace-hub-hero-sell">
        <div className="container">
          <p className="marketplace-hub-eyebrow">Sell on Motorcart</p>
          <h1 className="marketplace-hub-title">Sell your used vehicle</h1>
          <p className="marketplace-hub-subtitle">
            Yahan sirf <strong className="text-foreground">used / pre-owned</strong> vehicles list hoti
            hain — instant valuation, RC help, aur 8,500+ verified buyers.
          </p>
        </div>
      </section>

      <section className="container pb-6">
        <ol className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="sell-step-card">
              <span className="sell-step-num">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container pb-14">
        <div className="hub-category-grid">
          {SELL_HUB_CATEGORIES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <SellCategoryCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" className="rounded-lg" asChild>
            <Link to="/dashboard/dealer">
              <Store className="mr-1.5 h-4 w-4" />
              Dealer bulk upload
            </Link>
          </Button>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            Free for individual owners
          </p>
        </div>
      </section>
    </div>
  );
}

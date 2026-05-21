import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Car,
  Gavel,
  Landmark,
  Shield,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarketingPageBody, MarketingPageShell } from "@/components/marketing/MarketingPageShell";
import { setPageMeta } from "@/utils/seo";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

const PILLARS = [
  {
    icon: Car,
    title: "Buy & sell every vehicle",
    text: "Cars, bikes, trucks, buses, auto & EV — one marketplace with verified listings and dealer CRM.",
  },
  {
    icon: Landmark,
    title: "Bank-grade finance",
    text: "Loan journeys, DSA workflows, and lender integrations built for Indian automotive retail.",
  },
  {
    icon: Gavel,
    title: "Live auctions",
    text: "Transparent bidding for dealers, fleets, and repossessed inventory with real-time intelligence.",
  },
  {
    icon: Users,
    title: "Owner community",
    text: "A separate social layer for reviews, photos, and honest vehicle talk — not mixed with dealer OS.",
  },
  {
    icon: Wrench,
    title: "Parts & service",
    text: "Workshop bookings, parts catalog, and technician tools on the same authenticated platform.",
  },
  {
    icon: Bot,
    title: "AI across the stack",
    text: "Search, recommendations, moderation, and dealer assistants trained for automotive India.",
  },
];

const STATS = [
  { value: "8,500+", label: "Dealer partners" },
  { value: "14", label: "Lender integrations" },
  { value: "128K+", label: "Community members" },
  { value: "240+", label: "Cities live" },
];

export function AboutPage() {
  useEffect(() => {
    setPageMeta({
      title: `About — ${SITE_NAME}`,
      description: SITE_TAGLINE,
    });
  }, []);

  return (
    <MarketingPageShell>
      <section className="marketing-hero marketing-hero-slim">
        <div className="marketing-hero-mesh" aria-hidden />
        <MarketingPageBody>
          <p className="marketing-eyebrow">
            <Sparkles className="h-4 w-4" />
            About Motorcart
          </p>
          <h1 className="marketing-title">
            India&apos;s <span className="text-primary">AI-powered</span> automotive ecosystem
          </h1>
          <p className="marketing-lead">{SITE_TAGLINE}</p>
          <p className="marketing-lead-sub">
            We connect dealers, lenders, service partners, and vehicle owners on one platform — from
            inventory and leads to finance, auctions, parts, and community.
          </p>
          <div className="marketing-hero-actions">
            <Button className="h-12 rounded-xl px-8 text-base font-semibold shadow-[var(--shadow-primary)]" asChild>
              <Link to="/cars">
                Explore vehicles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" className="h-12 rounded-xl px-8 text-base" asChild>
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </MarketingPageBody>
      </section>

      <section className="marketing-section marketing-section-tight">
        <MarketingPageBody>
          <div className="marketing-stats">
            {STATS.map((s) => (
              <div key={s.label} className="marketing-stat">
                <p className="marketing-stat-value">{s.value}</p>
                <p className="marketing-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </MarketingPageBody>
      </section>

      <section className="marketing-section marketing-section-muted">
        <MarketingPageBody>
          <div className="marketing-section-head">
            <h2 className="marketing-h2">What we build</h2>
            <p className="marketing-section-sub">
              One stack for every stakeholder in the vehicle lifecycle — not ten disconnected apps.
            </p>
          </div>
          <div className="marketing-grid-3">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="marketing-card h-full border-border/80">
                <CardContent className="p-6 md:p-8">
                  <span className="marketing-card-icon">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-foreground md:text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </MarketingPageBody>
      </section>

      <section className="marketing-section">
        <MarketingPageBody>
          <div className="marketing-split">
            <div className="marketing-split-copy">
              <h2 className="marketing-h2">Built for trust</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Verified dealer badges, KYC-backed accounts, AI-assisted moderation on community posts, and
                enterprise-grade access control for every workspace role — from new-car dealers to NBFC
                partners.
              </p>
              <ul className="mt-8 space-y-4 text-base text-foreground">
                <li className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  Role-based dashboards (Dealer OS, Finance, Admin, Technician)
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  Separate community profile vs. business account settings
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  Spam-safe social layer with human moderation queue
                </li>
              </ul>
            </div>
            <Card className="marketing-card-accent border-primary/20">
              <CardContent className="p-8 md:p-10 lg:p-12">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our mission</p>
                <p className="mt-5 text-lg font-medium leading-relaxed text-foreground md:text-xl">
                  Make buying, selling, financing, and servicing vehicles in India as transparent and
                  intelligent as ordering anything else online — with dealers and owners both winning.
                </p>
              </CardContent>
            </Card>
          </div>
        </MarketingPageBody>
      </section>

      <section className="marketing-cta">
        <MarketingPageBody narrow>
          <h2 className="marketing-cta-title">Ready to move with Motorcart?</h2>
          <p className="marketing-cta-text">
            List inventory, join the community, or partner as a lender — we&apos;ll help you onboard.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button className="h-12 rounded-xl px-8 text-base" asChild>
              <Link to="/signup">Create account</Link>
            </Button>
            <Button variant="outline" className="h-12 rounded-xl px-8 text-base" asChild>
              <Link to="/contact">Contact sales</Link>
            </Button>
          </div>
        </MarketingPageBody>
      </section>
    </MarketingPageShell>
  );
}

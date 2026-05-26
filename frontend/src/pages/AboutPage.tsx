import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ABOUT_MISSION,
  ABOUT_PILLARS,
  ABOUT_TRUST_POINTS,
  SITE_DESCRIPTION,
  SITE_STATS,
} from "@/content/site-content";
import { MarketingPageBody, MarketingPageShell } from "@/components/marketing/MarketingPageShell";
import { setPageMeta } from "@/utils/seo";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function AboutPage() {
  useEffect(() => {
    setPageMeta({
      title: `About — ${SITE_NAME}`,
      description: SITE_DESCRIPTION,
    });
  }, []);

  return (
    <MarketingPageShell className="site-page">
      <section className="marketing-hero marketing-hero-slim marketing-hero-editorial">
        <div className="marketing-hero-mesh" aria-hidden />
        <MarketingPageBody narrow>
          <p className="site-eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            About Motorcart
          </p>
          <h1 className="site-page-title">
            India&apos;s <span className="text-primary">AI-powered</span> automotive ecosystem
          </h1>
          <p className="site-page-lead">
            {SITE_TAGLINE}. {SITE_DESCRIPTION}
          </p>
          <div className="site-page-actions">
            <Button className="h-10 rounded-lg px-5 text-sm font-semibold shadow-sm" asChild>
              <Link to="/buy">
                Explore marketplace
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="h-10 rounded-lg px-5 text-sm" asChild>
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </MarketingPageBody>
      </section>

      <section className="marketing-section marketing-section-tight">
        <MarketingPageBody narrow>
          <div className="site-stats">
            {SITE_STATS.map((s) => (
              <div key={s.label} className="site-stat">
                <p className="site-stat-value">{s.value}</p>
                <p className="site-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </MarketingPageBody>
      </section>

      <section className="marketing-section marketing-section-muted">
        <MarketingPageBody>
          <div className="site-section-head">
            <h2 className="site-h2">What we build</h2>
            <p className="site-section-sub">
              One platform for every stakeholder in the vehicle lifecycle — not ten disconnected apps.
            </p>
          </div>
          <div className="site-pillar-grid">
            {ABOUT_PILLARS.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="site-pillar-card h-full border-border/70 shadow-sm">
                <CardContent className="p-5 md:p-6">
                  <span className="site-pillar-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="site-pillar-title">{title}</h3>
                  <p className="site-pillar-text">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </MarketingPageBody>
      </section>

      <section className="marketing-section">
        <MarketingPageBody>
          <div className="site-split">
            <div>
              <h2 className="site-h2">Built for trust</h2>
              <p className="site-body mt-3">
                Verified dealer badges, KYC-backed accounts, AI-assisted moderation, and enterprise-grade
                access control for every workspace role — from new-car dealers to NBFC partners.
              </p>
              <ul className="site-trust-list">
                {ABOUT_TRUST_POINTS.map((point) => (
                  <li key={point}>
                    <Shield className="h-4 w-4 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <Card className="site-mission-card border-primary/20 bg-gradient-to-br from-primary/5 to-card">
              <CardContent className="p-6 md:p-8">
                <p className="site-mission-label">Our mission</p>
                <p className="site-mission-quote">{ABOUT_MISSION}</p>
              </CardContent>
            </Card>
          </div>
        </MarketingPageBody>
      </section>

      <section className="site-cta">
        <MarketingPageBody narrow>
          <h2 className="site-cta-title">Ready to move with Motorcart?</h2>
          <p className="site-cta-text">
            List inventory, join the community, or partner as a lender — we&apos;ll help you onboard.
          </p>
          <div className="site-cta-actions">
            <Button className="h-10 rounded-lg px-5 text-sm" asChild>
              <Link to="/signup">Create account</Link>
            </Button>
            <Button variant="outline" className="h-10 rounded-lg px-5 text-sm" asChild>
              <Link to="/contact">Contact sales</Link>
            </Button>
          </div>
        </MarketingPageBody>
      </section>
    </MarketingPageShell>
  );
}

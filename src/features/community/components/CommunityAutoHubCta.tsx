import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommunityAutoHubCta() {
  return (
    <section className="community-premium-cta" aria-labelledby="community-hub-cta-title">
      <div className="community-premium-cta-glow" aria-hidden />
      <h2 id="community-hub-cta-title" className="community-premium-cta-title">
        Own the conversation. Grow your automotive brand.
      </h2>
      <p className="community-premium-cta-text">
        Dealers, creators, and enthusiasts — publish reviews, run promotions, and build trust with
        India&apos;s most curated auto community.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button className="h-11 gap-2 rounded-xl px-6 font-semibold shadow-[var(--shadow-primary)]" asChild>
          <Link to="/signup">
            Create business account
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" className="h-11 rounded-xl border-primary/30 px-6" asChild>
          <Link to="/community/groups">Discover groups</Link>
        </Button>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommunityAutoHubCta() {
  return (
    <section className="community-hub-cta" aria-labelledby="community-hub-cta-title">
      <h2 id="community-hub-cta-title" className="community-hub-cta-title">
        Join the AutoHub Community
      </h2>
      <p className="community-hub-cta-text">
        Connect with thousands of automotive enthusiasts, share your passion, and discover amazing
        vehicles together.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button className="community-hub-cta-btn-primary gap-2 rounded-lg" asChild>
          <Link to="/login">
            Join Community
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" className="community-hub-cta-btn-outline rounded-lg" asChild>
          <Link to="/community?tab=trending">Explore Social Feed</Link>
        </Button>
      </div>
    </section>
  );
}

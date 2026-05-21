import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { VehicleHubDefinition } from "../types";
import { hubLandingPath } from "../lib/hub-paths";

type EcosystemHubCardProps = {
  hub: VehicleHubDefinition;
};

export function EcosystemHubCard({ hub }: EcosystemHubCardProps) {
  const Icon = hub.icon;

  return (
    <Link to={hubLandingPath(hub.slug)} className="eco-hub-card group">
      <span className="eco-hub-card-icon">
        <Icon className="h-7 w-7" strokeWidth={1.65} />
      </span>
      <span className="eco-hub-card-body">
        <span className="eco-hub-card-label">{hub.label}</span>
        <span className="eco-hub-card-tagline">{hub.tagline}</span>
        <span className="eco-hub-card-meta">
          {hub.stats.listings} listings · {hub.services.length} services
        </span>
      </span>
      <ArrowRight className="eco-hub-card-arrow h-5 w-5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
    </Link>
  );
}

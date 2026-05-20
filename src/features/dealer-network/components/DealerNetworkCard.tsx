import { Link } from "react-router-dom";
import { BadgeCheck, Clock, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PublicDealer } from "../types";
import { dealerProfilePath } from "../data/dealers-hub-data";

const VERTICAL_LABEL: Record<PublicDealer["vertical"], string> = {
  "used-cars": "Pre-owned cars",
  "new-cars": "New cars",
  bikes: "Bikes",
  commercial: "Commercial",
  ev: "EV",
  "multi-brand": "Multi-brand",
};

interface DealerNetworkCardProps {
  dealer: PublicDealer;
  index?: number;
}

export function DealerNetworkCard({ dealer, index = 0 }: DealerNetworkCardProps) {
  return (
    <article className="dealers-network-card group" style={{ animationDelay: `${index * 45}ms` }}>
      <Link to={dealerProfilePath(dealer.slug)} className="block">
        <div className="dealers-network-media">
          <img src={dealer.coverUrl} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="dealers-network-media-overlay" aria-hidden />
          <div className="dealers-network-logo">
            <img src={dealer.logoUrl} alt="" className="partner-logo-tile h-8 w-auto max-w-[4.5rem] object-contain" />
          </div>
          {dealer.isVerified && (
            <Badge className="absolute left-2.5 top-2.5 gap-0.5 border-0 bg-primary text-[10px] text-primary-foreground">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
        <div className="dealers-network-body">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-bold leading-snug text-foreground group-hover:text-primary">{dealer.name}</h3>
            <Badge variant="outline" className="shrink-0 text-[10px]">
              {VERTICAL_LABEL[dealer.vertical]}
            </Badge>
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            {dealer.city}, {dealer.state}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">{dealer.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({dealer.reviewCount.toLocaleString("en-IN")})</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {dealer.listingCount} listings · {dealer.brands.slice(0, 2).join(", ")}
            {dealer.brands.length > 2 ? " +" : ""}
          </p>
          <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-primary">
            <Clock className="h-3 w-3" />
            Responds in ~{dealer.responseMins} min · View showroom →
          </p>
        </div>
      </Link>
    </article>
  );
}

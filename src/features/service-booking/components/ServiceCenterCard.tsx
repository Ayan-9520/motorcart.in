import { Link } from "react-router-dom";
import { MapPin, Star, Truck, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ServiceCenter } from "../types";

interface ServiceCenterCardProps {
  center: ServiceCenter;
  index?: number;
}

export function ServiceCenterCard({ center, index = 0 }: ServiceCenterCardProps) {
  const image = center.images[0];

  return (
    <article className="premium-service-center-card group" style={{ animationDelay: `${index * 45}ms` }}>
      <Link to={`/services/centers/${center.slug}`} className="block">
        <div className="premium-service-center-media">
          {image ? (
            <img src={image} alt={center.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">Workshop</div>
          )}
          {center.isVerified && (
            <Badge className="absolute left-2.5 top-2.5 gap-0.5 border-0 bg-primary text-[10px] text-primary-foreground">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </Badge>
          )}
          {center.pickupDropAvailable && (
            <Badge variant="outline" className="absolute right-2.5 top-2.5 border-primary/40 bg-card/90 text-[10px]">
              <Truck className="mr-0.5 h-3 w-3" />
              Pickup
            </Badge>
          )}
        </div>
        <div className="premium-service-center-body">
          <h3 className="line-clamp-2 font-bold leading-snug text-foreground group-hover:text-primary">{center.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            {center.city}, {center.state}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">{center.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({center.reviewCount.toLocaleString("en-IN")})</span>
          </div>
          <p className="mt-2 text-xs font-semibold text-primary">View profile &amp; book →</p>
        </div>
      </Link>
    </article>
  );
}

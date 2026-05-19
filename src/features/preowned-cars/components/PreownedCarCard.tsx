import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Gauge,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  deriveFairPriceLabel,
  getDiscountedPrice,
  getVehicleEmi,
  preownedDetailPath,
} from "@/lib/vehicle-utils";
import type { FairPriceLabel } from "@/types/vehicle";
import type { PreownedCarListing } from "../types";
import { cn } from "@/lib/utils";

const FAIR_PRICE_STYLES: Record<FairPriceLabel, string> = {
  "great-deal": "bg-primary/15 text-primary border-primary/30",
  "fair-price": "bg-muted text-foreground border-border",
  "high-price": "bg-destructive/10 text-destructive border-destructive/30",
};

const FAIR_PRICE_LABELS: Record<FairPriceLabel, string> = {
  "great-deal": "Great Deal",
  "fair-price": "Fair Price",
  "high-price": "High Price",
};

interface PreownedCarCardProps {
  vehicle: PreownedCarListing;
  index?: number;
}

export function PreownedCarCard({ vehicle, index = 0 }: PreownedCarCardProps) {
  const price = getDiscountedPrice(vehicle);
  const emi = getVehicleEmi(vehicle);
  const fair = vehicle.metadata.fairPriceLabel ?? deriveFairPriceLabel(vehicle);
  const inspection = vehicle.metadata.inspectionScore ?? 85;
  const path = preownedDetailPath(vehicle.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="premium-card group overflow-hidden border-border p-0">
        <Link to={path} className="block">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <img
              src={vehicle.images[0]}
              alt={vehicle.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="vehicle-card-overlay" />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {vehicle.isCertified && (
                <Badge className="gap-1 border-0 bg-primary text-primary-foreground">
                  <ShieldCheck className="h-3 w-3" />
                  Certified
                </Badge>
              )}
              {vehicle.metadata.warrantyIncluded && (
                <Badge variant="outline" className="border-primary-foreground/30 bg-foreground/50 text-primary-foreground backdrop-blur-sm">
                  Warranty
                </Badge>
              )}
            </div>
            <Badge
              className={cn(
                "absolute right-3 top-3 border text-[10px] font-semibold",
                FAIR_PRICE_STYLES[fair]
              )}
            >
              <Sparkles className="mr-1 h-3 w-3" />
              {FAIR_PRICE_LABELS[fair]}
            </Badge>
          </div>
          <CardContent className="space-y-2.5 p-4">
            <h3 className="line-clamp-2 font-semibold leading-snug text-foreground group-hover:text-primary">
              {vehicle.title}
            </h3>
            <p className="text-xl font-bold text-primary">{formatCurrency(price)}</p>
            <p className="text-sm text-muted-foreground">EMI from {formatCurrency(emi)}/mo</p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5 text-primary" />
                {vehicle.kmsDriven.toLocaleString()} km
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-primary" />
                {vehicle.owners} owner{vehicle.owners > 1 ? "s" : ""}
              </span>
              <span className="inline-flex items-center gap-1">
                <ClipboardCheck className="h-3.5 w-3.5 text-primary" />
                {inspection}/100
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <p className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />
                {vehicle.city}
              </p>
              {vehicle.dealerRating != null && (
                <span className="flex items-center gap-0.5 font-semibold text-foreground">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  {vehicle.dealerRating}
                </span>
              )}
            </div>
            {vehicle.metadata.certificationProgram && (
              <p className="text-[11px] font-medium text-primary">{vehicle.metadata.certificationProgram}</p>
            )}
          </CardContent>
        </Link>
        <div className="grid grid-cols-3 gap-1 border-t border-border p-2">
          <Button size="sm" variant="outline" className="h-9 rounded-lg text-[11px]" asChild>
            <Link to={`${path}#inspection`}>Report</Link>
          </Button>
          <Button size="sm" variant="outline" className="h-9 rounded-lg text-[11px]" asChild>
            <Link to="/finance/apply">Loan</Link>
          </Button>
          <Button size="sm" className="h-9 rounded-lg text-[11px]" asChild>
            <Link to={`${path}#inspect`}>Inspect</Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

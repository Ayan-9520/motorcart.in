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
import { VehicleImage } from "@/features/vehicles/components/VehicleImage";
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
  compact?: boolean;
}

export function PreownedCarCard({ vehicle, index = 0, compact = false }: PreownedCarCardProps) {
  const price = getDiscountedPrice(vehicle);
  const emi = getVehicleEmi(vehicle);
  const fair = vehicle.metadata.fairPriceLabel ?? deriveFairPriceLabel(vehicle);
  const inspection = vehicle.metadata.inspectionScore ?? 85;
  const path = preownedDetailPath(vehicle.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="min-w-0"
    >
      <Card
        className={cn(
          "premium-card group overflow-hidden border-border p-0",
          compact && "rounded-xl"
        )}
      >
        <Link to={path} className="block">
          <div
            className={cn(
              "relative overflow-hidden bg-muted",
              compact ? "aspect-[16/10]" : "aspect-[16/11]"
            )}
          >
            <VehicleImage
              images={vehicle.images}
              meta={{
                brand: vehicle.brand,
                model: vehicle.model,
                bodyType: vehicle.bodyType,
                category: vehicle.category,
                fuelType: vehicle.fuelType,
              }}
              alt={vehicle.title}
              className="transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="vehicle-card-overlay opacity-70" aria-hidden />
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {vehicle.isCertified && (
                <Badge className="gap-0.5 border-0 bg-primary px-1.5 py-0 text-[9px] text-primary-foreground">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  Certified
                </Badge>
              )}
              {vehicle.metadata.warrantyIncluded && (
                <Badge
                  variant="outline"
                  className="border-primary-foreground/30 bg-foreground/50 px-1.5 py-0 text-[9px] text-primary-foreground backdrop-blur-sm"
                >
                  Warranty
                </Badge>
              )}
            </div>
            <Badge
              className={cn(
                "absolute right-2 top-2 border px-1.5 py-0 text-[9px] font-semibold",
                FAIR_PRICE_STYLES[fair]
              )}
            >
              <Sparkles className="mr-0.5 h-2.5 w-2.5" />
              {FAIR_PRICE_LABELS[fair]}
            </Badge>
          </div>
          <CardContent className={cn("space-y-1.5", compact ? "p-3" : "p-4")}>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
              {vehicle.title}
            </h3>
            <p className={cn("font-bold text-primary", compact ? "text-base" : "text-lg")}>
              {formatCurrency(price)}
            </p>
            <p className="text-xs text-muted-foreground">EMI from {formatCurrency(emi)}/mo</p>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-0.5">
                <Gauge className="h-3 w-3 text-primary" />
                {vehicle.kmsDriven.toLocaleString()} km
              </span>
              <span className="inline-flex items-center gap-0.5">
                <Users className="h-3 w-3 text-primary" />
                {vehicle.owners} owner{vehicle.owners > 1 ? "s" : ""}
              </span>
              <span className="inline-flex items-center gap-0.5">
                <ClipboardCheck className="h-3 w-3 text-primary" />
                {inspection}/100
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <p className="flex items-center gap-0.5 text-muted-foreground">
                <MapPin className="h-2.5 w-2.5 shrink-0" />
                {vehicle.city}
              </p>
              {vehicle.dealerRating != null && (
                <span className="flex items-center gap-0.5 font-semibold text-foreground">
                  <Star className="h-2.5 w-2.5 fill-primary text-primary" />
                  {vehicle.dealerRating}
                </span>
              )}
            </div>
            {vehicle.metadata.certificationProgram && (
              <p className="text-[10px] font-medium text-primary">{vehicle.metadata.certificationProgram}</p>
            )}
          </CardContent>
        </Link>
        <div className="grid grid-cols-3 gap-1 border-t border-border p-2">
          <Button size="sm" variant="outline" className="h-8 rounded-md px-1 text-[10px]" asChild>
            <Link to={`${path}#inspection`}>Report</Link>
          </Button>
          <Button size="sm" variant="outline" className="h-8 rounded-md px-1 text-[10px]" asChild>
            <Link to="/finance/apply">Loan</Link>
          </Button>
          <Button size="sm" className="h-8 rounded-md px-1 text-[10px]" asChild>
            <Link to={`${path}#inspect`}>Inspect</Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

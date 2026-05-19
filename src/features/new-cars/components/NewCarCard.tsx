import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Fuel,
  Gauge,
  GitCompare,
  RotateCw,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { getDiscountedPrice, getVehicleEmi, newCarDetailPath } from "@/lib/vehicle-utils";
import type { NewCarListing } from "../types";
interface NewCarCardProps {
  vehicle: NewCarListing;
  index?: number;
}

export function NewCarCard({ vehicle, index = 0 }: NewCarCardProps) {
  const price = getDiscountedPrice(vehicle);
  const emi = getVehicleEmi(vehicle);
  const onRoad = vehicle.metadata.onRoadPrice ?? Math.round(price * 1.12);
  const rating = vehicle.metadata.rating ?? 4.5;
  const path = newCarDetailPath(vehicle.slug);

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
            <div className="vehicle-card-overlay opacity-80" aria-hidden />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {vehicle.metadata.offerTag && (
                <Badge className="border-0 bg-primary text-primary-foreground">
                  <Tag className="mr-1 h-3 w-3" />
                  {vehicle.metadata.offerTag}
                </Badge>
              )}
              {vehicle.metadata.has360 && (
                <Badge variant="outline" className="border-primary-foreground/30 bg-foreground/50 text-primary-foreground backdrop-blur-sm">
                  <RotateCw className="mr-1 h-3 w-3" />
                  360°
                </Badge>
              )}
              {vehicle.metadata.isLatestLaunch && (
                <Badge className="border-0 bg-foreground/80 text-primary-foreground">New launch</Badge>
              )}
            </div>
          </div>
          <CardContent className="space-y-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 font-semibold leading-snug text-foreground group-hover:text-primary">
                {vehicle.brand} {vehicle.model}
                {vehicle.variant ? ` ${vehicle.variant}` : ""}
              </h3>
              <span className="flex shrink-0 items-center gap-0.5 rounded-lg bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                <Star className="h-3 w-3 fill-primary" />
                {rating}
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(price)}</p>
              <p className="text-xs text-muted-foreground">On-road ~{formatCurrency(onRoad)}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5">
                <Fuel className="h-3 w-3 text-primary" />
                {vehicle.fuelType}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5">
                <Box className="h-3 w-3 text-primary" />
                {vehicle.transmission}
              </span>
              {vehicle.metadata.specifications?.mileage && (
                <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5">
                  <Gauge className="h-3 w-3 text-primary" />
                  {vehicle.metadata.specifications.mileage}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-foreground">
              EMI {formatCurrency(emi)}/mo
              {vehicle.metadata.waitingPeriod && (
                <span className="font-normal text-muted-foreground"> · {vehicle.metadata.waitingPeriod}</span>
              )}
            </p>
          </CardContent>
        </Link>
        <div className="flex gap-2 border-t border-border p-3">
          <Button size="sm" variant="outline" className="flex-1 rounded-xl" asChild>
            <Link to={`${path}?compare=1`}>
              <GitCompare className="mr-1 h-3.5 w-3.5" />
              Compare
            </Link>
          </Button>
          <Button size="sm" className="flex-1 rounded-xl" asChild>
            <Link to={path}>Get best price</Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

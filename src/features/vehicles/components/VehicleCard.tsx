import { Link } from "react-router-dom";
import { Heart, MapPin, ShieldCheck, Sparkles, GitCompare, Gauge, Fuel, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { vehicleDetailPath, getDiscountedPrice, getVehicleEmi } from "@/lib/vehicle-utils";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import type { VehicleListing } from "@/types/vehicle";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface VehicleCardProps {
  vehicle: VehicleListing;
  index?: number;
  layout?: "grid" | "list";
}

export function VehicleCard({ vehicle, index = 0, layout = "grid" }: VehicleCardProps) {
  const { toggleWishlist, isWishlisted, addCompare, isInCompare, removeCompare } = useVehicleMarketStore();
  const price = getDiscountedPrice(vehicle);
  const emi = getVehicleEmi(vehicle);
  const wishlisted = isWishlisted(vehicle.id);
  const inCompare = isInCompare(vehicle.id);
  const discount = vehicle.metadata.discountPercent;

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeCompare(vehicle.id);
      return;
    }
    const ok = addCompare(vehicle.id);
    if (!ok) toast.error("Compare up to 4 vehicles at a time");
    else toast.success("Added to compare");
  };

  if (layout === "list") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
        <Card className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <Link
              to={vehicleDetailPath(vehicle)}
              className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-secondary sm:w-72"
            >
              <img
                src={vehicle.images[0]}
                alt={vehicle.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
              {discount ? <Badge className="absolute left-3 top-3 bg-[#ef4444] text-white">{discount}% OFF</Badge> : null}
            </Link>
            <CardContent className="flex flex-1 flex-col justify-between p-5">
              <div>
                <Link to={vehicleDetailPath(vehicle)} className="line-clamp-2 text-lg font-semibold text-foreground hover:text-primary">
                  {vehicle.title}
                </Link>
                <p className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Gauge className="h-3.5 w-3.5" />
                    {vehicle.kmsDriven.toLocaleString()} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="h-3.5 w-3.5" />
                    {vehicle.fuelType}
                  </span>
                  <span>{vehicle.transmission}</span>
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {vehicle.location} · {vehicle.dealerName}
                </p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(price)}</p>
                  <p className="text-sm text-muted-foreground">EMI from {formatCurrency(emi)}/mo</p>
                </div>
                <CardActions
                  wishlisted={wishlisted}
                  inCompare={inCompare}
                  onWishlist={() => toggleWishlist(vehicle.id)}
                  onCompare={handleCompare}
                  detailPath={vehicleDetailPath(vehicle)}
                />
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="group overflow-hidden">
        <Link to={vehicleDetailPath(vehicle)} className="block">
          <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
            <img
              src={vehicle.images[0]}
              alt={vehicle.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-black/50" />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {vehicle.isCertified && (
                <Badge className="gap-1 border-0 bg-primary text-primary-foreground">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {vehicle.aiPriceScore != null && (
                <Badge variant="outline" className="border-border bg-secondary/90 text-white">
                  <Sparkles className="h-3 w-3" />
                  {vehicle.aiPriceScore}%
                </Badge>
              )}
              {discount ? <Badge className="bg-[#ef4444] text-white">{discount}% OFF</Badge> : null}
            </div>
          </div>
          <CardContent className="space-y-3 p-4">
            <h3 className="line-clamp-2 font-semibold leading-snug text-white group-hover:text-primary">{vehicle.title}</h3>
            <p className="text-xl font-bold text-foreground">{formatCurrency(price)}</p>
            {vehicle.originalPrice && vehicle.originalPrice > price && (
              <p className="text-sm text-muted-foreground line-through">{formatCurrency(vehicle.originalPrice)}</p>
            )}
            <p className="text-sm text-muted-foreground">
              EMI from {formatCurrency(emi)}/mo · {vehicle.year}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="line-clamp-1">
                {vehicle.city} · {vehicle.dealerName}
              </span>
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              <Badge variant="outline" className="text-[10px]">
                {vehicle.fuelType}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {vehicle.transmission}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {vehicle.kmsDriven.toLocaleString()} km
              </Badge>
            </div>
          </CardContent>
        </Link>
        <div className="flex gap-2 border-t border-border p-3">
          <Button variant="outline" size="sm" className="flex-1 gap-1 border-primary/40 text-primary" asChild>
            <a href={`https://wa.me/919876543210?text=${encodeURIComponent(vehicle.title)}`} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link to={vehicleDetailPath(vehicle)}>View</Link>
          </Button>
          <Button variant="secondary" size="sm" onClick={handleCompare}>
            <GitCompare className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function CardActions({
  wishlisted,
  inCompare,
  onWishlist,
  onCompare,
  detailPath,
}: {
  wishlisted: boolean;
  inCompare: boolean;
  onWishlist: () => void;
  onCompare: (e: React.MouseEvent) => void;
  detailPath: string;
}) {
  return (
    <div className="flex gap-1">
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className={cn("h-8 w-8", wishlisted && "text-[#ef4444]")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onWishlist();
        }}
        aria-label="Wishlist"
      >
        <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
      </Button>
      <Button type="button" size="icon" variant="secondary" className={cn("h-8 w-8", inCompare && "text-primary")} onClick={onCompare} aria-label="Compare">
        <GitCompare className="h-4 w-4" />
      </Button>
      <Button size="sm" asChild>
        <Link to={detailPath}>View</Link>
      </Button>
    </div>
  );
}

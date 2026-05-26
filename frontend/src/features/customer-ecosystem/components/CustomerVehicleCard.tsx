import { Link } from "react-router-dom";
import { Bot, CreditCard, Fuel, Gauge, Heart, MessageCircle, Shield, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { CustomerVehicle } from "../types";

type CustomerVehicleCardProps = {
  vehicle: CustomerVehicle;
  /** Rich garage card with EMI, PUC, AI score */
  detailed?: boolean;
};

export function CustomerVehicleCard({ vehicle, detailed = false }: CustomerVehicleCardProps) {
  const insBadge =
    vehicle.insuranceStatus === "expiring"
      ? "destructive"
      : vehicle.insuranceStatus === "active"
        ? "success"
        : "outline";

  return (
    <article className={cn("cos-vehicle-card", detailed && "cos-vehicle-card--detailed")}>
      <div className="cos-vehicle-card__media">
        <img src={vehicle.imageUrl} alt={`${vehicle.brand} ${vehicle.model}`} loading="lazy" className="cos-vehicle-card__img" />
        {vehicle.isPrimary ? <span className="cos-vehicle-card__primary">Primary</span> : null}
        {detailed && vehicle.aiScore != null ? (
          <span className="cos-vehicle-card__ai">
            <Bot className="h-3 w-3" /> AI {vehicle.aiScore}
          </span>
        ) : null}
      </div>
      <div className="cos-vehicle-card__body">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold tracking-tight">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-xs text-muted-foreground">
              {vehicle.variant} · {vehicle.year} · {vehicle.registrationNumber}
            </p>
          </div>
          {vehicle.healthScore != null ? (
            <div className="cos-vehicle-card__score">
              <Gauge className="h-3.5 w-3.5" />
              {vehicle.healthScore}
            </div>
          ) : null}
        </div>

        {detailed ? (
          <div className="cos-vehicle-card__stats">
            {vehicle.emiDueAmount != null ? (
              <span className="cos-vehicle-card__stat">
                <CreditCard className="h-3.5 w-3.5" />
                EMI {formatCurrency(vehicle.emiDueAmount)}
              </span>
            ) : null}
            <span className="cos-vehicle-card__stat">
              <Fuel className="h-3.5 w-3.5" />
              {vehicle.fuelType}
            </span>
            <span className="cos-vehicle-card__stat">{vehicle.transmission}</span>
            <span className="cos-vehicle-card__stat">{vehicle.ownershipNumber}st owner</span>
          </div>
        ) : (
          <div className="cos-vehicle-card__meta">
            <span>{vehicle.fuelType}</span>
            <span>{vehicle.transmission}</span>
            <span>{vehicle.ownershipNumber}st owner</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          <Badge variant={vehicle.rcStatus === "verified" ? "success" : "outline"} className="text-[10px]">
            RC {vehicle.rcStatus}
          </Badge>
          <Badge variant={insBadge} className="text-[10px]">
            <Shield className="mr-0.5 h-3 w-3" />
            Insurance {vehicle.insuranceDaysLeft != null ? `${vehicle.insuranceDaysLeft}d` : vehicle.insuranceStatus}
          </Badge>
          {vehicle.serviceDueDays != null ? (
            <Badge variant="secondary" className="text-[10px]">
              <Wrench className="mr-0.5 h-3 w-3" />
              Service {vehicle.serviceDueDays}d
            </Badge>
          ) : null}
          {detailed && vehicle.pucDaysLeft != null ? (
            <Badge variant="outline" className="text-[10px]">
              PUC {vehicle.pucDaysLeft}d
            </Badge>
          ) : null}
          {detailed && vehicle.loanLender ? (
            <Badge variant="outline" className="text-[10px]">
              {vehicle.loanLender}
            </Badge>
          ) : null}
        </div>

        {vehicle.resaleEstimate != null ? (
          <p className="text-sm font-semibold text-primary">
            Resale est. ₹{(vehicle.resaleEstimate / 100000).toFixed(2)}L
          </p>
        ) : null}

        <div className="cos-vehicle-card__actions">
          <Button size="sm" variant="outline" className="rounded-lg" asChild>
            <Link to="/dashboard/customer/documents">Documents</Link>
          </Button>
          <Button size="sm" variant="outline" className="rounded-lg" asChild>
            <Link to="/dashboard/customer/insurance-wallet">Insurance</Link>
          </Button>
          {detailed ? (
            <>
              <Button size="sm" variant="ghost" className="rounded-lg" asChild>
                <Link to="/wishlist">
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="sm" variant="ghost" className="rounded-lg" asChild>
                <Link to="/search">
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <Button size="sm" variant="ghost" className="rounded-lg" asChild>
              <Link to="/vehicles/compare">
                <Heart className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

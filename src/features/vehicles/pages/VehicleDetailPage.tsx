import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, GitCompare, ChevronRight, Gauge, Fuel, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleGallery } from "../components/VehicleGallery";
import { Viewer360 } from "../components/Viewer360";
import { VideoSection } from "../components/VideoSection";
import { EmiCalculator } from "../components/EmiCalculator";
import { LoanEligibility } from "../components/LoanEligibility";
import { EnquiryForm } from "../components/EnquiryForm";
import { TestDriveBooking } from "../components/TestDriveBooking";
import { WhatsAppCTA } from "../components/WhatsAppCTA";
import { DealerDetails } from "../components/DealerDetails";
import { Specifications } from "../components/Specifications";
import { SimilarVehicles } from "../components/SimilarVehicles";
import { RecentlyViewed } from "../components/RecentlyViewed";
import { ShareVehicle } from "../components/ShareVehicle";
import { CompareFloatingBar } from "../components/CompareFloatingBar";
import { useVehicleDetail } from "@/hooks/useVehicleDetail";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { getDiscountedPrice, getVehicleEmi, vehicleDetailPath, categoryToPath } from "@/lib/vehicle-utils";
import toast from "react-hot-toast";

export function VehicleDetailPage() {
  const { slug, category } = useParams<{ slug: string; category?: string }>();
  const { vehicle, similar, loading } = useVehicleDetail(slug);
  const toggleWishlist = useVehicleMarketStore((s) => s.toggleWishlist);
  const addCompare = useVehicleMarketStore((s) => s.addCompare);
  const vehicleId = vehicle?.id ?? "";
  const wishlisted = useVehicleMarketStore((s) => s.wishlist.includes(vehicleId));
  const inCompare = useVehicleMarketStore((s) => s.compare.includes(vehicleId));

  useEffect(() => {
    if (vehicle) {
      setPageMeta({
        title: vehicle.title,
        description: `${vehicle.year} ${vehicle.brand} ${vehicle.model} for ${formatCurrency(vehicle.price)} in ${vehicle.city}. EMI from ${formatCurrency(getVehicleEmi(vehicle))}/mo.`,
        ogImage: vehicle.images[0],
      });
    }
  }, [vehicle]);

  if (loading) {
    return (
      <div className="container mx-auto space-y-6 px-4 py-8">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Vehicle not found</h1>
        <Button variant="default" className="mt-4" asChild>
          <Link to="/vehicles">Browse all vehicles</Link>
        </Button>
      </div>
    );
  }

  const price = getDiscountedPrice(vehicle);
  const emi = getVehicleEmi(vehicle);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto space-y-8 px-4 py-6">
        <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link
            to={vehicle.category === "new-cars" ? "/new-cars" : vehicle.category === "used-cars" ? "/used-cars" : "/vehicles"}
            className="hover:text-primary"
          >
            {vehicle.category === "new-cars" ? "New Cars" : vehicle.category === "used-cars" ? "Used Cars" : "Vehicles"}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={categoryToPath(vehicle.category)} className="hover:text-primary capitalize">
            {vehicle.category === "used-cars" ? "Certified" : vehicle.category.replace(/-/g, " ")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="line-clamp-1 text-foreground">{vehicle.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <VehicleGallery images={vehicle.images} title={vehicle.title} />
            {vehicle.metadata.viewer360 && (
              <Viewer360 images={vehicle.metadata.viewer360} title={vehicle.title} />
            )}
            {vehicle.metadata.videos && (
              <VideoSection videos={vehicle.metadata.videos} title={vehicle.title} />
            )}
            <Specifications vehicle={vehicle} />
            {vehicle.description && (
              <div className="rounded-xl border bg-card p-6">
                <h2 className="mb-3 text-lg font-semibold">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
              </div>
            )}
            <SimilarVehicles vehicles={similar} />
            <RecentlyViewed />
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex flex-wrap gap-2">
                {vehicle.isCertified && <Badge className="bg-primary text-primary-foreground border-0 text-white">Certified</Badge>}
                {vehicle.isFeatured && <Badge variant="secondary">Featured</Badge>}
                {vehicle.metadata.discountPercent ? (
                  <Badge className="bg-destructive text-white">{vehicle.metadata.discountPercent}% OFF</Badge>
                ) : null}
              </div>
              <h1 className="mt-3 text-2xl font-bold leading-tight">{vehicle.title}</h1>
              <p className="mt-3 text-3xl font-bold text-primary">{formatCurrency(price)}</p>
              {vehicle.originalPrice && vehicle.originalPrice > price && (
                <p className="text-sm text-muted-foreground line-through">{formatCurrency(vehicle.originalPrice)}</p>
              )}
              <p className="mt-1 text-sm text-muted-foreground">EMI from <strong className="text-foreground">{formatCurrency(emi)}/mo</strong></p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <span className="flex items-center gap-1 rounded-lg bg-muted/60 px-3 py-2"><Gauge className="h-4 w-4 text-primary" />{vehicle.kmsDriven.toLocaleString()} km</span>
                <span className="flex items-center gap-1 rounded-lg bg-muted/60 px-3 py-2"><Fuel className="h-4 w-4 text-primary" />{vehicle.fuelType}</span>
                <span className="flex items-center gap-1 rounded-lg bg-muted/60 px-3 py-2"><Calendar className="h-4 w-4 text-primary" />{vehicle.year}</span>
                <span className="flex items-center gap-1 rounded-lg bg-muted/60 px-3 py-2"><Users className="h-4 w-4 text-primary" />{vehicle.owners} owner(s)</span>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 gap-1"
                  onClick={() => {
                    const wasSaved = wishlisted;
                    toggleWishlist(vehicle.id);
                    toast.success(wasSaved ? "Removed from wishlist" : "Saved to wishlist");
                  }}
                >
                  <Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  {wishlisted ? "Saved" : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 gap-1"
                  onClick={() => {
                    if (inCompare) return;
                    const ok = addCompare(vehicle.id);
                    if (!ok) toast.error("Max 4 vehicles to compare");
                    else toast.success("Added to compare");
                  }}
                >
                  <GitCompare className="h-4 w-4" /> Compare
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <WhatsAppCTA vehicle={vehicle} />
                <ShareVehicle vehicle={vehicle} />
              </div>
            </div>

            <EmiCalculator vehicle={vehicle} />
            <LoanEligibility />
            <DealerDetails vehicle={vehicle} />
            <EnquiryForm vehicle={vehicle} />
            <TestDriveBooking vehicle={vehicle} />
          </div>
        </div>
      </div>
      <CompareFloatingBar />
    </div>
  );
}

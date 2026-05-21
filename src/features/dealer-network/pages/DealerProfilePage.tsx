import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setPageMeta } from "@/utils/seo";
import { usePublicDealer } from "../hooks/usePublicDealer";
import { getDealerBySlug } from "../hooks/useDealerDirectory";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { formatCurrency } from "@/lib/utils";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import type { VehicleListing } from "@/types/vehicle";

function mapVehicle(row: Record<string, unknown>): VehicleListing {
  const images = (row.images as string[]) ?? [];
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    brand: row.brand as string,
    model: row.model as string,
    year: row.year as number,
    price: Number(row.price),
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Sedan",
    category: "used-cars",
    kmsDriven: 0,
    owners: 1,
    city: (row.city as string) ?? "",
    state: "",
    images,
    isCertified: Boolean(row.is_certified),
    dealerName: "",
    location: row.city as string,
    status: "available",
    condition: "used",
    features: [],
    isFeatured: false,
    metadata: {},
    createdAt: (row.created_at as string) ?? new Date().toISOString(),
  };
}

export function DealerProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading } = usePublicDealer(slug);
  const mockFallback = slug ? getDealerBySlug(slug) : undefined;

  const dealer = data?.dealer;
  const storefront = data?.storefront;
  const vehicles = (data?.vehicles ?? []).map((v) => mapVehicle(v as Record<string, unknown>));
  const reviews = data?.reviews ?? [];

  useEffect(() => {
    const name = dealer?.name ?? mockFallback?.name;
    if (!name) return;
    setPageMeta({
      title: storefront?.seo_title ?? `${name} — Dealer on Motorcart`,
      description:
        storefront?.seo_description ??
        `${name} in ${dealer?.city ?? mockFallback?.city} — verified showroom`,
    });
  }, [dealer, mockFallback, storefront]);

  if (loading) {
    return <p className="container py-16 text-muted-foreground">Loading showroom…</p>;
  }

  if (!dealer && !mockFallback) return <NotFoundPage />;

  const name = dealer?.name ?? mockFallback?.name ?? "Dealer";
  const city = dealer?.city ?? mockFallback?.city ?? "";
  const state = dealer?.state ?? mockFallback?.state ?? "";
  const phone = storefront?.contact_phone ?? dealer?.phone ?? mockFallback?.phone ?? "";
  const waNum = (storefront?.contact_whatsapp ?? phone).replace(/\D/g, "").slice(-10);
  const wa = waNum
    ? `https://wa.me/91${waNum}?text=${encodeURIComponent(`Hi ${name}, I found you on Motorcart`)}`
    : null;
  const tel = waNum ? `tel:+91${waNum}` : null;
  const rating = Number(dealer?.rating ?? mockFallback?.rating ?? 0);
  const reviewCount = Number(dealer?.review_count ?? mockFallback?.reviewCount ?? 0);
  const verified = Boolean(dealer?.is_verified ?? mockFallback?.isVerified);
  const tagline = storefront?.hero_tagline ?? `Trusted dealer in ${city}`;
  const showInventory = storefront?.show_inventory !== false;
  const showFinance = storefront?.show_finance_offers !== false;
  const showReviews = storefront?.show_reviews !== false;

  return (
    <div className="dealers-hub-page min-h-screen">
      <section className="dealers-profile-hero">
        <div className="container">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 rounded-lg text-primary-foreground/90 hover:bg-white/10 hover:text-white" asChild>
            <Link to="/dealers/browse">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Directory
            </Link>
          </Button>
          <div className="dealers-profile-head max-w-3xl">
            <h1 className="text-2xl font-bold text-white md:text-3xl">{name}</h1>
            {verified && (
              <Badge className="mt-2 gap-1 border-0 bg-primary text-primary-foreground">
                <BadgeCheck className="h-3 w-3" />
                Verified dealer
              </Badge>
            )}
            <p className="mt-2 text-white/85">{tagline}</p>
            {(city || state) && (
              <p className="mt-1 flex items-center gap-1 text-sm text-white/80">
                <MapPin className="h-4 w-4" />
                {[city, state].filter(Boolean).join(", ")}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <strong>{rating.toFixed(1)}</strong> ({reviewCount.toLocaleString("en-IN")})
              </span>
              <span className="flex items-center gap-1">
                <Store className="h-4 w-4" />
                {vehicles.length || (mockFallback?.listingCount ?? 0)} listings
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {showInventory && (
              <div className="dealers-profile-panel">
                <h2 className="text-lg font-bold">Inventory</h2>
                {vehicles.length > 0 ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {vehicles.map((v) => (
                      <VehicleCard key={v.id} vehicle={v} />
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Listings coming soon — contact the dealer directly.
                  </p>
                )}
              </div>
            )}

            {showReviews && reviews.length > 0 && (
              <div className="dealers-profile-panel">
                <h2 className="text-lg font-bold">Reviews</h2>
                <ul className="mt-3 space-y-3">
                  {reviews.map((r) => (
                    <li key={r.id as string} className="text-sm border-b border-border/60 pb-3">
                      <span className="font-semibold">{Number(r.rating)}★</span>
                      <p className="text-muted-foreground mt-1">{r.comment as string}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="dealers-profile-panel h-fit space-y-4">
            <h2 className="text-lg font-bold">Contact</h2>
            {wa ? (
              <Button className="w-full rounded-xl" asChild>
                <a href={wa} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Add phone in{" "}
                <Link to="/dashboard/dealer/storefront" className="font-medium text-primary">
                  Storefront settings
                </Link>{" "}
                to enable WhatsApp &amp; call.
              </p>
            )}
            {tel ? (
              <Button variant="outline" className="w-full rounded-xl" asChild>
                <a href={tel}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call dealer
                </a>
              </Button>
            ) : null}
            {showFinance && (
              <Button variant="secondary" className="w-full rounded-xl" asChild>
                <Link to="/finance">View finance offers</Link>
              </Button>
            )}
            {vehicles[0] && (
              <p className="text-xs text-muted-foreground">
                From {formatCurrency(vehicles[0].price)} on showroom stock
              </p>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

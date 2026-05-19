import type { PartCategorySlug, PartProduct } from "../types";

const u = (path: string) => `https://images.unsplash.com/${path}?w=600&q=80`;

const SELLER = "00000000-0000-0000-0000-000000000001";

const U = {
  t1: "a1000000-0000-4000-8000-000000000001",
  t2: "a1000000-0000-4000-8000-000000000002",
  b1: "a1000000-0000-4000-8000-000000000003",
  b2: "a1000000-0000-4000-8000-000000000004",
  br1: "a1000000-0000-4000-8000-000000000005",
  br2: "a1000000-0000-4000-8000-000000000006",
  e1: "a1000000-0000-4000-8000-000000000007",
  e2: "a1000000-0000-4000-8000-000000000008",
  l1: "a1000000-0000-4000-8000-000000000009",
  l2: "a1000000-0000-4000-8000-00000000000a",
  el1: "a1000000-0000-4000-8000-00000000000b",
  el2: "a1000000-0000-4000-8000-00000000000c",
  a1: "a1000000-0000-4000-8000-00000000000d",
  a2: "a1000000-0000-4000-8000-00000000000e",
  bo1: "a1000000-0000-4000-8000-00000000000f",
  bo2: "a1000000-0000-4000-8000-000000000010",
  i1: "a1000000-0000-4000-8000-000000000011",
  i2: "a1000000-0000-4000-8000-000000000012",
} as const;

function p(
  id: string,
  slug: string,
  name: string,
  cat: PartCategorySlug,
  brand: string,
  price: number,
  orig: number | null,
  wholesale: number,
  stock: number,
  bulk: number,
  rating: number,
  reviews: number,
  image: string,
  compat: string[],
  feat: boolean,
  desc: string
): PartProduct {
  return {
    id,
    sellerId: SELLER,
    name,
    slug,
    categorySlug: cat,
    brand,
    price,
    originalPrice: orig,
    wholesalePrice: wholesale,
    gstRate: 18,
    stock,
    bulkMinQty: bulk,
    rating,
    reviewCount: reviews,
    images: [image],
    compatibility: compat,
    isFeatured: feat,
    isActive: true,
    description: desc,
    sku: `MC-${slug.slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
}

export const MOCK_PARTS_CATALOG: PartProduct[] = [
  p(U.t1, "michelin-primacy-5-205-55-r16", "Michelin Primacy 5 — 205/55 R16", "tyres", "Michelin", 8499, 9999, 7200, 80, 2, 4.8, 1204, u("photo-1558618666-fcd25c85f82e"), ["Honda City", "Hyundai Verna"], true, "Premium touring tyre with low noise."),
  p(U.t2, "apollo-amazer-4g-165-80-r14", "Apollo Amazer 4G — 165/80 R14", "tyres", "Apollo", 3899, 4299, 3100, 120, 4, 4.5, 890, u("photo-1558618666-fcd25c85f82e"), ["Maruti Swift", "Alto"], false, "Durable budget tyre for hatchbacks."),
  p(U.b1, "exide-mileage-65ah", "Exide Mileage 65Ah Car Battery", "battery", "Exide", 6299, 6999, 5400, 45, 1, 4.7, 2100, u("photo-1593941707879-2c2b2cd97e2a"), ["Sedan", "Compact SUV"], true, "Maintenance-free with 55-month warranty."),
  p(U.b2, "amaron-pro-60ah", "Amaron PRO 60Ah DIN", "battery", "Amaron", 5899, null, 5000, 60, 1, 4.6, 1560, u("photo-1593941707879-2c2b2cd97e2a"), ["Hatchback", "Sedan"], false, "High cranking power for Indian summers."),
  p(U.br1, "bosch-brake-pad-front-kit", "Bosch Front Brake Pad Kit", "brake-parts", "Bosch", 3299, 3999, 2650, 34, 2, 4.7, 640, u("photo-1486262715619-67b85e0b08d3"), ["Hyundai Creta", "Kia Seltos"], true, "Ceramic compound — low dust."),
  p(U.br2, "brembo-brake-fluid-dot4", "Brembo DOT 4 Brake Fluid 1L", "brake-parts", "Brembo", 899, null, 720, 200, 4, 4.8, 420, u("photo-1486262715619-67b85e0b08d3"), ["All vehicles"], false, "High boiling point for performance driving."),
  p(U.e1, "mann-oil-filter-hu612x", "MANN Oil Filter HU 612x", "engine-parts", "MANN", 649, 799, 520, 90, 6, 4.6, 330, u("photo-1492144534655-ae79c964c9d7"), ["VW Group", "Skoda Rapid"], false, "OEM-grade filtration."),
  p(U.e2, "k-n-cone-air-intake", "K&N Performance Air Intake", "engine-parts", "K&N", 12499, 14999, 10200, 12, 1, 4.8, 210, u("photo-1492144534655-ae79c964c9d7"), ["Honda Civic", "Skoda Octavia"], true, "Washable filter — improved airflow."),
  p(U.l1, "castrol-edge-5w30-4l", "Castrol EDGE 5W-30 — 4L", "lubricants", "Castrol", 4599, 4999, 3800, 55, 2, 4.9, 3400, u("photo-1607860108855-645f04393433"), ["Turbo petrol", "Diesel"], true, "Full synthetic with Titanium FST."),
  p(U.l2, "motul-8100-xcess-5w40", "Motul 8100 X-cess 5W-40 — 5L", "lubricants", "Motul", 6899, null, 5600, 40, 2, 4.8, 890, u("photo-1607860108855-645f04393433"), ["European imports"], false, "ACEA C3 high performance."),
  p(U.el1, "pioneer-carplay-dmh", "Pioneer DMH Wireless CarPlay", "electronics", "Pioneer", 22999, 26999, 18900, 18, 1, 4.85, 512, u("photo-1549317661-bd32c8ce0db2"), ["Double DIN universal"], true, "Wireless Android Auto & CarPlay."),
  p(U.el2, "bosch-reverse-camera-hd", "Bosch HD Reverse Camera", "electronics", "Bosch", 3499, 3999, 2800, 70, 2, 4.5, 210, u("photo-1549317661-bd32c8ce0db2"), ["All cars"], false, "Night vision assist."),
  p(U.a1, "3m-premium-car-mats", "3M Premium Floor Mats — Black", "accessories", "3M", 2899, 3499, 2300, 44, 4, 4.6, 670, u("photo-1609521263047-f8f205293f24"), ["SUV 5-seater"], false, "Anti-skid backing."),
  p(U.a2, "thule-roof-rack-wingbar", "Thule WingBar Edge Roof Rack", "accessories", "Thule", 18999, null, 15800, 8, 1, 4.9, 120, u("photo-1609521263047-f8f205293f24"), ["Compact SUV"], true, "Aerodynamic low profile."),
  p(U.bo1, "oem-front-bumper-swift", "OEM Front Bumper — Swift 2018+", "body-parts", "Maruti Suzuki", 12499, null, 9800, 6, 1, 4.4, 45, u("photo-1609521263047-f8f205293f24"), ["Maruti Swift"], false, "Primed — ready for paint."),
  p(U.bo2, "magna-side-mirror-power", "Power Side Mirror Assembly L", "body-parts", "Magna", 2499, 2999, 2000, 25, 2, 4.3, 112, u("photo-1609521263047-f8f205293f24"), ["Hyundai i20"], false, "Electric adjust + indicator."),
  p(U.i1, "leather-seat-cover-premium", "Premium Leatherette Seat Covers", "interior-parts", "AutoStyle", 8999, 10999, 7200, 15, 1, 4.7, 340, u("photo-1609521263047-f8f205293f24"), ["Creta", "Seltos"], true, "Airbag compatible stitching."),
  p(U.i2, "oem-ac-vent-grille", "Dashboard AC Vent Grille Set", "interior-parts", "OEM", 1899, null, 1500, 40, 4, 4.2, 88, u("photo-1609521263047-f8f205293f24"), ["VW Polo"], false, "Direct snap-fit replacement."),
];

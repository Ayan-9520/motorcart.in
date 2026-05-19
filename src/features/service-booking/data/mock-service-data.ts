import type { ServiceCatalogItem, ServiceCenter } from "../types";

const img = (id: string) => `https://images.unsplash.com/${id}?w=800&q=80`;

const OWNER = "00000000-0000-0000-0000-000000000002";

export const MOCK_SERVICE_CENTERS: ServiceCenter[] = [
  {
    id: "c1000000-0000-4000-8000-000000000001",
    ownerId: OWNER,
    name: "Motorcart Elite Garage — Koramangala",
    slug: "motorcart-elite-koramangala",
    description: "Multi-brand workshop with PPF bay, alignment & AC specialists.",
    address: "80 Feet Rd, Koramangala 4th Block",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    phone: "+91 80 4000 2000",
    rating: 4.8,
    reviewCount: 1240,
    servicesOffered: ["car-servicing", "car-wash", "ceramic-coating", "ppf-coating", "ac-repair", "tyre-replacement", "battery-replacement"],
    isVerified: true,
    isActive: true,
    images: [img("photo-1486262715619-67b85e0b08d3")],
    pickupDropAvailable: true,
    slotIntervalMinutes: 30,
    lat: 12.9352,
    lng: 77.6245,
    createdAt: new Date().toISOString(),
  },
  {
    id: "c1000000-0000-4000-8000-000000000002",
    ownerId: OWNER,
    name: "Express Auto Care — Andheri",
    slug: "express-auto-care-andheri",
    description: "Same-day denting & painting, insurance renewals & RC desk.",
    address: "Veera Desai Rd, Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400053",
    phone: "+91 22 4000 3300",
    rating: 4.6,
    reviewCount: 890,
    servicesOffered: ["denting-painting", "car-wash", "insurance-renewal", "rc-transfer", "car-servicing"],
    isVerified: true,
    isActive: true,
    images: [img("photo-1609521263047-f8f205293f24")],
    pickupDropAvailable: true,
    slotIntervalMinutes: 30,
    lat: 19.1364,
    lng: 72.8296,
    createdAt: new Date().toISOString(),
  },
  {
    id: "c1000000-0000-4000-8000-000000000003",
    ownerId: OWNER,
    name: "GreenLane EV & Hybrid Service",
    slug: "greenlane-ev-hyderabad",
    description: "EV diagnostics, battery health & tyre programs.",
    address: "Hitech City Main Rd",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    phone: "+91 40 4000 4400",
    rating: 4.9,
    reviewCount: 420,
    servicesOffered: ["car-servicing", "battery-replacement", "tyre-replacement", "ac-repair"],
    isVerified: true,
    isActive: true,
    images: [img("photo-1593941707879-2c2b2cd97e2a")],
    pickupDropAvailable: true,
    slotIntervalMinutes: 45,
    lat: 17.4474,
    lng: 78.3762,
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_SERVICES: ServiceCatalogItem[] = [
  { id: "s1", serviceCenterId: MOCK_SERVICE_CENTERS[0].id, name: "Premium periodic service", slug: "premium-service", serviceType: "car-servicing", description: "Oil, filters, 40-point check", priceFrom: 4999, priceTo: 8999, durationMinutes: 180, isDoorstep: false, isActive: true, images: [], createdAt: new Date().toISOString() },
  { id: "s2", serviceCenterId: MOCK_SERVICE_CENTERS[0].id, name: "Ceramic coating — sedan", slug: "ceramic-sedan", serviceType: "ceramic-coating", description: "9H ceramic with warranty", priceFrom: 18999, priceTo: 24999, durationMinutes: 480, isDoorstep: false, isActive: true, images: [], createdAt: new Date().toISOString() },
  { id: "s3", serviceCenterId: MOCK_SERVICE_CENTERS[0].id, name: "PPF front kit", slug: "ppf-front", serviceType: "ppf-coating", description: "Bumper, bonnet, mirrors", priceFrom: 24999, priceTo: null, durationMinutes: 360, isDoorstep: false, isActive: true, images: [], createdAt: new Date().toISOString() },
  { id: "s4", serviceCenterId: MOCK_SERVICE_CENTERS[1].id, name: "Panel dent + paint (per panel)", slug: "dent-paint-panel", serviceType: "denting-painting", description: "OEM colour match", priceFrom: 3500, priceTo: 8500, durationMinutes: 240, isDoorstep: false, isActive: true, images: [], createdAt: new Date().toISOString() },
  { id: "s5", serviceCenterId: MOCK_SERVICE_CENTERS[1].id, name: "Insurance renewal assist", slug: "insurance-renew", serviceType: "insurance-renewal", description: "Zero-dep comparison", priceFrom: 0, priceTo: null, durationMinutes: 60, isDoorstep: true, isActive: true, images: [], createdAt: new Date().toISOString() },
  { id: "s6", serviceCenterId: MOCK_SERVICE_CENTERS[1].id, name: "RC transfer concierge", slug: "rc-transfer", serviceType: "rc-transfer", description: "RTO paperwork & pickup", priceFrom: 4500, priceTo: 7500, durationMinutes: null, isDoorstep: true, isActive: true, images: [], createdAt: new Date().toISOString() },
  { id: "s7", serviceCenterId: MOCK_SERVICE_CENTERS[2].id, name: "AC gas + cooling test", slug: "ac-service", serviceType: "ac-repair", description: "Leak test & refill", priceFrom: 2499, priceTo: 4499, durationMinutes: 90, isDoorstep: false, isActive: true, images: [], createdAt: new Date().toISOString() },
  { id: "s8", serviceCenterId: MOCK_SERVICE_CENTERS[2].id, name: "Tyre set (4) + alignment", slug: "tyre-package", serviceType: "tyre-replacement", description: "Premium brands", priceFrom: 22000, priceTo: 45000, durationMinutes: 120, isDoorstep: false, isActive: true, images: [], createdAt: new Date().toISOString() },
];

MOCK_SERVICES.forEach((svc) => {
  const c = MOCK_SERVICE_CENTERS.find((x) => x.id === svc.serviceCenterId);
  svc.centerName = c?.name;
  svc.centerSlug = c?.slug;
});

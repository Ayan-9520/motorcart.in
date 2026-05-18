import type { AutoPart } from "@/types";

export const autoParts: AutoPart[] = [
  {
    id: "1", slug: "michelin-pilot-sport-4-195-65-r15",
    name: "Michelin Pilot Sport 4 - 195/65 R15", category: "Tyres", brand: "Michelin",
    price: 6499, originalPrice: 7999, rating: 4.8, reviewCount: 2340, stock: 156,
    seller: "TyreHub India", sellerRating: 4.9, delivery: "2-3 days",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",
    compatible: ["Maruti Swift", "Hyundai i20", "Honda City"],
  },
  {
    id: "2", slug: "bosch-brake-pad-set-front",
    name: "Bosch Brake Pad Set - Front (Ceramic)", category: "Engine Parts", brand: "Bosch",
    price: 2899, originalPrice: 3499, rating: 4.7, reviewCount: 890, stock: 89,
    seller: "AutoParts Pro", sellerRating: 4.8, delivery: "1-2 days",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80",
    compatible: ["Hyundai Creta", "Kia Seltos"],
  },
  {
    id: "3", slug: "exide-inva-master-65ah",
    name: "Exide Invamaster 65Ah Battery", category: "Batteries", brand: "Exide",
    price: 5499, originalPrice: 6200, rating: 4.6, reviewCount: 1560, stock: 234,
    seller: "Battery World", sellerRating: 4.7, delivery: "Same day",
    image: "https://images.unsplash.com/photo-1593941707879-2c2b2cd97e2a?w=400&q=80",
    compatible: ["Sedan", "Compact SUV"],
  },
  {
    id: "4", slug: "pioneer-apple-carplay-unit",
    name: "Pioneer DMH-ZS8290BT - Apple CarPlay", category: "GPS & Electronics", brand: "Pioneer",
    price: 18999, originalPrice: 22999, rating: 4.9, reviewCount: 456, stock: 45,
    seller: "ElectroAuto", sellerRating: 4.9, delivery: "3-5 days",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  },
  {
    id: "5", slug: "3m-ceramic-coating-kit",
    name: "3M Ceramic Coating Kit - Premium", category: "Accessories", brand: "3M",
    price: 8999, originalPrice: 10999, rating: 4.8, reviewCount: 678, stock: 67,
    seller: "Detailing Store", sellerRating: 4.8, delivery: "2-3 days",
    image: "https://images.unsplash.com/photo-1607860108855-645f04393433?w=400&q=80",
  },
  {
    id: "6", slug: "k-n-air-filter-performance",
    name: "K&N High Flow Air Filter", category: "Engine Parts", brand: "K&N",
    price: 4299, rating: 4.7, reviewCount: 320, stock: 112,
    seller: "Performance Parts Co", sellerRating: 4.6, delivery: "2-4 days",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80",
  },
];

export const partCategories = [
  "All", "Engine Parts", "Tyres", "Batteries", "Accessories", "GPS & Electronics",
];

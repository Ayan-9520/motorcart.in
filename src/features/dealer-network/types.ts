export type DealerVertical = "used-cars" | "new-cars" | "bikes" | "commercial" | "ev" | "multi-brand";

export interface PublicDealer {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  vertical: DealerVertical;
  specialties: string[];
  brands: string[];
  listingCount: number;
  logoUrl: string;
  coverUrl: string;
  phone: string;
  sinceYear: number;
  responseMins: number;
}

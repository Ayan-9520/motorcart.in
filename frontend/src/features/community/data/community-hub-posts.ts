import type { LucideIcon } from "lucide-react";
import { Car, Star, Megaphone } from "lucide-react";
import { COMMUNITY_POST_IMAGES } from "@/lib/media/india-media-catalog";

export type HubPostTagVariant = "purchase" | "review" | "promotion";

export interface CommunityHubPost {
  id: string;
  authorName: string;
  handle: string;
  role: string;
  timeAgo: string;
  verified: boolean;
  tag: { label: string; variant: HubPostTagVariant; icon: LucideIcon };
  body: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  rating: number;
}

export const COMMUNITY_HUB_POSTS: CommunityHubPost[] = [
  {
    id: "hub-1",
    authorName: "Rajesh Kumar",
    handle: "@rajesh_auto",
    role: "Car Enthusiast",
    timeAgo: "2 hours ago",
    verified: true,
    tag: { label: "New Purchase", variant: "purchase", icon: Car },
    body: "Just picked up this beauty! 2024 BMW M3 Competition. The performance is absolutely incredible. Special thanks to @AutoHub for the seamless buying experience! 🏎️💨",
    imageUrl: COMMUNITY_POST_IMAGES.luxury,
    likes: 234,
    comments: 45,
    shares: 12,
    rating: 4.8,
  },
  {
    id: "hub-2",
    authorName: "Priya Sharma",
    handle: "@priya_drives",
    role: "Auto Reviewer",
    timeAgo: "5 hours ago",
    verified: true,
    tag: { label: "Review", variant: "review", icon: Star },
    body: "Honest long-term review of the 2023 Hyundai Creta — mileage, comfort, and service costs after 18 months. Would I buy again? Read my full take below. ⭐",
    imageUrl: COMMUNITY_POST_IMAGES.suv,
    likes: 189,
    comments: 62,
    shares: 28,
    rating: 4.9,
  },
  {
    id: "hub-3",
    authorName: "Mumbai Motors",
    handle: "@mumbai_motors",
    role: "Verified Dealer",
    timeAgo: "6 hours ago",
    verified: true,
    tag: { label: "Promotion", variant: "promotion", icon: Megaphone },
    body: "🔥 MEGA SALE ALERT! Up to 30% off on premium sedans this weekend. Limited stock available. Book your test drive now!",
    likes: 156,
    comments: 28,
    shares: 41,
    rating: 4.8,
  },
  {
    id: "hub-4",
    authorName: "Arjun Mehta",
    handle: "@arjun_ev",
    role: "EV Advocate",
    timeAgo: "8 hours ago",
    verified: true,
    tag: { label: "Review", variant: "review", icon: Star },
    body: "Tata Nexon EV long-range test — real-world 412 km in city mix. Charging infra in Pune has improved massively. Full breakdown in comments ⚡",
    imageUrl: COMMUNITY_POST_IMAGES.ev,
    likes: 312,
    comments: 88,
    shares: 34,
    rating: 4.7,
  },
];

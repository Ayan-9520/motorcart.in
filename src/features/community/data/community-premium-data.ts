import type { LucideIcon } from "lucide-react";
import { Flame, MapPin, Sparkles, Trophy, Users, Zap } from "lucide-react";

export const COMMUNITY_LIVE_STATS = [
  { label: "Active members", value: "128K+", icon: Users },
  { label: "Posts today", value: "4.2K", icon: Zap },
  { label: "Verified dealers", value: "8.5K", icon: Trophy },
  { label: "Cities live", value: "240+", icon: MapPin },
] as const;

export type CommunitySpotlight = {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatarUrl?: string;
  followers: string;
  badge?: string;
};

export const COMMUNITY_SPOTLIGHT: CommunitySpotlight[] = [
  {
    id: "s1",
    name: "Rajesh Kumar",
    handle: "@rajesh_auto",
    role: "Enthusiast",
    followers: "12.4K",
    badge: "Top reviewer",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
  },
  {
    id: "s2",
    name: "Priya Sharma",
    handle: "@priya_drives",
    role: "Creator",
    followers: "28K",
    badge: "Verified",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
  },
  {
    id: "s3",
    name: "Mumbai Motors",
    handle: "@mumbai_motors",
    role: "Dealer",
    followers: "41K",
    badge: "OEM partner",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80",
  },
  {
    id: "s4",
    name: "EV India",
    handle: "@ev_india",
    role: "Influencer",
    followers: "19K",
    badge: "EV expert",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
  },
];

export const COMMUNITY_TRENDING_TOPICS = [
  { tag: "bmwm3", posts: 1240, heat: "hot" as const },
  { tag: "cretareview", posts: 892, heat: "hot" as const },
  { tag: "evrange", posts: 654, heat: "rising" as const },
  { tag: "dealeralert", posts: 521, heat: "rising" as const },
  { tag: "firstcar", posts: 410, heat: "new" as const },
  { tag: "servicetips", posts: 388, heat: "new" as const },
];

export const COMMUNITY_FEATURED_GROUPS = [
  { slug: "suv-owners-india", name: "SUV Owners India", members: "24K", live: true },
  { slug: "ev-early-adopters", name: "EV Early Adopters", members: "18K", live: true },
  { slug: "dealer-network", name: "Dealer Network", members: "9K", live: false },
  { slug: "bike-commute", name: "Bike Commute", members: "31K", live: true },
];

export const COMMUNITY_LIVE_EVENTS = [
  {
    id: "e1",
    title: "Live Q&A: New car launches 2026",
    time: "Today · 7:00 PM IST",
    host: "Motorcart Editorial",
    icon: Sparkles as LucideIcon,
  },
  {
    id: "e2",
    title: "Dealer AMA — Mumbai premium sedans",
    time: "Tomorrow · 11:00 AM",
    host: "Mumbai Motors",
    icon: Flame as LucideIcon,
  },
];

export const COMMUNITY_LEADERBOARD = [
  { rank: 1, name: "Priya Sharma", score: "9.8K", delta: "+12%" },
  { rank: 2, name: "Rajesh Kumar", score: "8.4K", delta: "+8%" },
  { rank: 3, name: "Mumbai Motors", score: "7.1K", delta: "+5%" },
  { rank: 4, name: "EV India", score: "6.2K", delta: "+3%" },
];

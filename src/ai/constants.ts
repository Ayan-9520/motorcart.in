import type { AIAgentMeta } from "./types";

export const AI_AGENTS: AIAgentMeta[] = [
  {
    id: "leadbot",
    name: "LeadBot",
    description: "Lead scoring, assignment, follow-ups & WhatsApp replies",
    icon: "Users",
    capabilities: ["Auto scoring", "Hot lead detection", "Dealer assignment", "CRM updates"],
  },
  {
    id: "financebot",
    name: "FinanceBot",
    description: "Loan eligibility, bank matching & DSA assignment",
    icon: "IndianRupee",
    capabilities: ["EMI recommendations", "Approval probability", "Bank matching", "DSA routing"],
  },
  {
    id: "auctionbot",
    name: "AuctionBot",
    description: "Live bids, fraud detection & auction analytics",
    icon: "Gavel",
    capabilities: ["Bid alerts", "Fraud detection", "Price prediction", "Winner notifications"],
  },
  {
    id: "dealerbot",
    name: "DealerBot",
    description: "Onboarding, KYC, pricing & performance insights",
    icon: "Store",
    capabilities: ["KYC reminders", "Pricing tips", "WhatsApp replies", "Performance insights"],
  },
  {
    id: "supportbot",
    name: "SupportBot",
    description: "24/7 customer support across web & WhatsApp",
    icon: "Headphones",
    capabilities: ["Vehicle search help", "Loan help", "Booking assistance", "FAQ automation"],
  },
  {
    id: "socialbot",
    name: "SocialBot",
    description: "Captions, hashtags & content scheduling",
    icon: "Share2",
    capabilities: ["Auto captions", "Hashtags", "Reels ideas", "Trend detection"],
  },
  {
    id: "inventorybot",
    name: "InventoryBot",
    description: "Descriptions, specs, pricing & duplicate detection",
    icon: "Package",
    capabilities: ["AI descriptions", "Missing fields", "Pricing suggestions", "Health score"],
  },
  {
    id: "analyticsbot",
    name: "AnalyticsBot",
    description: "Daily reports, KPIs & forecasts",
    icon: "BarChart3",
    capabilities: ["Revenue analytics", "Lead conversion", "Dealer performance", "Forecasts"],
  },
  {
    id: "recommendationbot",
    name: "RecommendationBot",
    description: "Personalized vehicles, loans, auctions & parts",
    icon: "Sparkles",
    capabilities: ["Vehicle picks", "Loan picks", "Auction picks", "Service picks"],
  },
  {
    id: "notificationbot",
    name: "NotificationBot",
    description: "In-app, WhatsApp, SMS & email triggers",
    icon: "Bell",
    capabilities: ["Lead alerts", "Auction ending", "Loan status", "Booking confirmations"],
  },
  {
    id: "dsabot",
    name: "DsaBot",
    description: "DSA lead routing, follow-ups & commission insights",
    icon: "Briefcase",
    capabilities: ["Auto assignment", "Follow-up schedule", "Performance tracking"],
  },
  {
    id: "communitybot",
    name: "CommunityBot",
    description: "Moderation, spam filtering & trending posts",
    icon: "MessageCircle",
    capabilities: ["Spam filter", "Trending posts", "Content suggestions", "Moderation"],
  },
];

export const OPENAI_MODEL = "gpt-4o-mini";
export const AI_RATE_LIMIT_PER_MIN = 30;
export const AI_LOG_STORAGE_KEY = "motorcart-ai-logs";
export const AI_WORKFLOW_STORAGE_KEY = "motorcart-ai-workflows";

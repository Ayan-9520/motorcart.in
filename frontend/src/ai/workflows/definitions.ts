import type { AIWorkflowDefinition } from "../types";

export const AI_WORKFLOWS: AIWorkflowDefinition[] = [
  {
    id: "new_lead",
    name: "New lead pipeline",
    description: "Score → assign dealer → WhatsApp reply → notify",
    steps: [
      { agentId: "leadbot", action: "score_lead" },
      { agentId: "leadbot", action: "assign_dealer" },
      { agentId: "notificationbot", action: "send" },
    ],
  },
  {
    id: "loan_application",
    name: "Loan application",
    description: "Bank match → DSA assign → customer notify",
    steps: [
      { agentId: "financebot", action: "match_banks" },
      { agentId: "dsabot", action: "assign_lead" },
      { agentId: "notificationbot", action: "send" },
    ],
  },
  {
    id: "auction_ending",
    name: "Auction ending",
    description: "Alert bidders via NotificationBot",
    steps: [{ agentId: "auctionbot", action: "ending_alert" }],
  },
  {
    id: "dealer_signup",
    name: "Dealer signup",
    description: "KYC onboarding workflow",
    steps: [{ agentId: "dealerbot", action: "onboarding" }],
  },
  {
    id: "vehicle_upload",
    name: "Vehicle upload",
    description: "AI description + inventory check",
    steps: [
      { agentId: "inventorybot", action: "description" },
      { agentId: "inventorybot", action: "optimize" },
    ],
  },
  {
    id: "service_booking",
    name: "Service booking",
    description: "Booking confirmation notification",
    steps: [{ agentId: "notificationbot", action: "send" }],
  },
  {
    id: "community_post",
    name: "Community post",
    description: "Spam moderation",
    steps: [{ agentId: "communitybot", action: "moderate" }],
  },
];

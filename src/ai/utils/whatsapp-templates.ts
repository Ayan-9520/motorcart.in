export type WhatsAppTemplateRole = "customer" | "dealer" | "dsa" | "lender";

export interface WhatsAppTemplate {
  id: string;
  role: WhatsAppTemplateRole;
  label: string;
  body: string;
}

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "lead_ack_customer",
    role: "customer",
    label: "Lead acknowledgment",
    body: "Hi {{name}}, thanks for your interest in {{vehicle}} on Motorcart.in! Our team will contact you shortly. Need instant help? Reply here.",
  },
  {
    id: "lead_hot_dealer",
    role: "dealer",
    label: "Hot lead alert",
    body: "🔥 Hot lead: {{name}} ({{phone}}) — {{vehicle}}. AI score: {{score}}/100. Call now: {{link}}",
  },
  {
    id: "loan_status_customer",
    role: "customer",
    label: "Loan status update",
    body: "Hi {{name}}, your loan application (Ref: {{ref}}) is now *{{status}}*. Track: {{link}}",
  },
  {
    id: "auction_ending",
    role: "customer",
    label: "Auction ending soon",
    body: "⏰ Auction ending in {{minutes}} min: *{{title}}*. Current bid: ₹{{bid}}. Bid now: {{link}}",
  },
  {
    id: "dealer_kyc",
    role: "dealer",
    label: "KYC reminder",
    body: "Complete your Motorcart dealer KYC to go live. Upload GST & address proof: {{link}}",
  },
  {
    id: "dsa_new_app",
    role: "dsa",
    label: "New finance lead",
    body: "New loan application assigned — ₹{{amount}} for {{tenure}} months. Customer: {{name}}. Open DSA portal: {{link}}",
  },
  {
    id: "booking_confirm",
    role: "customer",
    label: "Service booking confirmed",
    body: "✅ Service booked: {{service}} on {{date}} at {{time}}. OTP: {{otp}}. Track: {{link}}",
  },
];

export function fillWhatsAppTemplate(
  templateId: string,
  vars: Record<string, string | number>
): string {
  const t = WHATSAPP_TEMPLATES.find((x) => x.id === templateId);
  if (!t) return "";
  return t.body.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ""));
}

export function whatsAppUrl(phone: string, message: string): string {
  const num = phone.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

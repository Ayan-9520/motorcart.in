import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/constants";
import type { CartLine } from "../types";

function buildWhatsAppMessage(lines: CartLine[], extra?: string) {
  const linesText = lines
    .map((l) => `${l.name} x${l.qty} @ ₹${l.price}`)
    .join("\n");
  return encodeURIComponent(
    `Hi Motorcart,\nI want to order:\n${linesText}\n${extra ?? ""}\n\nSource: ${SITE_URL}/parts`
  );
}

interface PartsWhatsAppButtonProps {
  lines: CartLine[];
  label?: string;
  phone?: string;
}

export function PartsWhatsAppButton({ lines, label = "Order on WhatsApp", phone = "919876543210" }: PartsWhatsAppButtonProps) {
  const href = `https://wa.me/${phone}?text=${buildWhatsAppMessage(lines)}`;
  return (
    <Button variant="outline" className="gap-2 border-primary text-[#128C7E] hover:bg-primary/10" asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}

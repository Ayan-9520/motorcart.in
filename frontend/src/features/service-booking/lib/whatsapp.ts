import { SITE_URL } from "@/lib/constants";

export function serviceSupportWhatsAppUrl(params: {
  phoneDigits: string;
  lines: string[];
}): string {
  const body = encodeURIComponent(
    [`Hi ${params.lines[0] ?? "Motorcart"}`, ...params.lines.slice(1), "", `Source: ${SITE_URL}/services`].join("\n")
  );
  return `https://wa.me/${params.phoneDigits.replace(/\D/g, "")}?text=${body}`;
}

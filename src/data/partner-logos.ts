/** Central paths for partner brand marks (transparent SVGs under /public/partners) */

export const LENDER_LOGO_BY_ID: Record<string, string> = {
  sbi: "/partners/banks/sbi.svg",
  bob: "/partners/banks/bob.svg",
  boi: "/partners/banks/boi.svg",
  pnb: "/partners/banks/pnb.svg",
  uco: "/partners/banks/uco.svg",
  iob: "/partners/banks/iob.svg",
  hdfc: "/partners/banks/hdfcbank.svg",
  "hdfc-bank": "/partners/banks/hdfcbank.svg",
  icici: "/partners/banks/icicibank.svg",
  "icici-bank": "/partners/banks/icicibank.svg",
  axis: "/partners/banks/axisbank.svg",
  "axis-bank": "/partners/banks/axisbank.svg",
  kotak: "/partners/banks/kotak.svg",
  au: "/partners/banks/au.svg",
  "au-bank": "/partners/banks/au.svg",
  chola: "/partners/banks/chola.svg",
  cholamandalam: "/partners/banks/chola.svg",
  mahindra: "/partners/banks/mahindra-finance.svg",
  "mahindra-finance": "/partners/banks/mahindra-finance.svg",
  idfc: "/partners/banks/idfc.svg",
  yes: "/partners/banks/yes.svg",
  indusind: "/partners/banks/indusind.svg",
  union: "/partners/banks/union.svg",
  canara: "/partners/banks/canara.svg",
  federal: "/partners/banks/federal.svg",
  bajaj: "/partners/banks/bajaj.svg",
  lic: "/partners/banks/lic.svg",
  vastu: "/partners/banks/tata-capital.svg",
  "tata-capital": "/partners/banks/tata-capital.svg",
};

export function lenderLogoPath(idOrSlug: string): string {
  const key = idOrSlug.toLowerCase().replace(/\s+/g, "-");
  return LENDER_LOGO_BY_ID[key] ?? "/partners/banks/hdfcbank.svg";
}

/** Template suggestions from draft keywords — replace with LLM API when wired. */
export function suggestPostLines(draft: string): string[] {
  const d = draft.toLowerCase();
  const out: string[] = [];
  if (/ev|electric|battery/i.test(d)) {
    out.push("Charging infra in my city has improved a lot this year — what's your experience?");
    out.push("Real-world range vs WLTP: owners, drop your numbers.");
  }
  if (/suv|family|7.?seater/i.test(d)) {
    out.push("3-row SUV owners: what would you change for the next road trip?");
  }
  if (/service|workshop|garage/i.test(d)) {
    out.push("Trusted workshop chain in your city — one recommendation only.");
  }
  if (/finance|emi|loan/i.test(d)) {
    out.push("Best negotiation tactic that actually worked on ex-showroom pricing?");
  }
  if (out.length === 0) {
    out.push("Weekend drive photo thread — drop your best shot.");
    out.push("One feature you can't live without after 6 months of ownership?");
    out.push("Road safety hot take (keep it respectful): what should India adopt next?");
  }
  return out.slice(0, 5);
}

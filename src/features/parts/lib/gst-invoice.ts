/** GST split (assumes inclusive MRP, standard India display) */
export function splitGstInclusive(amountInPaise: number, gstPercent: number) {
  const total = amountInPaise / 100;
  const divisor = 1 + gstPercent / 100;
  const taxable = Math.round((total / divisor) * 100) / 100;
  const gst = Math.round((total - taxable) * 100) / 100;
  return { taxable, gst, total };
}

export function formatInvoiceLines(
  lines: { name: string; qty: number; unitPrice: number; gstRate: number; lineTotal: number }[]
) {
  return lines.map((l) => {
    const { taxable, gst } = splitGstInclusive(Math.round(l.lineTotal * 100), l.gstRate);
    return { ...l, taxableAmount: taxable, gstAmount: gst };
  });
}

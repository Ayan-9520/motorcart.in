import { FileText, IndianRupee } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ServiceInvoice } from "../types";

interface ServiceInvoiceCardProps {
  invoice: ServiceInvoice | null;
  onGenerate?: () => void;
  generating?: boolean;
}

export function ServiceInvoiceCard({ invoice, onGenerate, generating }: ServiceInvoiceCardProps) {
  if (!invoice) {
    return (
      <div className="svc-invoice svc-invoice--empty">
        <FileText className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Invoice not issued yet</p>
        {onGenerate && (
          <Button size="sm" disabled={generating} onClick={onGenerate}>
            {generating ? "Generating…" : "Generate invoice"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <article className="svc-invoice">
      <header className="svc-invoice__head">
        <FileText className="h-5 w-5" />
        <span>{invoice.invoiceNumber}</span>
        <span className="svc-invoice__status">{invoice.status}</span>
      </header>
      <p className="svc-invoice__total">
        <IndianRupee className="inline h-4 w-4" />
        {formatCurrency(invoice.grandTotal)}
      </p>
      <p className="text-xs text-muted-foreground">
        GST {formatCurrency(invoice.gstAmount)} · Subtotal {formatCurrency(invoice.subtotal)}
      </p>
    </article>
  );
}

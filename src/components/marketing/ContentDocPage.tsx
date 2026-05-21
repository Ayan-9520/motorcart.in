import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MarketingPageBody, MarketingPageShell } from "@/components/marketing/MarketingPageShell";
import { cn } from "@/lib/utils";

type ContentDocPageProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  updated?: string;
  children: ReactNode;
  compact?: boolean;
  actions?: ReactNode;
};

export function ContentDocPage({
  eyebrow,
  title,
  lead,
  updated,
  children,
  compact,
  actions,
}: ContentDocPageProps) {
  return (
    <MarketingPageShell compact={compact}>
      <section className="marketing-hero marketing-hero-slim">
        <div className="marketing-hero-mesh" aria-hidden />
        <MarketingPageBody narrow>
          <p className="marketing-eyebrow">{eyebrow}</p>
          <h1 className="marketing-title marketing-title-md">{title}</h1>
          {lead && <p className="marketing-lead marketing-lead-md">{lead}</p>}
          {updated && (
            <p className="mt-2 text-xs text-muted-foreground">Last updated: {updated}</p>
          )}
          {actions && <div className="marketing-hero-actions mt-6">{actions}</div>}
        </MarketingPageBody>
      </section>
      <section className="marketing-section marketing-section-tight">
        <MarketingPageBody narrow>
          <div className="marketing-doc">{children}</div>
          <nav className="marketing-doc-links mt-10 border-t border-border/80 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Related
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <li>
                <Link to="/about" className="font-medium text-primary hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-medium text-primary hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="font-medium text-primary hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="font-medium text-primary hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="font-medium text-primary hover:underline">
                  Terms
                </Link>
              </li>
            </ul>
          </nav>
        </MarketingPageBody>
      </section>
    </MarketingPageShell>
  );
}

export function DocSection({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="marketing-doc-section">
      <h2 className="marketing-doc-h2">{title}</h2>
      <div className="marketing-doc-body">{children}</div>
    </section>
  );
}

export function FaqItem({ question, answer }: { question: string; answer: ReactNode }) {
  return (
    <details className={cn("marketing-faq-item group rounded-xl border border-border/80 bg-card")}>
      <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-foreground marker:content-none sm:px-5 sm:text-base">
        <span className="flex items-center justify-between gap-2">
          {question}
          <span className="text-primary transition-transform group-open:rotate-45">+</span>
        </span>
      </summary>
      <div className="border-t border-border/60 px-4 pb-4 pt-2 text-sm leading-relaxed text-muted-foreground sm:px-5">
        {answer}
      </div>
    </details>
  );
}

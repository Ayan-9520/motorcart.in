import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MarketingPageBody, MarketingPageShell } from "@/components/marketing/MarketingPageShell";

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
    <MarketingPageShell compact={compact} className="site-page">
      <section className="marketing-hero marketing-hero-slim marketing-hero-editorial">
        <div className="marketing-hero-mesh" aria-hidden />
        <MarketingPageBody narrow>
          <p className="site-eyebrow">{eyebrow}</p>
          <h1 className="site-page-title">{title}</h1>
          {lead && <p className="site-page-lead">{lead}</p>}
          {updated && (
            <p className="mt-3 text-xs text-muted-foreground">Last updated: {updated}</p>
          )}
          {actions && <div className="site-page-actions">{actions}</div>}
        </MarketingPageBody>
      </section>
      <section className="marketing-section marketing-section-tight">
        <MarketingPageBody narrow>
          <div className="marketing-doc">{children}</div>
          <p className="mt-10 border-t border-border/80 pt-6 text-center text-xs text-muted-foreground">
            Questions?{" "}
            <Link to="/contact" className="font-medium text-primary hover:underline">
              Contact us
            </Link>
            {" · "}
            More links in the site footer.
          </p>
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
    <details className="marketing-faq-item group rounded-xl border border-border/80 bg-card">
      <summary className="cursor-pointer list-none px-4 py-3.5 text-sm font-semibold text-foreground marker:content-none sm:px-5">
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

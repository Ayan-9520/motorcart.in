import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIPanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

export function AIPanel({ title, subtitle, children, className, compact }: AIPanelProps) {
  return (
    <section className={cn("ai-eco-panel", compact && "ai-eco-panel--compact", className)}>
      <header className="ai-eco-panel__head">
        <span className="ai-eco-panel__orb" aria-hidden />
        <Sparkles className="h-4 w-4 text-primary shrink-0" />
        <div className="min-w-0">
          <h2 className="ai-eco-panel__title">{title}</h2>
          {subtitle && <p className="ai-eco-panel__sub">{subtitle}</p>}
        </div>
      </header>
      <div className="ai-eco-panel__body">{children}</div>
    </section>
  );
}

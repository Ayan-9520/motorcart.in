import { useState } from "react";
import { MessageCircle, Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingButtons() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <>
      <a
        href="https://wa.me/911800123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform md:bottom-8"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <Button
        size="icon"
        variant="gradient"
        className="fixed bottom-40 right-4 z-50 h-12 w-12 rounded-full shadow-lg md:bottom-24"
        onClick={() => setAiOpen(!aiOpen)}
        aria-label="AI Assistant"
      >
        {aiOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </Button>
      {aiOpen && (
        <div
          className={cn(
            "fixed bottom-56 right-4 z-50 w-[min(calc(100vw-2rem),320px)] rounded-xl border bg-card p-4 shadow-xl animate-slide-up md:bottom-40"
          )}
        >
          <p className="font-semibold text-sm">Motorcart AI</p>
          <p className="text-xs text-muted-foreground mt-1">
            Ask about vehicles, loans, parts & services. Full AI chat in Phase 10.
          </p>
        </div>
      )}
    </>
  );
}

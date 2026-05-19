import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSupportChat } from "../hooks/useSupportChat";

interface SupportChatWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SupportChatWidget({ open, onOpenChange }: SupportChatWidgetProps) {
  const { messages, loading, send } = useSupportChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const t = input;
    setInput("");
    await send(t);
  };

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed bottom-56 right-4 z-50 flex w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:bottom-40"
      )}
    >
      <header className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="ai-pulse" />
          <Bot className="h-5 w-5" />
          <span className="font-semibold text-sm">SupportBot</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => onOpenChange(false)}>
          <X className="h-4 w-4" />
        </Button>
      </header>

      <div ref={scrollRef} className="flex max-h-72 flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "max-w-[90%] rounded-2xl px-3 py-2 text-sm",
              m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"
            )}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
          </div>
        )}
      </div>

      <div className="flex gap-2 border-t border-border p-3">
        <Input
          placeholder="Ask about cars, loans, auctions…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
          className="flex-1"
        />
        <Button size="icon" onClick={handleSend} disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

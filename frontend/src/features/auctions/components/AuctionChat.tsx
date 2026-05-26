import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AuctionMessage } from "../types";
import { cn } from "@/lib/utils";

interface AuctionChatProps {
  messages: AuctionMessage[];
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function AuctionChat({ messages, onSend, disabled }: AuctionChatProps) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <Card className="flex flex-col h-[320px]">
      <CardHeader className="pb-2 shrink-0">
        <CardTitle className="text-lg">Auction chat</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col min-h-0 pt-0">
        <ul className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1">
          {messages.map((m) => (
            <li
              key={m.id}
              className={cn(
                "rounded-lg px-3 py-2 text-sm",
                m.isSystem ? "bg-muted/60 text-muted-foreground italic text-center text-xs" : "bg-accent/50"
              )}
            >
              {!m.isSystem && <span className="font-medium text-primary text-xs">{m.displayName}: </span>}
              {m.message}
            </li>
          ))}
          <li ref={endRef} />
        </ul>
        <form onSubmit={submit} className="flex gap-2 shrink-0">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message..."
            disabled={disabled}
          />
          <Button type="submit" size="icon" variant="default" disabled={disabled}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
